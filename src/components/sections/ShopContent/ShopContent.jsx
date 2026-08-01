"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Container from "@/components/Container/Container";
import ShopFilters from "@/components/ShopFilters/ShopFilters";
import ShopGrid from "@/components/ShopGrid/ShopGrid";
import { CloseIcon } from "@/components/icons/Icons";
import { fetchPublicProducts } from "@/lib/productsApi";
import styles from "./ShopContent.module.css";

const defaultFilters = {
  search: "",
  categories: [],
  priceRange: [0, 5000],
  discount: [0, 100],
};

export default function ShopContent({ initialSearch = "", initialProducts }) {
  const initialCategoryTotal =
    initialProducts?.facets?.categories?.reduce((sum, category) => sum + category.count, 0) || 0;
  const initialMaxPrice = Math.max(
    Math.ceil((initialProducts?.facets?.price?.max || 0) / 500) * 500,
    500
  );
  const [filters, setFilters] = useState({
    ...defaultFilters,
    search: initialSearch,
    priceRange: [0, initialMaxPrice],
  });
  const [products, setProducts] = useState(initialProducts?.products || []);
  const [productsCount, setProductsCount] = useState(initialProducts?.pagination?.total || 0);
  const [categories, setCategories] = useState([
    { name: "All Products", count: initialCategoryTotal },
    ...(initialProducts?.facets?.categories || []),
  ]);
  const [priceBounds, setPriceBounds] = useState({ min: 0, max: initialMaxPrice });
  const [isLoading, setIsLoading] = useState(!initialProducts);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(initialProducts?.pagination?.pages || 1);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const productsPerPage = 6;
  const shouldSkipInitialFetch = useRef(Boolean(initialProducts));

  useEffect(() => {
    document.body.style.overflow = filtersOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [filtersOpen]);

  useEffect(() => {
    setFilters((current) =>
      current.search === initialSearch ? current : { ...current, search: initialSearch }
    );
    setCurrentPage(1);
  }, [initialSearch]);

  useEffect(() => {
    if (shouldSkipInitialFetch.current) {
      shouldSkipInitialFetch.current = false;
      return;
    }

    const timeout = window.setTimeout(async () => {
      setIsLoading(true);
      const maxPrice = filters.priceRange[1] || priceBounds.max;
      const result = await fetchPublicProducts({
        page: currentPage,
        limit: productsPerPage,
        search: filters.search,
        category: filters.categories.join(","),
        minPrice: filters.priceRange[0],
        maxPrice,
        minDiscount: filters.discount[0],
        maxDiscount: filters.discount[1],
      });

      const categoryTotal = result.facets.categories.reduce((sum, category) => sum + category.count, 0);
      const nextMaxPrice = Math.max(Math.ceil((result.facets.price.max || 0) / 500) * 500, 500);

      setProducts(result.products);
      setProductsCount(result.pagination.total);
      setTotalPages(result.pagination.pages);
      setCategories([
        { name: "All Products", count: categoryTotal },
        ...result.facets.categories,
      ]);
      setPriceBounds({ min: 0, max: nextMaxPrice });

      setIsLoading(false);
    }, 250);

    return () => window.clearTimeout(timeout);
  }, [currentPage, filters]);

  const activeFiltersCount =
    filters.categories.length +
    (filters.search ? 1 : 0) +
    (filters.priceRange[1] !== priceBounds.max ? 1 : 0) +
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
            {isLoading && products.length === 0
              ? "Loading products..."
              : `${productsCount} ${productsCount === 1 ? "product" : "products"}`}
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
              priceBounds={priceBounds}
              productsCount={productsCount}
            />
          </aside>
          <div className={styles.mainContent}>
            <ShopGrid
              products={products}
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
              isLoading={isLoading}
            />
          </div>
        </div>
      </Container>
    </>
  );
}
