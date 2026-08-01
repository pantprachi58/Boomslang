"use client";

import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  PackagePlus,
  Pencil,
  Plus,
  RefreshCw,
  Search,
  Star,
  Trash2,
  X,
} from "lucide-react";
import { AUTH_TOKEN_STORAGE_KEY, getApiBaseUrl } from "@/lib/authStorage";
import { PRODUCT_CATEGORIES } from "@/data/productOptions";
import styles from "./Products.module.css";

const API_BASE = `${getApiBaseUrl()}/api`;

function getAuthHeaders() {
  const token =
    typeof window !== "undefined"
      ? window.localStorage.getItem(AUTH_TOKEN_STORAGE_KEY)
      : "";
  return token ? { Authorization: `Bearer ${token}` } : {};
}

function resolveAssetUrl(url) {
  if (!url) return "";
  if (url.startsWith("/uploads")) return `${getApiBaseUrl()}${url}`;
  return url;
}

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({ page: 1, limit: 10, total: 0, pages: 1 });
  const [status, setStatus] = useState({ type: "", message: "" });
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [quantityTarget, setQuantityTarget] = useState(null);
  const [quantityWeightId, setQuantityWeightId] = useState("");
  const [quantityToAdd, setQuantityToAdd] = useState("1");

  async function loadProducts(nextPage = page) {
    setIsLoading(true);
    setStatus({ type: "", message: "" });

    try {
      const params = new URLSearchParams({
        page: String(nextPage),
        limit: "10",
      });

      if (searchTerm.trim()) params.set("search", searchTerm.trim());
      if (filterCategory !== "all") params.set("category", filterCategory);

      const { data } = await axios.get(`${API_BASE}/products/all`, {
        params,
        headers: getAuthHeaders(),
      });
      setProducts(data.data || []);
      setPagination(data.pagination || { page: nextPage, limit: 10, total: data.data?.length || 0, pages: 1 });
    } catch (error) {
      setStatus({
        type: "error",
        message: error?.response?.data?.message || "Unable to load products.",
      });
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      loadProducts(page);
    }, 250);

    return () => window.clearTimeout(timeout);
  }, [filterCategory, page, searchTerm]);

  function handleSearchChange(value) {
    setSearchTerm(value);
    setPage(1);
  }

  function handleCategoryChange(value) {
    setFilterCategory(value);
    setPage(1);
  }

  async function handleDelete() {
    if (!deleteTarget) return;

    setIsSubmitting(true);
    try {
      await axios.delete(`${API_BASE}/products/${deleteTarget._id}`, {
        headers: getAuthHeaders(),
      });
      setDeleteTarget(null);
      await loadProducts(page);
      setStatus({ type: "success", message: "Product deleted successfully." });
    } catch (error) {
      setStatus({
        type: "error",
        message: error?.response?.data?.message || "Unable to delete product.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  function openQuantityModal(product) {
    setQuantityTarget(product);
    setQuantityWeightId(product.weights?.[0]?.id || "");
    setQuantityToAdd("1");
  }

  async function handleAddQuantity(event) {
    event.preventDefault();
    if (!quantityTarget) return;

    setIsSubmitting(true);
    try {
      const { data } = await axios.patch(
        `${API_BASE}/products/${quantityTarget._id}/quantity`,
        { amount: Number(quantityToAdd), weightId: quantityWeightId },
        { headers: { ...getAuthHeaders(), "Content-Type": "application/json" } }
      );

      setProducts((current) =>
        current.map((product) => (product._id === data.data._id ? data.data : product))
      );
      setQuantityTarget(null);
      setStatus({ type: "success", message: "Quantity updated successfully." });
    } catch (error) {
      setStatus({
        type: "error",
        message: error?.response?.data?.message || "Unable to update quantity.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className={styles.productsPage}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Products</h1>
          <p className={styles.subtitle}>Manage products, variants, images and stock.</p>
        </div>
        <Link href="/admin/products/create" className={styles.addBtn}>
          <Plus /> Add Product
        </Link>
      </div>

      {status.message && (
        <p className={`${styles.status} ${styles[status.type]}`}>{status.message}</p>
      )}

      <div className={styles.toolbar}>
        <div className={styles.search}>
          <Search className={styles.searchIcon} aria-hidden="true" />
          <input
            type="search"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(event) => handleSearchChange(event.target.value)}
            className={styles.searchInput}
          />
        </div>
        <select
          value={filterCategory}
          onChange={(event) => handleCategoryChange(event.target.value)}
          className={styles.filterSelect}
        >
          <option value="all">All Categories</option>
          {PRODUCT_CATEGORIES.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        <button type="button" className={styles.refreshBtn} onClick={() => loadProducts(page)}>
          <RefreshCw aria-hidden="true" /> Refresh
        </button>
      </div>

      <div className={styles.tableWrap}>
        <table className={styles.productTable}>
          <thead>
            <tr>
              <th>Product</th>
              <th>Category</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Availability</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>
                  <div className={styles.productCell}>
                    <div className={styles.thumb}>
                      {product.image ? (
                        <img src={resolveAssetUrl(product.image)} alt={product.name} />
                      ) : (
                        <PackagePlus aria-hidden="true" />
                      )}
                    </div>
                    <div>
                      <strong>
                        {product.name}
                        {product.isFeatured && <Star className={styles.featuredIcon} aria-label="Featured" />}
                      </strong>
                      <span>{product.slug}</span>
                    </div>
                  </div>
                </td>
                <td>
                  <span className={styles.muted}>{product.category}</span>
                  <small>{product.flavour || product.type}</small>
                </td>
                <td>
                  <strong>₹ {product.price}</strong>
                  {product.discount > 0 && <small>{product.discount}% Off</small>}
                </td>
                <td>
                  <span
                    className={`${styles.stockBadge} ${
                      product.quantity === 0
                        ? styles.outOfStock
                        : product.quantity < 10
                          ? styles.lowStock
                          : styles.inStock
                    }`}
                  >
                    {product.quantity}
                  </span>
                </td>
                <td>{product.availability}</td>
                <td>
                  <span className={`${styles.statusBadge} ${styles[product.status]}`}>
                    {product.status}
                  </span>
                </td>
                <td>
                  <div className={styles.actions}>
                    <button
                      type="button"
                      className={`${styles.quantityBtn} ${styles.iconAction}`}
                      onClick={() => openQuantityModal(product)}
                      aria-label={`Add quantity for ${product.name}`}
                      title="Add quantity"
                    >
                      <Plus aria-hidden="true" />
                    </button>
                    <Link
                      href={`/admin/products/${product.slug}`}
                      className={`${styles.editBtn} ${styles.iconAction}`}
                      aria-label={`Edit ${product.name}`}
                      title="Edit"
                    >
                      <Pencil aria-hidden="true" />
                    </Link>
                    <button
                      type="button"
                      className={`${styles.deleteBtn} ${styles.iconAction}`}
                      onClick={() => setDeleteTarget(product)}
                      aria-label={`Delete ${product.name}`}
                      title="Delete"
                    >
                      <Trash2 aria-hidden="true" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isLoading && <div className={styles.emptyState}>Loading products...</div>}
      {!isLoading && products.length === 0 && (
        <div className={styles.emptyState}>No products found.</div>
      )}

      {!isLoading && pagination.total > 0 && (
        <div className={styles.pagination}>
          <span>
            Showing page {pagination.page} of {pagination.pages} ({pagination.total} products)
          </span>
          <div className={styles.pageControls}>
            <button
              type="button"
              className={styles.iconBtn}
              onClick={() => setPage((current) => Math.max(current - 1, 1))}
              disabled={pagination.page <= 1}
              aria-label="Previous page"
            >
              <ChevronLeft aria-hidden="true" />
            </button>
            <button
              type="button"
              className={styles.iconBtn}
              onClick={() => setPage((current) => Math.min(current + 1, pagination.pages))}
              disabled={pagination.page >= pagination.pages}
              aria-label="Next page"
            >
              <ChevronRight aria-hidden="true" />
            </button>
          </div>
        </div>
      )}

      {quantityTarget && (
        <div className={styles.modalBackdrop} role="dialog" aria-modal="true">
          <form className={`${styles.modal} ${styles.smallModal}`} onSubmit={handleAddQuantity}>
            <div className={styles.modalHeader}>
              <div>
                <h2>Add Quantity</h2>
                <p>{quantityTarget.name}</p>
              </div>
              <button type="button" className={styles.iconBtn} onClick={() => setQuantityTarget(null)}>
                <X aria-hidden="true" />
              </button>
            </div>
            <label className={styles.field}>
              <span>Size Variant</span>
              <select value={quantityWeightId} onChange={(event) => setQuantityWeightId(event.target.value)}>
                {quantityTarget.weights.map((weight) => (
                  <option key={weight.id} value={weight.id}>
                    {weight.name} ({weight.quantity || 0})
                  </option>
                ))}
              </select>
            </label>
            <label className={styles.field}>
              <span>Quantity to add</span>
              <input
                type="number"
                min="1"
                step="1"
                value={quantityToAdd}
                onChange={(event) => setQuantityToAdd(event.target.value)}
                required
              />
            </label>
            <div className={styles.modalActions}>
              <button type="submit" className={styles.saveBtn} disabled={isSubmitting}>
                <Plus aria-hidden="true" /> Add Quantity
              </button>
              <button type="button" className={styles.cancelBtn} onClick={() => setQuantityTarget(null)}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {deleteTarget && (
        <div className={styles.modalBackdrop} role="dialog" aria-modal="true">
          <div className={`${styles.modal} ${styles.smallModal}`}>
            <div className={styles.modalHeader}>
              <div>
                <h2>Delete Product?</h2>
                <p>This will remove {deleteTarget.name} from your product list.</p>
              </div>
              <button type="button" className={styles.iconBtn} onClick={() => setDeleteTarget(null)}>
                <X aria-hidden="true" />
              </button>
            </div>
            <div className={styles.modalActions}>
              <button type="button" className={styles.deleteConfirmBtn} onClick={handleDelete} disabled={isSubmitting}>
                <Trash2 aria-hidden="true" /> Delete
              </button>
              <button type="button" className={styles.cancelBtn} onClick={() => setDeleteTarget(null)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
