"use client";

import { useEffect, useState } from "react";
import { SearchIcon } from "@/components/icons/Icons";
import styles from "./ShopFilters.module.css";

export default function ShopFilters({
  filters,
  onFilterChange,
  onApply,
  categories,
  priceBounds,
  productsCount,
}) {
  const [searchQuery, setSearchQuery] = useState(filters.search);
  const [priceRange, setPriceRange] = useState(filters.priceRange);
  const [discountRange, setDiscountRange] = useState(filters.discount);

  useEffect(() => {
    setSearchQuery(filters.search);
    setPriceRange(filters.priceRange);
    setDiscountRange(filters.discount);
  }, [filters]);

  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchQuery(value);
    onFilterChange({
      ...filters,
      search: value,
    });
  };

  const handleCategoryChange = (categoryName) => {
    if (categoryName === "All Products") {
      onFilterChange({
        ...filters,
        categories: [],
      });
      return;
    }

    const newCategories = filters.categories.includes(categoryName)
      ? filters.categories.filter((c) => c !== categoryName)
      : [...filters.categories, categoryName];

    onFilterChange({
      ...filters,
      categories: newCategories,
    });
  };

  const handlePriceRangeChange = (e) => {
    const value = parseInt(e.target.value);
    const newRange = [priceBounds.min, value];
    setPriceRange(newRange);
    onFilterChange({
      ...filters,
      priceRange: newRange,
    });
  };

  const handleDiscountChange = (e) => {
    const value = parseInt(e.target.value);
    const newRange = [value, 100];
    setDiscountRange(newRange);
    onFilterChange({
      ...filters,
      discount: newRange,
    });
  };

  const handleApplyFilters = () => {
    onFilterChange({
      ...filters,
      search: searchQuery,
      priceRange,
      discount: discountRange,
    });
    onApply?.();
  };

  const handleClearFilters = () => {
    const defaultFilters = {
      search: "",
      categories: [],
      priceRange: [priceBounds.min, priceBounds.max],
      discount: [0, 100],
    };
    setPriceRange(defaultFilters.priceRange);
    setDiscountRange([0, 100]);
    setSearchQuery("");
    onFilterChange(defaultFilters);
  };

  return (
    <div className={styles.filters}>
      {/* Search */}
      <div className={styles.searchBox}>
        <input
          type="text"
          placeholder="Search Supplements"
          value={searchQuery}
          onChange={handleSearchChange}
          className={styles.searchInput}
        />
        <button type="button" className={styles.searchButton} aria-label="Search products">
          <SearchIcon />
        </button>
      </div>

      {/* Category Filter */}
      <div className={styles.filterSection}>
        <h3 className={styles.filterTitle}>CATEGORY</h3>
        <div className={styles.filterList}>
          {categories.map((category) => (
            <label key={category.name} className={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={
                  category.name === "All Products"
                    ? filters.categories.length === 0
                    : filters.categories.includes(category.name)
                }
                onChange={() => handleCategoryChange(category.name)}
                className={styles.checkbox}
              />
              <span className={styles.labelText}>
                {category.name}
                <span className={styles.count}>{category.count}</span>
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range Filter */}
      <div className={styles.filterSection}>
        <h3 className={styles.filterTitle}>Price Range</h3>
        <div className={styles.priceSummary}>
          <span>₹ {priceBounds.min}</span>
          <strong>Up to ₹ {priceRange[1]}</strong>
        </div>
        <input
          type="range"
          min={priceBounds.min}
          max={priceBounds.max}
          step="100"
          value={priceRange[1]}
          onChange={handlePriceRangeChange}
          className={styles.rangeSlider}
        />
        <div className={styles.rangeScale}>
          <span>₹ {priceBounds.min}</span>
          <span>₹ {priceBounds.max}</span>
        </div>
      </div>

      {/* Discount Filter */}
      <div className={styles.filterSection}>
        <h3 className={styles.filterTitle}>Discount</h3>
        <div className={styles.discountDisplay}>
          <span>{discountRange[0]}%</span>
          <span>{discountRange[1]}%</span>
        </div>
        <input
          type="range"
          min="0"
          max="100"
          step="5"
          value={discountRange[0]}
          onChange={handleDiscountChange}
          className={styles.rangeSlider}
        />
      </div>

      {/* Action Buttons */}
      <div className={styles.filterActions}>
        <button type="button" onClick={handleApplyFilters} className={styles.applyButton}>
          Show {productsCount} {productsCount === 1 ? "Product" : "Products"}
        </button>
        <button type="button" onClick={handleClearFilters} className={styles.clearButton}>
          Clear
        </button>
      </div>
    </div>
  );
}
