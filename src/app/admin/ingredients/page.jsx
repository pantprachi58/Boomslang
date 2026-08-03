"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { ImagePlus, Pencil, Plus, RefreshCw, Trash2, X } from "lucide-react";
import { AUTH_TOKEN_STORAGE_KEY, getApiBaseUrl } from "@/lib/authStorage";
import styles from "../products/Products.module.css";

const API_BASE = `${getApiBaseUrl()}/api`;

function getAuthHeaders(contentType = "application/json") {
  const token =
    typeof window !== "undefined"
      ? window.localStorage.getItem(AUTH_TOKEN_STORAGE_KEY)
      : "";
  const headers = contentType ? { "Content-Type": contentType } : {};
  if (token) headers.Authorization = `Bearer ${token}`;
  return headers;
}

function resolveAssetUrl(url) {
  if (!url) return "";
  if (url.startsWith("/uploads")) return `${getApiBaseUrl()}${url}`;
  return url;
}

export default function IngredientsPage() {
  const [ingredients, setIngredients] = useState([]);
  const [form, setForm] = useState({ name: "", image: "" });
  const [imageFile, setImageFile] = useState(null);
  const [editingIngredient, setEditingIngredient] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [status, setStatus] = useState({ type: "", message: "" });
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function loadIngredients() {
    setIsLoading(true);
    setStatus({ type: "", message: "" });

    try {
      const { data } = await axios.get(`${API_BASE}/ingredients`, {
        headers: getAuthHeaders(),
      });
      setIngredients(data.data || []);
    } catch (error) {
      setStatus({
        type: "error",
        message: error?.response?.data?.message || "Unable to load ingredients.",
      });
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadIngredients();
  }, []);

  function resetForm() {
    setForm({ name: "", image: "" });
    setImageFile(null);
    setEditingIngredient(null);
  }

  async function uploadImage(file) {
    const payload = new FormData();
    payload.append("image", file);
    const { data } = await axios.post(`${API_BASE}/uploads/image`, payload, {
      headers: getAuthHeaders(null),
    });
    return data.url;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: "", message: "" });

    try {
      const payload = {
        ...form,
        image: imageFile ? await uploadImage(imageFile) : form.image,
      };
      const { data } = editingIngredient
        ? await axios.put(`${API_BASE}/ingredients/${editingIngredient._id}`, payload, {
            headers: getAuthHeaders(),
          })
        : await axios.post(`${API_BASE}/ingredients`, payload, { headers: getAuthHeaders() });

      resetForm();
      await loadIngredients();
      setStatus({ type: "success", message: data.message || "Ingredient saved successfully." });
    } catch (error) {
      setStatus({
        type: "error",
        message: error?.response?.data?.message || "Unable to save ingredient.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleDelete() {
    if (!deleteTarget) return;

    setIsSubmitting(true);
    try {
      await axios.delete(`${API_BASE}/ingredients/${deleteTarget._id}`, {
        headers: getAuthHeaders(),
      });
      setDeleteTarget(null);
      await loadIngredients();
      setStatus({ type: "success", message: "Ingredient deleted successfully." });
    } catch (error) {
      setStatus({
        type: "error",
        message: error?.response?.data?.message || "Unable to delete ingredient.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  function startEdit(ingredient) {
    setEditingIngredient(ingredient);
    setForm({ name: ingredient.name || "", image: ingredient.image || "" });
    setImageFile(null);
  }

  return (
    <div className={styles.productsPage}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Ingredients</h1>
          <p className={styles.subtitle}>Manage reusable product ingredients.</p>
        </div>
        <button type="button" className={styles.refreshBtn} onClick={loadIngredients}>
          <RefreshCw aria-hidden="true" /> Refresh
        </button>
      </div>

      {status.message && (
        <p className={`${styles.status} ${styles[status.type]}`}>{status.message}</p>
      )}

      <form className={styles.formCard} onSubmit={handleSubmit}>
        <div className={styles.formGrid}>
          <label className={styles.field}>
            <span>Name *</span>
            <input
              value={form.name}
              onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
              required
            />
          </label>
          <label className={styles.field}>
            <span>Image</span>
            <input
              id="ingredient-image"
              type="file"
              accept="image/*"
              onChange={(event) => setImageFile(event.target.files?.[0] || null)}
              className={styles.hiddenFileInput}
            />
            <span className={styles.imagePreviewText}>Click the image tile to upload or replace.</span>
            <label htmlFor="ingredient-image" className={styles.imagePreview}>
              {form.image || imageFile ? (
                <img
                  src={imageFile ? URL.createObjectURL(imageFile) : resolveAssetUrl(form.image)}
                  alt={form.name || "Ingredient"}
                />
              ) : (
                <ImagePlus aria-hidden="true" />
              )}
            </label>
          </label>
        </div>
        <div className={styles.modalActions}>
          <button type="submit" className={styles.saveBtn} disabled={isSubmitting}>
            <Plus aria-hidden="true" /> {editingIngredient ? "Update Ingredient" : "Add Ingredient"}
          </button>
          {editingIngredient && (
            <button type="button" className={styles.cancelBtn} onClick={resetForm}>
              Cancel
            </button>
          )}
        </div>
      </form>

      <div className={styles.ingredientGrid}>
        {ingredients.map((ingredient) => (
          <article key={ingredient._id} className={styles.ingredientCard}>
            <div className={styles.ingredientImage}>
              {ingredient.image ? (
                <img src={resolveAssetUrl(ingredient.image)} alt={ingredient.name} />
              ) : (
                <ImagePlus aria-hidden="true" />
              )}
            </div>
            <div>
              <h2>{ingredient.name}</h2>
              <div className={styles.actions}>
                <button type="button" className={styles.editBtn} onClick={() => startEdit(ingredient)}>
                  <Pencil aria-hidden="true" /> Edit
                </button>
                <button type="button" className={styles.deleteBtn} onClick={() => setDeleteTarget(ingredient)}>
                  <Trash2 aria-hidden="true" /> Delete
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>

      {isLoading && <div className={styles.emptyState}>Loading ingredients...</div>}
      {!isLoading && ingredients.length === 0 && (
        <div className={styles.emptyState}>No ingredients found.</div>
      )}

      {deleteTarget && (
        <div className={styles.modalBackdrop} role="dialog" aria-modal="true">
          <div className={`${styles.modal} ${styles.smallModal}`}>
            <div className={styles.modalHeader}>
              <div>
                <h2>Delete Ingredient?</h2>
                <p>This will remove {deleteTarget.name} from the ingredient list.</p>
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
