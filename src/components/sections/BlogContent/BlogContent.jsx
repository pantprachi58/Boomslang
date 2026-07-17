"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Container from "@/components/Container/Container";
import BlogCard from "@/components/BlogCard/BlogCard";
import { SearchIcon } from "@/components/icons/Icons";
import styles from "./BlogContent.module.css";

// Sample blog data - replace with actual data from API/CMS
const allPosts = [
  {
    id: 1,
    image: "/images/blog-ayurvedic-supplements.png",
    title: "Ayurvedic Supplements for Weight Gain: Everything You Need To Know",
    description: "Learn how Ayurvedic ingredients can support healthy weight gain naturally and boost your overall wellness.",
    date: "16 / 07 / 2026",
    category: "Ayurveda",
    author: "Dr. Sarah Johnson",
    href: "#",
  },
  {
    id: 2,
    image: "/images/blog-weight-gain-capsules.png",
    title: "Best Weight Gain Capsules: How to Choose the Right One",
    description: "Understand the factors to consider before selecting a weight gain supplement that works for you.",
    date: "15 / 07 / 2026",
    category: "Supplements",
    author: "Mike Thompson",
    href: "#",
  },
  {
    id: 3,
    image: "/images/blog-healthy-weight-gain-tips.png",
    title: "Healthy Weight Gain Tips That Actually Work",
    description: "Discover simple lifestyle and nutrition habits that support sustainable weight gain without compromising health.",
    date: "14 / 07 / 2026",
    category: "Nutrition",
    author: "Emma Davis",
    href: "#",
  },
  {
    id: 4,
    image: "/images/blog-improve-appetite.png",
    title: "How to Improve Appetite Naturally",
    description: "Explore practical ways to encourage healthy eating habits and better nutrient intake for optimal results.",
    date: "13 / 07 / 2026",
    category: "Wellness",
    author: "John Martinez",
    href: "#",
  },
  {
    id: 5,
    image: "/images/blog-ayurvedic-supplements.png",
    title: "Understanding Pre-Workout Supplements",
    description: "Everything you need to know about pre-workout formulas and how they can enhance your performance.",
    date: "12 / 07 / 2026",
    category: "Supplements",
    author: "Dr. Sarah Johnson",
    href: "#",
  },
  {
    id: 6,
    image: "/images/blog-healthy-weight-gain-tips.png",
    title: "Building Muscle Mass: A Complete Guide",
    description: "Learn the science behind muscle growth and the best practices for gaining lean muscle mass.",
    date: "11 / 07 / 2026",
    category: "Fitness",
    author: "Mike Thompson",
    href: "#",
  },
];

const categories = [
  { name: "All", count: 12 },
  { name: "Ayurveda", count: 5 },
  { name: "Supplements", count: 4 },
  { name: "Nutrition", count: 6 },
  { name: "Wellness", count: 3 },
  { name: "Fitness", count: 4 },
];

export default function BlogContent() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

  // Filter posts based on category and search
  const filteredPosts = allPosts.filter((post) => {
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Pagination
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const startIndex = (currentPage - 1) * postsPerPage;
  const currentPosts = filteredPosts.slice(startIndex, startIndex + postsPerPage);

  // Recent posts for sidebar (last 3)
  const recentPosts = allPosts.slice(0, 3);

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
                        <span className={styles.recentDate}>{post.date}</span>
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
