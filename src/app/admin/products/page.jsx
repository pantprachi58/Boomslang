"use client";

import { useState } from "react";
import Link from "next/link";
import { SearchIcon } from "@/components/icons/Icons";
import { PlusIcon, EditIcon, TrashIcon } from "@/components/admin/icons/AdminIcons";
import styles from "./Products.module.css";

export default function ProductsPage() {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Goku Gainz Pre-Workout",
      category: "Pre-Workout",
      price: "$89.99",
      stock: 45,
      status: "active",
      image: "/images/1.png",
    },
    {
      id: 2,
      name: "Ember Weight Gain",
      category: "Weight Gain",
      price: "$129.99",
      stock: 32,
      status: "active",
      image: "/images/2.png",
    },
    {
      id: 3,
      name: "Strycnnine Mango",
      category: "Pre-Workout",
      price: "$79.99",
      stock: 8,
      status: "active",
      image: "/images/3.png",
    },
    {
      id: 4,
      name: "Dragon Ball Protein",
      category: "Protein",
      price: "$99.99",
      stock: 0,
      status: "out_of_stock",
      image: "/images/4.png",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === "all" || product.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className={styles.productsPage}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Products</h1>
          <p className={styles.subtitle}>Manage your product inventory</p>
        </div>
        <button className={styles.addBtn}>
          <PlusIcon /> Add New Product
        </button>
      </div>

      <div className={styles.toolbar}>
        <div className={styles.search}>
          <span className={styles.searchIcon}>
            <SearchIcon />
          </span>
          <input
            type="search"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={styles.searchInput}
          />
        </div>
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className={styles.filterSelect}
        >
          <option value="all">All Categories</option>
          <option value="Pre-Workout">Pre-Workout</option>
          <option value="Weight Gain">Weight Gain</option>
          <option value="Protein">Protein</option>
        </select>
      </div>

      <div className={styles.productGrid}>
        {filteredProducts.map((product) => (
          <div key={product.id} className={styles.productCard}>
            <div className={styles.productImage}>
              <img src={product.image} alt={product.name} />
              {product.stock === 0 && (
                <div className={styles.outOfStockBadge}>Out of Stock</div>
              )}
            </div>
            <div className={styles.productInfo}>
              <h3 className={styles.productName}>{product.name}</h3>
              <p className={styles.productCategory}>{product.category}</p>
              <div className={styles.productMeta}>
                <span className={styles.productPrice}>{product.price}</span>
                <span className={`${styles.stockBadge} ${
                  product.stock === 0 ? styles.outOfStock :
                  product.stock < 10 ? styles.lowStock :
                  styles.inStock
                }`}>
                  {product.stock === 0 ? "Out of Stock" :
                   product.stock < 10 ? `Low Stock (${product.stock})` :
                   `In Stock (${product.stock})`}
                </span>
              </div>
              <div className={styles.productActions}>
                <button className={styles.editBtn}>
                  <EditIcon /> Edit
                </button>
                <button className={styles.deleteBtn}>
                  <TrashIcon /> Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className={styles.emptyState}>
          <p>No products found matching your criteria.</p>
        </div>
      )}
    </div>
  );
}
