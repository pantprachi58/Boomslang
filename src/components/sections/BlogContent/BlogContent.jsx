"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Container from "@/components/Container/Container";
import BlogCard from "@/components/BlogCard/BlogCard";
import { SearchIcon } from "@/components/icons/Icons";
import { fetchPublicBlogs } from "@/lib/blogsApi";
import { subscribeEmail } from "@/lib/subscribersApi";
import styles from "./BlogContent.module.css";

export default function BlogContent() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [posts, setPosts] = useState([]);
  const [recentPosts, setRecentPosts] = useState([]);
  const [facets, setFacets] = useState({ categories: [] });
  const [pagination, setPagination] = useState({ page: 1, limit: 6, total: 0, pages: 1 });
  const [isLoading, setIsLoading] = useState(true);
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterStatus, setNewsletterStatus] = useState({ type: "", message: "" });
  const [isSubscribing, setIsSubscribing] = useState(false);
  const postsPerPage = 6;
  const hasPosts = posts.length > 0;

  useEffect(() => {
    let isCurrent = true;

    async function loadBlogs() {
      setIsLoading(true);

      const [blogsResult, recentResult] = await Promise.all([
        fetchPublicBlogs({
          page: currentPage,
          limit: postsPerPage,
          search: searchQuery.trim(),
          category: selectedCategory === "All" ? "" : selectedCategory,
        }),
        fetchPublicBlogs({ page: 1, limit: 3 }),
      ]);

      if (!isCurrent) return;

      setPosts(blogsResult.blogs);
      setPagination(blogsResult.pagination);
      setFacets(blogsResult.facets);
      setRecentPosts(recentResult.blogs);
      setIsLoading(false);
    }

    const timeout = window.setTimeout(loadBlogs, 250);

    return () => {
      isCurrent = false;
      window.clearTimeout(timeout);
    };
  }, [currentPage, searchQuery, selectedCategory]);

  const categories = useMemo(
    () => [
      { name: "All", count: facets.categories.reduce((sum, item) => sum + Number(item.count || 0), 0) },
      ...(facets.categories || []),
    ],
    [facets.categories]
  );

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNewsletterSubmit = async (event) => {
    event.preventDefault();
    setIsSubscribing(true);
    setNewsletterStatus({ type: "", message: "" });

    try {
      const data = await subscribeEmail(newsletterEmail, "blog-sidebar");
      setNewsletterStatus({
        type: "success",
        message: data.message || "Subscribed successfully.",
      });
      setNewsletterEmail("");
    } catch (error) {
      setNewsletterStatus({ type: "error", message: error.message });
    } finally {
      setIsSubscribing(false);
    }
  };

  return (
    <>
      {/* Banner Section */}
      <div className={styles.banner}>
        <Image
          src="/images/banner/Blog.png"
          alt="Blog Banner"
          fill
          className={styles.bannerImage}
          priority
          sizes="100vw"
        />
        <div className={styles.bannerOverlay}>
          <Container>
            <div className={styles.bannerContent}>
              <h1 className={styles.bannerTitle}>Our Blog</h1>
              <p className={styles.bannerSubtitle}>
                Insights, Tips & Knowledge About Fitness and Nutrition
              </p>
            </div>
          </Container>
        </div>
      </div>

      {/* Blog Content */}
      <Container>
        <div className={styles.blogContent}>
          {/* Main Content */}
          <div className={styles.mainContent}>
            {/* Search Bar */}
            <div className={styles.searchWrapper}>
              <form className={styles.searchForm} onSubmit={(e) => e.preventDefault()}>
                <SearchIcon className={styles.searchIcon} />
                <input
                  type="search"
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCurrentPage(1);
                  }}
                  className={styles.searchInput}
                />
              </form>
            </div>

            {/* Blog Grid */}
            {isLoading && !hasPosts ? (
              <div className={styles.loadingState} aria-live="polite">
                <div className={styles.loadingDots} aria-hidden="true">
                  <span />
                  <span />
                  <span />
                </div>
                <p>Loading articles</p>
              </div>
            ) : hasPosts ? (
              <>
                <div className={styles.blogGridWrap}>
                  <div className={`${styles.blogGrid} ${isLoading ? styles.refreshing : ""}`}>
                    {posts.map((post) => (
                      <BlogCard key={post.id} {...post} />
                    ))}
                  </div>

                  {isLoading && (
                    <div className={styles.refreshLoader} aria-live="polite">
                      <div className={styles.loadingDots} aria-hidden="true">
                        <span />
                        <span />
                        <span />
                      </div>
                      <p>Updating articles</p>
                    </div>
                  )}
                </div>

                {/* Pagination */}
                {pagination.pages > 1 && (
                  <div className={styles.pagination}>
                    <button
                      className={styles.pageBtn}
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      aria-label="Previous page"
                    >
                      Previous
                    </button>
                    <div className={styles.pageNumbers}>
                      {Array.from({ length: pagination.pages }, (_, i) => i + 1).map((page) => (
                        <button
                          key={page}
                          className={`${styles.pageNumber} ${
                            currentPage === page ? styles.pageNumberActive : ""
                          }`}
                          onClick={() => handlePageChange(page)}
                          aria-label={`Page ${page}`}
                          aria-current={currentPage === page ? "page" : undefined}
                        >
                          {page}
                        </button>
                      ))}
                    </div>
                    <button
                      className={styles.pageBtn}
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === pagination.pages}
                      aria-label="Next page"
                    >
                      Next
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className={styles.noResults}>
                <p>No articles found matching your criteria.</p>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <aside className={styles.sidebar}>
            {/* Categories */}
            <div className={styles.widget}>
              <h3 className={styles.widgetTitle}>Categories</h3>
              <ul className={styles.categoryList}>
                {categories.map((category) => (
                  <li key={category.name}>
                    <button
                      className={`${styles.categoryItem} ${
                        selectedCategory === category.name ? styles.categoryItemActive : ""
                      }`}
                      onClick={() => handleCategoryChange(category.name)}
                    >
                      <span>{category.name}</span>
                      <span className={styles.categoryCount}>({category.count})</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Recent Posts */}
            {recentPosts.length > 0 && (
              <div className={styles.widget}>
                <h3 className={styles.widgetTitle}>Recent Posts</h3>
                <ul className={styles.recentList}>
                  {recentPosts.map((post) => (
                    <li key={post.id} className={styles.recentItem}>
                      <Link href={post.href} className={styles.recentLink}>
                        {post.image && (
                          <div className={styles.recentImage}>
                            <Image
                              src={post.image}
                              alt={post.title}
                              fill
                              className={styles.recentImg}
                              sizes="100px"
                            />
                          </div>
                        )}
                        <div className={styles.recentInfo}>
                          <h4 className={styles.recentTitle}>{post.title}</h4>
                          <span className={styles.recentDate}>{post.displayDate}</span>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Newsletter Widget */}
            <div className={`${styles.widget} ${styles.newsletterWidget}`}>
              <h3 className={styles.widgetTitle}>Subscribe</h3>
              <p className={styles.newsletterText}>
                Get the latest articles and tips delivered to your inbox.
              </p>
              <form className={styles.newsletterForm} onSubmit={handleNewsletterSubmit}>
                <input
                  type="email"
                  placeholder="Your email"
                  className={styles.newsletterInput}
                  value={newsletterEmail}
                  onChange={(event) => setNewsletterEmail(event.target.value)}
                  required
                />
                <button type="submit" className={styles.newsletterBtn} disabled={isSubscribing}>
                  {isSubscribing ? "Subscribing..." : "Subscribe"}
                </button>
              </form>
              {newsletterStatus.message && (
                <p className={`${styles.newsletterStatus} ${styles[newsletterStatus.type]}`}>
                  {newsletterStatus.message}
                </p>
              )}
            </div>
          </aside>
        </div>
      </Container>
    </>
  );
}
