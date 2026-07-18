"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Container from "@/components/Container/Container";
import ShopFilters from "@/components/ShopFilters/ShopFilters";
import ShopGrid from "@/components/ShopGrid/ShopGrid";
import { CloseIcon } from "@/components/icons/Icons";
import { getShopProducts } from "@/data/products";
import styles from "./ShopContent.module.css";

const allProducts = getShopProducts();
const priceMax = Math.ceil(
  Math.max(...allProducts.map((product) => product.discountedPrice)) / 500
) * 500;
const defaultFilters = {
  search: "",
  categories: [],
  priceRange: [0, priceMax],
  discount: [0, 100],
};

export default function ShopContent() {
  const [filters, setFilters] = useState(defaultFilters);
  const [currentPage, setCurrentPage] = useState(1);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const productsPerPage = 6;

  const categories = useMemo(() => {
    const counts = allProducts.reduce((result, product) => {
      result[product.category] = (result[product.category] || 0) + 1;
      return result;
    }, {});

    return [
      { name: "All Products", count: allProducts.length },
      ...Object.entries(counts).map(([name, count]) => ({ name, count })),
    ];
  }, []);

  useEffect(() => {
    document.body.style.overflow = filtersOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [filtersOpen]);

  const filteredProducts = allProducts.filter((product) => {
    const search = filters.search.trim().toLowerCase();

    if (
      search &&
      ![product.name, product.description, product.category]
        .join(" ")
        .toLowerCase()
        .includes(search)
    ) {
      return false;
    }

    if (
      filters.categories.length > 0 &&
      !filters.categories.includes(product.category)
    ) {
      return false;
    }

    if (
      product.discountedPrice < filters.priceRange[0] ||
      product.discountedPrice > filters.priceRange[1]
    ) {
      return false;
    }

    if (product.percentOff < filters.discount[0] || product.percentOff > filters.discount[1]) {
      return false;
    }

    return true;
  });

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, startIndex + productsPerPage);
  const activeFiltersCount =
    filters.categories.length +
    (filters.search ? 1 : 0) +
    (filters.priceRange[1] !== priceMax ? 1 : 0) +
    (filters.discount[0] !== 0 ? 1 : 0);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <div className={styles.banner}>
        <Image
          src="/images/banner/product.png"
          alt="Shop Banner"
          fill
          className={styles.bannerImage}
          priority
          sizes="100vw"
        />
        <div className={styles.bannerOverlay}>
          <div className={styles.bannerContent}>
            <h1 className={styles.bannerTitle}>Our Products</h1>
            <p className={styles.bannerSubtitle}>
              Premium Ayurvedic Supplements for Your Fitness Goals
            </p>
          </div>
        </div>
      </div>

      <Container className={styles.shopContainer}>
        <div className={styles.mobileFilterBar}>
          <button
            type="button"
            className={styles.mobileFilterButton}
            onClick={() => setFiltersOpen(true)}
          >
            <span className={styles.filterGlyph} aria-hidden="true" />
            Filters
            {activeFiltersCount > 0 && (
              <span className={styles.filterBadge}>{activeFiltersCount}</span>
            )}
          </button>
          <span className={styles.resultCount}>
            {filteredProducts.length} {filteredProducts.length === 1 ? "product" : "products"}
          </span>
        </div>

        {filtersOpen && (
          <button
            type="button"
            className={styles.drawerOverlay}
            aria-label="Close filters"
            onClick={() => setFiltersOpen(false)}
          />
        )}

        <div className={styles.shopContent}>
          <aside
            className={`${styles.sidebar} ${filtersOpen ? styles.sidebarOpen : ""}`}
            aria-label="Product filters"
          >
            <div className={styles.drawerHeader}>
              <h2>Filters</h2>
              <button
                type="button"
                className={styles.drawerClose}
                aria-label="Close filters"
                onClick={() => setFiltersOpen(false)}
              >
                <CloseIcon />
              </button>
            </div>
            <ShopFilters 
              filters={filters} 
              onFilterChange={handleFilterChange}
              onApply={() => setFiltersOpen(false)}
              categories={categories}
              priceBounds={{ min: 0, max: priceMax }}
              productsCount={filteredProducts.length}
            />
          </aside>
          <div className={styles.mainContent}>
            <ShopGrid 
              products={currentProducts}
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      </Container>
    </>
  );
}
