"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowLeft, FileText, Plus, Save, Trash2 } from "lucide-react";
import {
  createAdminBlog,
  fetchAdminBlogBySlug,
  updateAdminBlog,
  uploadBlogImage,
} from "@/lib/blogsApi";
import styles from "./Blogs.module.css";

const emptyForm = {
  title: "",
  description: "",
  excerpt: "",
  image: "",
  imageAlt: "",
  category: "",
  author: "Boomslang Nutrition Team",
  readTime: "5 min read",
  publishDate: new Date().toISOString().slice(0, 10),
  tags: "",
  metaTitle: "",
  metaDescription: "",
  metaKeywords: "",
  status: "draft",
  content: [{ heading: "", body: "" }],
};

function toTextareaList(items) {
  return Array.isArray(items) ? items.join("\n") : "";
}

function toDateInputValue(date) {
  if (!date) return new Date().toISOString().slice(0, 10);
  return new Date(date).toISOString().slice(0, 10);
}

function blogToForm(blog) {
  return {
    title: blog.title || "",
    description: blog.description || "",
    excerpt: blog.excerpt || "",
    image: blog.rawImage || "",
    imageAlt: blog.imageAlt || blog.title || "",
    category: blog.category || "",
    author: blog.author || "Boomslang Nutrition Team",
    readTime: blog.readTime || "5 min read",
    publishDate: toDateInputValue(blog.publishDate),
    tags: toTextareaList(blog.tags),
    metaTitle: blog.metaTitle || "",
    metaDescription: blog.metaDescription || "",
    metaKeywords: toTextareaList(blog.metaKeywords),
    status: blog.status || "draft",
    content: blog.content?.length ? blog.content : [{ heading: "", body: "" }],
  };
}

function formToPayload(form) {
  return {
    ...form,
    tags: form.tags,
    metaKeywords: form.metaKeywords,
    content: JSON.stringify(form.content),
  };
}

export default function BlogForm({ mode, slug }) {
  const router = useRouter();
  const [blogId, setBlogId] = useState("");
  const [form, setForm] = useState(emptyForm);
  const [imageFile, setImageFile] = useState(null);
  const [isLoading, setIsLoading] = useState(mode === "edit");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState({ type: "", message: "" });

  useEffect(() => {
    let isCurrent = true;

    async function loadBlog() {
      if (mode !== "edit" || !slug) return;

      setIsLoading(true);
      setStatus({ type: "", message: "" });

      try {
        const blog = await fetchAdminBlogBySlug(slug);
        if (!isCurrent) return;
        setBlogId(blog._id);
        setForm(blogToForm(blog));
      } catch (error) {
        if (isCurrent) setStatus({ type: "error", message: error.message });
      } finally {
        if (isCurrent) setIsLoading(false);
      }
    }

    loadBlog();

    return () => {
      isCurrent = false;
    };
  }, [mode, slug]);

  function updateField(field, value) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  function updateSection(index, field, value) {
    setForm((current) => ({
      ...current,
      content: current.content.map((section, sectionIndex) =>
        sectionIndex === index ? { ...section, [field]: value } : section
      ),
    }));
  }

  function addSection() {
    setForm((current) => ({
      ...current,
      content: [...current.content, { heading: "", body: "" }],
    }));
  }

  function removeSection(index) {
    setForm((current) => ({
      ...current,
      content:
        current.content.length > 1
          ? current.content.filter((_, sectionIndex) => sectionIndex !== index)
          : current.content,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: "", message: "" });

    try {
      const nextForm = { ...form };

      if (imageFile) {
        nextForm.image = await uploadBlogImage(imageFile);
      }

      const payload = formToPayload(nextForm);
      const savedBlog =
        mode === "edit"
          ? await updateAdminBlog(blogId, payload)
          : await createAdminBlog(payload);

      setStatus({ type: "success", message: "Blog saved successfully." });
      router.replace(`/admin/blog/${savedBlog.slug}`);
      router.refresh();
    } catch (error) {
      setStatus({ type: "error", message: error.message });
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isLoading) {
    return <div className={styles.emptyState}>Loading blog...</div>;
  }

  return (
    <div className={styles.formPage}>
      <Link href="/admin/blog" className={styles.backLink}>
        <ArrowLeft aria-hidden="true" /> Blogs
      </Link>

      <form className={styles.formCard} onSubmit={handleSubmit}>
        <div className={styles.formHeader}>
          <div>
            <h1 className={styles.title}>{mode === "edit" ? "Edit Blog" : "Create Blog"}</h1>
            <p className={styles.subtitle}>Write the article, upload the main image, then publish when ready.</p>
          </div>
          <button type="submit" className={styles.saveBtn} disabled={isSubmitting}>
            <Save aria-hidden="true" /> {isSubmitting ? "Saving..." : "Save Blog"}
          </button>
        </div>

        {status.message && <p className={`${styles.status} ${styles[status.type]}`}>{status.message}</p>}

        <div className={styles.formGrid}>
          <label className={`${styles.field} ${styles.full}`}>
            <span>Title *</span>
            <input value={form.title} onChange={(event) => updateField("title", event.target.value)} required />
          </label>
          <label className={styles.field}>
            <span>Category *</span>
            <input value={form.category} onChange={(event) => updateField("category", event.target.value)} required />
          </label>
          <label className={styles.field}>
            <span>Author *</span>
            <input value={form.author} onChange={(event) => updateField("author", event.target.value)} required />
          </label>
          <label className={styles.field}>
            <span>Read Time *</span>
            <input value={form.readTime} onChange={(event) => updateField("readTime", event.target.value)} placeholder="5 min read" required />
          </label>
          <label className={styles.field}>
            <span>Publish Date *</span>
            <input type="date" value={form.publishDate} onChange={(event) => updateField("publishDate", event.target.value)} required />
          </label>
          <label className={`${styles.field} ${styles.full}`}>
            <span>Description *</span>
            <textarea value={form.description} onChange={(event) => updateField("description", event.target.value)} required />
          </label>
          <label className={`${styles.field} ${styles.full}`}>
            <span>Excerpt *</span>
            <textarea value={form.excerpt} onChange={(event) => updateField("excerpt", event.target.value)} required />
          </label>
        </div>

        <div className={styles.formSection}>
          <div className={styles.sectionHeader}>
            <h3>Main Image</h3>
          </div>
          <div className={styles.formGrid}>
            <label className={styles.field}>
              <span>Image</span>
              <input type="file" accept="image/*" onChange={(event) => setImageFile(event.target.files?.[0] || null)} />
            </label>
            <label className={styles.field}>
              <span>Image Alt Text</span>
              <input value={form.imageAlt} onChange={(event) => updateField("imageAlt", event.target.value)} />
            </label>
            <div className={styles.imagePreview}>
              {form.image || imageFile ? (
                <img src={imageFile ? URL.createObjectURL(imageFile) : form.image} alt={form.imageAlt || form.title} />
              ) : (
                <FileText aria-hidden="true" />
              )}
            </div>
          </div>
        </div>

        <div className={styles.formSection}>
          <div className={styles.sectionHeader}>
            <h3>Article Sections</h3>
            <button type="button" className={styles.secondaryAction} onClick={addSection}>
              <Plus aria-hidden="true" /> Add Section
            </button>
          </div>
          {form.content.map((section, index) => (
            <div className={styles.sectionCard} key={index}>
              <div className={styles.compactGrid}>
                <label className={styles.field}>
                  <span>Heading *</span>
                  <input value={section.heading} onChange={(event) => updateSection(index, "heading", event.target.value)} required />
                </label>
                <button type="button" className={styles.removeRowBtn} onClick={() => removeSection(index)} disabled={form.content.length === 1}>
                  <Trash2 aria-hidden="true" /> Remove
                </button>
                <label className={`${styles.field} ${styles.full}`}>
                  <span>Body *</span>
                  <textarea value={section.body} onChange={(event) => updateSection(index, "body", event.target.value)} required />
                </label>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.formSection}>
          <div className={styles.sectionHeader}>
            <h3>SEO & Publishing</h3>
          </div>
          <div className={styles.formGrid}>
            <label className={styles.field}>
              <span>Meta Title</span>
              <input value={form.metaTitle} onChange={(event) => updateField("metaTitle", event.target.value)} />
            </label>
            <label className={styles.field}>
              <span>Status</span>
              <select value={form.status} onChange={(event) => updateField("status", event.target.value)}>
                <option value="draft">draft</option>
                <option value="published">published</option>
              </select>
            </label>
            <label className={`${styles.field} ${styles.full}`}>
              <span>Meta Description</span>
              <textarea value={form.metaDescription} onChange={(event) => updateField("metaDescription", event.target.value)} />
            </label>
            <label className={styles.field}>
              <span>Tags (one per line or comma separated)</span>
              <textarea value={form.tags} onChange={(event) => updateField("tags", event.target.value)} />
            </label>
            <label className={styles.field}>
              <span>Meta Keywords</span>
              <textarea value={form.metaKeywords} onChange={(event) => updateField("metaKeywords", event.target.value)} />
            </label>
          </div>
        </div>

        <div className={styles.modalActions}>
          <button type="submit" className={styles.saveBtn} disabled={isSubmitting}>
            <Save aria-hidden="true" /> {isSubmitting ? "Saving..." : "Save Blog"}
          </button>
          <Link href="/admin/blog" className={styles.cancelBtn}>Cancel</Link>
        </div>
      </form>
    </div>
  );
}
