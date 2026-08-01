"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowDown,
  ArrowLeft,
  ArrowUp,
  PackagePlus,
  Plus,
  Save,
  Star,
  Trash2,
} from "lucide-react";
import { AUTH_TOKEN_STORAGE_KEY, getApiBaseUrl } from "@/lib/authStorage";
import {
  PRODUCT_CATEGORIES,
  PRODUCT_FLAVOURS_BY_CATEGORY,
  PRODUCT_STATUS,
  PRODUCT_TYPES,
} from "@/data/productOptions";
import styles from "./Products.module.css";

const API_BASE = `${getApiBaseUrl()}/api`;

const EMPTY_FORM = {
  name: "",
  subtitle: "",
  tagline: "",
  category: PRODUCT_CATEGORIES[0],
  type: PRODUCT_TYPES[0],
  flavour: "",
  description: "",
  metaTitle: "",
  metaDescription: "",
  status: "active",
  isFeatured: false,
  image: "",
  highlights: "",
  ingredients: [],
  weights: [{ id: "", name: "", price: "", discountedPrice: "", quantity: "0" }],
  primarySectionTitle: "",
  primarySectionDescription: "",
  primarySectionImage: "",
  secondarySectionTitle: "",
  secondarySectionDescription: "",
  secondarySectionImage: "",
  suitableForTitle: "",
  suitableForLead: "",
  suitableForItems: "",
  storageCareTitle: "Storage & Care",
  storageCareDescription: "",
  disclaimerTitle: "",
  disclaimer: "",
};

function getAuthHeaders(contentType = "application/json") {
  const token =
    typeof window !== "undefined"
      ? window.localStorage.getItem(AUTH_TOKEN_STORAGE_KEY)
      : "";
  const headers = contentType ? { "Content-Type": contentType } : {};
  if (token) headers.Authorization = `Bearer ${token}`;
  return headers;
}

function slugify(value) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function calculateDiscount(price, discountedPrice) {
  const originalPrice = Number(price || 0);
  const salePrice = Number(discountedPrice || 0);
  if (!originalPrice || salePrice >= originalPrice) return 0;
  return Math.round(((originalPrice - salePrice) / originalPrice) * 100);
}

function linesToArray(value) {
  return String(value || "")
    .split(/\r?\n/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function rowsToText(rows) {
  return Array.isArray(rows) ? rows.join("\n") : "";
}

function resolveAssetUrl(url) {
  if (!url) return "";
  if (url.startsWith("/uploads")) return `${getApiBaseUrl()}${url}`;
  return url;
}

function productToForm(product) {
  return {
    ...EMPTY_FORM,
    name: product.name || "",
    subtitle: product.subtitle || "",
    tagline: product.tagline || "",
    category: product.category || PRODUCT_CATEGORIES[0],
    type: product.type || PRODUCT_TYPES[0],
    flavour: product.flavour || "",
    description: product.description || "",
    metaTitle: product.metaTitle || "",
    metaDescription: product.metaDescription || "",
    status: product.status || "active",
    isFeatured: Boolean(product.isFeatured),
    image: product.image || "",
    highlights: rowsToText(product.highlights),
    ingredients: product.ingredients?.map((item) => item._id || item) || [],
    weights:
      product.weights?.length > 0
        ? product.weights.map((item) => ({
            id: item.id || slugify(item.name || ""),
            name: item.name || "",
            price: String(item.oldPrice ?? ""),
            discountedPrice: String(item.price ?? ""),
            quantity: String(item.quantity ?? 0),
          }))
        : [{ id: "", name: "", price: "", discountedPrice: "", quantity: "0" }],
    primarySectionTitle: product.primarySectionTitle || product.whyChooseTitle || "",
    primarySectionDescription: product.primarySectionDescription || product.whyChoose || "",
    primarySectionImage: product.primarySectionImage || "",
    secondarySectionTitle: product.secondarySectionTitle || product.howToUseTitle || "",
    secondarySectionDescription: product.secondarySectionDescription || product.howToUse || "",
    secondarySectionImage: product.secondarySectionImage || product.howToUseImage || "",
    suitableForTitle: product.suitableForTitle || product.whoCanUseTitle || "",
    suitableForLead: product.suitableForLead || product.whoCanUseLead || "",
    suitableForItems: rowsToText(product.suitableForItems || product.whoCanUse),
    storageCareTitle: product.storageCareTitle || product.storageTitle || "Storage & Care",
    storageCareDescription: product.storageCareDescription || product.storage || "",
    disclaimerTitle: product.disclaimerTitle || "",
    disclaimer: product.disclaimer || "",
  };
}

function formToPayload(form) {
  const weights = form.weights
    .filter((weight) => weight.name && weight.price !== "" && weight.discountedPrice !== "")
    .map((weight) => ({
      id: weight.id || slugify(weight.name),
      name: weight.name,
      oldPrice: Number(weight.price || 0),
      discountedPrice: Number(weight.discountedPrice || 0),
      discount: calculateDiscount(weight.price, weight.discountedPrice),
      price: Number(weight.discountedPrice || 0),
      quantity: Number(weight.quantity || 0),
    }));
  const firstWeight = weights[0] || { oldPrice: 0, discount: 0, price: 0 };

  return {
    name: form.name,
    subtitle: form.subtitle,
    tagline: form.tagline,
    category: form.category,
    type: form.type,
    flavour: form.flavour,
    description: form.description,
    metaTitle: form.metaTitle,
    metaDescription: form.metaDescription,
    oldPrice: firstWeight.oldPrice,
    discount: firstWeight.discount,
    price: firstWeight.price,
    quantity: weights.reduce((sum, weight) => sum + Number(weight.quantity || 0), 0),
    status: form.status,
    isFeatured: form.isFeatured,
    image: form.image,
    weights,
    highlights: linesToArray(form.highlights),
    ingredients: form.ingredients,
    primarySectionTitle: form.primarySectionTitle,
    primarySectionDescription: form.primarySectionDescription,
    primarySectionImage: form.primarySectionImage,
    secondarySectionTitle: form.secondarySectionTitle,
    secondarySectionDescription: form.secondarySectionDescription,
    secondarySectionImage: form.secondarySectionImage,
    suitableForTitle: form.suitableForTitle,
    suitableForLead: form.suitableForLead,
    suitableForItems: linesToArray(form.suitableForItems),
    storageCareTitle: form.storageCareTitle,
    storageCareDescription: form.storageCareDescription,
    disclaimerTitle: form.disclaimerTitle,
    disclaimer: form.disclaimer,
  };
}

export default function ProductForm({ mode, slug }) {
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [ingredientOptions, setIngredientOptions] = useState([]);
  const [productId, setProductId] = useState("");
  const [form, setForm] = useState(EMPTY_FORM);
  const [mainImageFile, setMainImageFile] = useState(null);
  const [primaryImageFile, setPrimaryImageFile] = useState(null);
  const [secondaryImageFile, setSecondaryImageFile] = useState(null);
  const [galleryItems, setGalleryItems] = useState([]);
  const [draggedGalleryIndex, setDraggedGalleryIndex] = useState(null);
  const [status, setStatus] = useState({ type: "", message: "" });
  const [isLoading, setIsLoading] = useState(mode === "edit");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const availableFlavours = (PRODUCT_FLAVOURS_BY_CATEGORY[form.category] || []).filter(
    (flavour) =>
      flavour === form.flavour ||
      !products.some(
        (product) =>
          product._id !== productId && product.category === form.category && product.flavour === flavour
      )
  );

  useEffect(() => {
    async function loadInitialData() {
      setIsLoading(true);
      try {
        const [{ data: productsData }, { data: ingredientsData }, productResponse] = await Promise.all([
          axios.get(`${API_BASE}/products/all`, {
            params: { limit: 100 },
            headers: getAuthHeaders(),
          }),
          axios.get(`${API_BASE}/ingredients`, { headers: getAuthHeaders() }),
          mode === "edit"
            ? axios.get(`${API_BASE}/products/admin/slug/${slug}`, { headers: getAuthHeaders() })
            : Promise.resolve({ data: null }),
        ]);

        setProducts(productsData.data || []);
        setIngredientOptions(ingredientsData.data || []);

        if (productResponse?.data?.data) {
          const product = productResponse.data.data;
          setProductId(product._id);
          setForm(productToForm(product));
          setGalleryItems(
            (Array.isArray(product.images) ? product.images : []).map((url, index) => ({
              id: `${url}-${index}`,
              type: "url",
              url,
              preview: resolveAssetUrl(url),
            }))
          );
        }
      } catch (error) {
        setStatus({
          type: "error",
          message: error?.response?.data?.message || "Unable to load product form.",
        });
      } finally {
        setIsLoading(false);
      }
    }

    loadInitialData();
  }, [mode, slug]);

  function updateField(field, value) {
    setForm((current) => {
      const next = { ...current, [field]: value };
      if (field === "category") next.flavour = "";
      return next;
    });
  }

  function toggleIngredient(ingredientId) {
    setForm((current) => ({
      ...current,
      ingredients: current.ingredients.includes(ingredientId)
        ? current.ingredients.filter((id) => id !== ingredientId)
        : [...current.ingredients, ingredientId],
    }));
  }

  function updateWeight(index, field, value) {
    setForm((current) => ({
      ...current,
      weights: current.weights.map((weight, weightIndex) =>
        weightIndex === index
          ? { ...weight, [field]: value, ...(field === "name" ? { id: slugify(value) } : {}) }
          : weight
      ),
    }));
  }

  function addWeight() {
    setForm((current) => ({
      ...current,
      weights: [...current.weights, { id: "", name: "", price: "", discountedPrice: "", quantity: "0" }],
    }));
  }

  function removeWeight(index) {
    setForm((current) => ({
      ...current,
      weights:
        current.weights.length > 1
          ? current.weights.filter((_, weightIndex) => weightIndex !== index)
          : current.weights,
    }));
  }

  function moveGalleryImage(index, direction) {
    setGalleryItems((current) => {
      const nextIndex = index + direction;
      if (nextIndex < 0 || nextIndex >= current.length) return current;
      const images = [...current];
      [images[index], images[nextIndex]] = [images[nextIndex], images[index]];
      return images;
    });
  }

  function removeGalleryImage(index) {
    setGalleryItems((current) => current.filter((_, imageIndex) => imageIndex !== index));
  }

  function handleGalleryFiles(files) {
    const nextItems = files.map((file) => ({
      id: `${file.name}-${file.lastModified}-${Math.random()}`,
      type: "file",
      file,
      preview: URL.createObjectURL(file),
    }));
    setGalleryItems((current) => [...current, ...nextItems]);
  }

  function handleGalleryDrop(index) {
    if (draggedGalleryIndex === null || draggedGalleryIndex === index) {
      setDraggedGalleryIndex(null);
      return;
    }
    setGalleryItems((current) => {
      const next = [...current];
      const [moved] = next.splice(draggedGalleryIndex, 1);
      next.splice(index, 0, moved);
      return next;
    });
    setDraggedGalleryIndex(null);
  }

  async function uploadImage(file) {
    const payload = new FormData();
    payload.append("image", file);
    const { data } = await axios.post(`${API_BASE}/uploads/image`, payload, {
      headers: getAuthHeaders(null),
    });
    return data.url;
  }

  async function uploadSelectedImages(payload) {
    const nextPayload = { ...payload };
    if (mainImageFile) nextPayload.image = await uploadImage(mainImageFile);
    if (primaryImageFile) nextPayload.primarySectionImage = await uploadImage(primaryImageFile);
    if (secondaryImageFile) nextPayload.secondarySectionImage = await uploadImage(secondaryImageFile);

    const orderedGallery = [];
    for (const item of galleryItems) {
      orderedGallery.push(item.type === "file" ? await uploadImage(item.file) : item.url);
    }
    nextPayload.images = orderedGallery;
    return nextPayload;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: "", message: "" });

    try {
      const basePayload = formToPayload(form);
      if (!basePayload.weights.length) {
        setStatus({ type: "error", message: "At least one size variant is required." });
        setIsSubmitting(false);
        return;
      }

      if (basePayload.weights.some((weight) => weight.price > weight.oldPrice)) {
        setStatus({ type: "error", message: "Discounted price cannot be greater than price." });
        setIsSubmitting(false);
        return;
      }

      const payload = await uploadSelectedImages(basePayload);
      const { data } =
        mode === "edit"
          ? await axios.put(`${API_BASE}/products/${productId}`, payload, {
              headers: getAuthHeaders(),
            })
          : await axios.post(`${API_BASE}/products`, payload, { headers: getAuthHeaders() });

      setStatus({ type: "success", message: data.message || "Product saved successfully." });
      router.replace("/admin/products");
      router.refresh();
    } catch (error) {
      setStatus({
        type: "error",
        message: error?.response?.data?.message || "Unable to save product.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isLoading) {
    return <div className={styles.emptyState}>Loading product...</div>;
  }

  return (
    <div className={styles.formPage}>
      <Link href="/admin/products" className={styles.backLink}>
        <ArrowLeft aria-hidden="true" /> Products
      </Link>

      <form className={styles.formCard} onSubmit={handleSubmit}>
        <div className={styles.formHeader}>
          <div>
            <h1 className={styles.title}>{mode === "edit" ? "Edit Product" : "Create Product"}</h1>
            <p className={styles.subtitle}>Pricing, quantity and availability come from size variants.</p>
          </div>
          <button type="submit" className={styles.saveBtn} disabled={isSubmitting}>
            <Save aria-hidden="true" /> {isSubmitting ? "Saving..." : "Save Product"}
          </button>
        </div>

        {status.message && (
          <p className={`${styles.status} ${styles[status.type]}`}>{status.message}</p>
        )}

        <div className={styles.formGrid}>
          <label className={styles.field}>
            <span>Name *</span>
            <input value={form.name} onChange={(event) => updateField("name", event.target.value)} required />
          </label>
          <label className={styles.field}>
            <span>Category *</span>
            <select value={form.category} onChange={(event) => updateField("category", event.target.value)}>
              {PRODUCT_CATEGORIES.map((category) => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </label>
          <label className={styles.field}>
            <span>Type *</span>
            <select value={form.type} onChange={(event) => updateField("type", event.target.value)}>
              {PRODUCT_TYPES.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </label>
          <label className={styles.field}>
            <span>Flavour</span>
            <select value={form.flavour} onChange={(event) => updateField("flavour", event.target.value)} disabled={availableFlavours.length === 0}>
              <option value="">No flavour</option>
              {availableFlavours.map((flavour) => (
                <option key={flavour} value={flavour}>{flavour}</option>
              ))}
            </select>
          </label>
          <label className={`${styles.field} ${styles.full}`}>
            <span>Subtitle</span>
            <input value={form.subtitle} onChange={(event) => updateField("subtitle", event.target.value)} />
          </label>
          <label className={`${styles.field} ${styles.full}`}>
            <span>Tagline</span>
            <input value={form.tagline} onChange={(event) => updateField("tagline", event.target.value)} />
          </label>
          <label className={`${styles.field} ${styles.full}`}>
            <span>Description *</span>
            <textarea value={form.description} onChange={(event) => updateField("description", event.target.value)} required />
          </label>
          <label className={styles.field}>
            <span>Meta Title</span>
            <input value={form.metaTitle} onChange={(event) => updateField("metaTitle", event.target.value)} />
          </label>
          <label className={styles.field}>
            <span>Meta Description</span>
            <input value={form.metaDescription} onChange={(event) => updateField("metaDescription", event.target.value)} />
          </label>
        </div>

        <div className={styles.formSection}>
          <div className={styles.sectionHeader}>
            <h3>Images</h3>
          </div>
          <div className={styles.formGrid}>
            <label className={styles.field}>
              <span>Main Image</span>
              <input type="file" accept="image/*" onChange={(event) => setMainImageFile(event.target.files?.[0] || null)} />
            </label>
            <div className={styles.imagePreview}>
              {form.image || mainImageFile ? (
                <img
                  src={mainImageFile ? URL.createObjectURL(mainImageFile) : resolveAssetUrl(form.image)}
                  alt="Main product"
                />
              ) : (
                <PackagePlus aria-hidden="true" />
              )}
            </div>
            <label className={`${styles.field} ${styles.full}`}>
              <span>Gallery Images</span>
              <input type="file" accept="image/*" multiple onChange={(event) => handleGalleryFiles(Array.from(event.target.files || []))} />
            </label>
          </div>
          {galleryItems.length > 0 && (
            <div className={styles.imageStrip}>
              {galleryItems.map((item, index) => (
                <div
                  key={item.id}
                  className={`${styles.imageTile} ${draggedGalleryIndex === index ? styles.dragging : ""}`}
                  draggable
                  onDragStart={() => setDraggedGalleryIndex(index)}
                  onDragOver={(event) => event.preventDefault()}
                  onDrop={() => handleGalleryDrop(index)}
                  onDragEnd={() => setDraggedGalleryIndex(null)}
                >
                  <img src={item.preview} alt={`Gallery ${index + 1}`} />
                  <div className={styles.imageActions}>
                    <button type="button" onClick={() => moveGalleryImage(index, -1)} disabled={index === 0}>
                      <ArrowUp aria-hidden="true" />
                    </button>
                    <button type="button" onClick={() => moveGalleryImage(index, 1)} disabled={index === galleryItems.length - 1}>
                      <ArrowDown aria-hidden="true" />
                    </button>
                    <button type="button" onClick={() => removeGalleryImage(index)}>
                      <Trash2 aria-hidden="true" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className={styles.formSection}>
          <div className={styles.sectionHeader}>
            <h3>Size Variants</h3>
            <button type="button" className={styles.secondaryAction} onClick={addWeight}>
              <Plus aria-hidden="true" /> Add Size
            </button>
          </div>
          {form.weights.map((weight, index) => (
            <div key={index} className={styles.variantCard}>
              <div className={styles.compactGrid}>
                <label className={styles.field}>
                  <span>Size Name *</span>
                  <input value={weight.name} onChange={(event) => updateWeight(index, "name", event.target.value)} placeholder="300 g" required />
                </label>
                <label className={styles.field}>
                  <span>Price *</span>
                  <input type="number" min="0" value={weight.price} onChange={(event) => updateWeight(index, "price", event.target.value)} required />
                </label>
                <label className={styles.field}>
                  <span>Discounted Price *</span>
                  <input type="number" min="0" max={weight.price || undefined} value={weight.discountedPrice} onChange={(event) => updateWeight(index, "discountedPrice", event.target.value)} required />
                </label>
                <div className={styles.generatedBox}>
                  <span>Discount</span>
                  <strong>{calculateDiscount(weight.price, weight.discountedPrice)}% Off</strong>
                </div>
                <label className={styles.field}>
                  <span>Quantity</span>
                  <input type="number" min="0" value={weight.quantity} onChange={(event) => updateWeight(index, "quantity", event.target.value)} />
                </label>
                <button type="button" className={styles.removeRowBtn} onClick={() => removeWeight(index)} disabled={form.weights.length === 1}>
                  <Trash2 aria-hidden="true" /> Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.formSection}>
          <div className={styles.sectionHeader}>
            <h3>Content</h3>
          </div>
          <div className={styles.formGrid}>
            <label className={`${styles.field} ${styles.full}`}>
              <span>Highlights (one per line)</span>
              <textarea value={form.highlights} onChange={(event) => updateField("highlights", event.target.value)} />
            </label>
            <label className={styles.field}>
              <span>Primary Section Title</span>
              <input value={form.primarySectionTitle} onChange={(event) => updateField("primarySectionTitle", event.target.value)} />
            </label>
            <label className={styles.field}>
              <span>Secondary Section Title</span>
              <input value={form.secondarySectionTitle} onChange={(event) => updateField("secondarySectionTitle", event.target.value)} />
            </label>
            <label className={`${styles.field} ${styles.full}`}>
              <span>Primary Section Description</span>
              <textarea value={form.primarySectionDescription} onChange={(event) => updateField("primarySectionDescription", event.target.value)} />
            </label>
            <label className={`${styles.field} ${styles.full}`}>
              <span>Secondary Section Description</span>
              <textarea value={form.secondarySectionDescription} onChange={(event) => updateField("secondarySectionDescription", event.target.value)} />
            </label>
            <label className={styles.field}>
              <span>Primary Section Image</span>
              <input type="file" accept="image/*" onChange={(event) => setPrimaryImageFile(event.target.files?.[0] || null)} />
            </label>
            <div className={styles.imagePreview}>
              {form.primarySectionImage || primaryImageFile ? (
                <img
                  src={primaryImageFile ? URL.createObjectURL(primaryImageFile) : resolveAssetUrl(form.primarySectionImage)}
                  alt="Primary section"
                />
              ) : (
                <PackagePlus aria-hidden="true" />
              )}
            </div>
            <label className={styles.field}>
              <span>Secondary Section Image</span>
              <input type="file" accept="image/*" onChange={(event) => setSecondaryImageFile(event.target.files?.[0] || null)} />
            </label>
            <div className={styles.imagePreview}>
              {form.secondarySectionImage || secondaryImageFile ? (
                <img
                  src={secondaryImageFile ? URL.createObjectURL(secondaryImageFile) : resolveAssetUrl(form.secondarySectionImage)}
                  alt="Secondary section"
                />
              ) : (
                <PackagePlus aria-hidden="true" />
              )}
            </div>
            <label className={styles.field}>
              <span>Suitable For Title</span>
              <input value={form.suitableForTitle} onChange={(event) => updateField("suitableForTitle", event.target.value)} />
            </label>
            <label className={styles.field}>
              <span>Suitable For Lead</span>
              <input value={form.suitableForLead} onChange={(event) => updateField("suitableForLead", event.target.value)} />
            </label>
            <label className={`${styles.field} ${styles.full}`}>
              <span>Suitable For Items</span>
              <textarea value={form.suitableForItems} onChange={(event) => updateField("suitableForItems", event.target.value)} />
            </label>
            <label className={styles.field}>
              <span>Storage & Care Title</span>
              <input value={form.storageCareTitle} onChange={(event) => updateField("storageCareTitle", event.target.value)} />
            </label>
            <label className={styles.field}>
              <span>Disclaimer Title</span>
              <input value={form.disclaimerTitle} onChange={(event) => updateField("disclaimerTitle", event.target.value)} />
            </label>
            <label className={`${styles.field} ${styles.full}`}>
              <span>Storage & Care Description</span>
              <textarea value={form.storageCareDescription} onChange={(event) => updateField("storageCareDescription", event.target.value)} />
            </label>
            <label className={`${styles.field} ${styles.full}`}>
              <span>Disclaimer</span>
              <textarea value={form.disclaimer} onChange={(event) => updateField("disclaimer", event.target.value)} />
            </label>
          </div>
        </div>

        <div className={styles.formSection}>
          <div className={styles.sectionHeader}>
            <h3>Ingredients</h3>
          </div>
          <div className={styles.ingredientPicker}>
            {ingredientOptions.length === 0 && (
              <p className={styles.helpText}>Create ingredients first from the Ingredients section.</p>
            )}
            {ingredientOptions.map((ingredient) => (
              <label key={ingredient._id} className={styles.ingredientOption}>
                <input
                  type="checkbox"
                  checked={form.ingredients.includes(ingredient._id)}
                  onChange={() => toggleIngredient(ingredient._id)}
                />
                <span className={styles.ingredientImage}>
                  {ingredient.image ? (
                    <img src={resolveAssetUrl(ingredient.image)} alt="" />
                  ) : (
                    <PackagePlus aria-hidden="true" />
                  )}
                </span>
                <span>{ingredient.name}</span>
              </label>
            ))}
          </div>
        </div>

        <div className={styles.formSection}>
          <div className={styles.formGrid}>
            <label className={styles.checkField}>
              <input
                type="checkbox"
                checked={form.isFeatured}
                onChange={(event) => updateField("isFeatured", event.target.checked)}
              />
              <span><Star aria-hidden="true" /> Featured product</span>
            </label>
            <label className={styles.field}>
              <span>Status</span>
              <select value={form.status} onChange={(event) => updateField("status", event.target.value)}>
                {PRODUCT_STATUS.map((item) => (
                  <option key={item} value={item}>{item}</option>
                ))}
              </select>
            </label>
          </div>
        </div>

        <div className={styles.modalActions}>
          <button type="submit" className={styles.saveBtn} disabled={isSubmitting}>
            <Save aria-hidden="true" /> {isSubmitting ? "Saving..." : "Save Product"}
          </button>
          <Link href="/admin/products" className={styles.cancelBtn}>Cancel</Link>
        </div>
      </form>
    </div>
  );
}
