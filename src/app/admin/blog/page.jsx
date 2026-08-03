"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  FileText,
  Pencil,
  Plus,
  RefreshCw,
  Search,
  Trash2,
  X,
} from "lucide-react";
import { deleteAdminBlog, fetchAdminBlogs } from "@/lib/blogsApi";
import styles from "./Blogs.module.css";

const statusOptions = ["all", "draft", "published"];

function formatDate(date) {
  if (!date) return "-";
  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(date));
}

export default function AdminBlogsPage() {
  const [blogs, setBlogs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({ page: 1, limit: 10, total: 0, pages: 1 });
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState({ type: "", message: "" });
  const [deleteTarget, setDeleteTarget] = useState(null);

  async function loadBlogs(nextPage = page) {
    setIsLoading(true);
    setStatus({ type: "", message: "" });

    try {
      const result = await fetchAdminBlogs({
        page: nextPage,
        limit: 10,
        search: searchTerm.trim(),
        status: filterStatus,
      });
      setBlogs(result.blogs);
      setPagination(result.pagination);
    } catch (error) {
      setStatus({ type: "error", message: error.message });
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      loadBlogs(page);
    }, 250);

    return () => window.clearTimeout(timeout);
  }, [filterStatus, page, searchTerm]);

  const stats = useMemo(
    () => ({
      total: pagination.total,
      published: blogs.filter((blog) => blog.status === "published").length,
      draft: blogs.filter((blog) => blog.status === "draft").length,
    }),
    [blogs, pagination.total]
  );

  async function handleDelete() {
    if (!deleteTarget) return;

    setIsSubmitting(true);
    setStatus({ type: "", message: "" });

    try {
      await deleteAdminBlog(deleteTarget._id);
      setDeleteTarget(null);
      await loadBlogs(page);
      setStatus({ type: "success", message: "Blog deleted successfully." });
    } catch (error) {
      setStatus({ type: "error", message: error.message });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className={styles.blogsPage}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Blogs</h1>
          <p className={styles.subtitle}>Manage articles, SEO content, categories and publishing status.</p>
        </div>
        <Link href="/admin/blog/create" className={styles.addBtn}>
          <Plus aria-hidden="true" /> Add Blog
        </Link>
      </div>

      {status.message && <p className={`${styles.status} ${styles[status.type]}`}>{status.message}</p>}

      <div className={styles.toolbar}>
        <div className={styles.search}>
          <Search className={styles.searchIcon} aria-hidden="true" />
          <input
            type="search"
            placeholder="Search blogs..."
            value={searchTerm}
            onChange={(event) => {
              setSearchTerm(event.target.value);
              setPage(1);
            }}
            className={styles.searchInput}
          />
        </div>
        <select
          value={filterStatus}
          onChange={(event) => {
            setFilterStatus(event.target.value);
            setPage(1);
          }}
          className={styles.filterSelect}
        >
          {statusOptions.map((item) => (
            <option key={item} value={item}>
              {item === "all" ? "All Status" : item}
            </option>
          ))}
        </select>
        <button type="button" className={styles.refreshBtn} onClick={() => loadBlogs(page)}>
          <RefreshCw aria-hidden="true" /> Refresh
        </button>
      </div>

      <div className={styles.stats}>
        <span>{stats.total} total</span>
        <span>{stats.published} published on this page</span>
        <span>{stats.draft} drafts on this page</span>
      </div>

      <div className={styles.tableWrap}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Blog</th>
              <th>Category</th>
              <th>Author</th>
              <th>Publish Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {blogs.map((blog) => (
              <tr key={blog._id}>
                <td>
                  <div className={styles.blogCell}>
                    <div className={styles.thumb}>
                      {blog.image ? <img src={blog.image} alt={blog.title} /> : <FileText aria-hidden="true" />}
                    </div>
                    <div>
                      <strong>{blog.title}</strong>
                      <span>{blog.slug}</span>
                    </div>
                  </div>
                </td>
                <td>{blog.category}</td>
                <td>{blog.author}</td>
                <td>{formatDate(blog.publishDate)}</td>
                <td>
                  <span className={`${styles.statusBadge} ${styles[blog.status]}`}>
                    {blog.status}
                  </span>
                </td>
                <td>
                  <div className={styles.actions}>
                    <Link href={`/admin/blog/${blog.slug}`} className={styles.editBtn} title="Edit">
                      <Pencil aria-hidden="true" />
                    </Link>
                    <button
                      type="button"
                      className={styles.deleteBtn}
                      title="Delete"
                      onClick={() => setDeleteTarget(blog)}
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

      {isLoading && <div className={styles.emptyState}>Loading blogs...</div>}
      {!isLoading && blogs.length === 0 && <div className={styles.emptyState}>No blogs found.</div>}

      {!isLoading && pagination.total > 0 && (
        <div className={styles.pagination}>
          <span>
            Showing page {pagination.page} of {pagination.pages} ({pagination.total} blogs)
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

      {deleteTarget && (
        <div className={styles.modalBackdrop} role="dialog" aria-modal="true">
          <div className={`${styles.modal} ${styles.smallModal}`}>
            <div className={styles.modalHeader}>
              <div>
                <h2>Delete Blog?</h2>
                <p>This will remove {deleteTarget.title} from your blog list.</p>
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
