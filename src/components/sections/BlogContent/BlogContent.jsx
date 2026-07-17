"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Container from "@/components/Container/Container";
import BlogCard from "@/components/BlogCard/BlogCard";
import { SearchIcon } from "@/components/icons/Icons";
import { getAllBlogs, getBlogCategories, getRecentBlogs } from "@/data/blogs";
import styles from "./BlogContent.module.css";

const allPosts = getAllBlogs();
const categories = getBlogCategories();
const recentPosts = getRecentBlogs(3);

export default function BlogContent() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

  // Filter posts based on category and search
  const filteredPosts = allPosts.filter((post) => {
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
    const search = searchQuery.toLowerCase();
    const matchesSearch =
      post.title.toLowerCase().includes(search) ||
      post.description.toLowerCase().includes(search) ||
      post.category.toLowerCase().includes(search) ||
      post.tags.some((tag) => tag.toLowerCase().includes(search));
    return matchesCategory && matchesSearch;
  });

  // Pagination
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const startIndex = (currentPage - 1) * postsPerPage;
  const currentPosts = filteredPosts.slice(startIndex, startIndex + postsPerPage);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
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
                Expert insights on weight gain, nutrition, and wellness
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
            {currentPosts.length > 0 ? (
              <>
                <div className={styles.blogGrid}>
                  {currentPosts.map((post) => (
                    <BlogCard key={post.id} {...post} />
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
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
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
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
                      disabled={currentPage === totalPages}
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
            <div className={styles.widget}>
              <h3 className={styles.widgetTitle}>Recent Posts</h3>
              <ul className={styles.recentList}>
                {recentPosts.map((post) => (
                  <li key={post.id} className={styles.recentItem}>
                    <Link href={post.href} className={styles.recentLink}>
                      <div className={styles.recentImage}>
                        <Image
                          src={post.image}
                          alt={post.title}
                          fill
                          className={styles.recentImg}
                          sizes="100px"
                        />
                      </div>
                      <div className={styles.recentInfo}>
                        <h4 className={styles.recentTitle}>{post.title}</h4>
                        <span className={styles.recentDate}>{post.displayDate}</span>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Newsletter Widget */}
            <div className={`${styles.widget} ${styles.newsletterWidget}`}>
              <h3 className={styles.widgetTitle}>Subscribe</h3>
              <p className={styles.newsletterText}>
                Get the latest articles and tips delivered to your inbox.
              </p>
              <form className={styles.newsletterForm} onSubmit={(e) => e.preventDefault()}>
                <input
                  type="email"
                  placeholder="Your email"
                  className={styles.newsletterInput}
                  required
                />
                <button type="submit" className={styles.newsletterBtn}>
                  Subscribe
                </button>
              </form>
            </div>
          </aside>
        </div>
      </Container>
    </>
  );
}
