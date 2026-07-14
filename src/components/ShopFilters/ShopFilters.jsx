"use client";

import { useState } from "react";
import styles from "./ShopFilters.module.css";

const categories = [
  { name: "All Products", count: 5 },
  { name: "GOKU GAINZ", count: 1 },
  { name: "STRYCNNINE", count: 4 },
];

const availabilityOptions = [
  { name: "In Stock", count: 4 },
  { name: "Coming Soon", count: 1 },
];

export default function ShopFilters({ filters, onFilterChange, productsCount }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState(filters.priceRange);
  const [discountRange, setDiscountRange] = useState(filters.discount);

  const handleCategoryChange = (categoryName) => {
    const newCategories = filters.categories.includes(categoryName)
      ? filters.categories.filter((c) => c !== categoryName)
      : [...filters.categories, categoryName];

    onFilterChange({
      ...filters,
      categories: categoryName === "All Products" ? [] : newCategories,
    });
  };

  const handleAvailabilityChange = (availability) => {
    const newAvailability = filters.availability.includes(availability)
      ? filters.availability.filter((a) => a !== availability)
      : [...filters.availability, availability];

    onFilterChange({
      ...filters,
      availability: newAvailability,
    });
  };

  const handlePriceRangeChange = (e) => {
    const value = parseInt(e.target.value);
    const newRange = [filters.priceRange[0], value];
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
      priceRange,
      discount: discountRange,
    });
  };

  const handleClearFilters = () => {
    const defaultFilters = {
      categories: [],
      availability: [],
      priceRange: [0, 5000],
      discount: [0, 100],
    };
    setPriceRange([0, 5000]);
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
          onChange={(e) => setSearchQuery(e.target.value)}
          className={styles.searchInput}
        />
        <button className={styles.searchButton} aria-label="Search">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8.25 14.25C11.5637 14.25 14.25 11.5637 14.25 8.25C14.25 4.93629 11.5637 2.25 8.25 2.25C4.93629 2.25 2.25 4.93629 2.25 8.25C2.25 11.5637 4.93629 14.25 8.25 14.25Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M15.75 15.75L12.5625 12.5625" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
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

      {/* Availability Filter */}
      <div className={styles.filterSection}>
        <h3 className={styles.filterTitle}>AVAILABILITY</h3>
        <div className={styles.filterList}>
          {availabilityOptions.map((option) => (
            <label key={option.name} className={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={filters.availability.includes(option.name)}
                onChange={() => handleAvailabilityChange(option.name)}
                className={styles.checkbox}
              />
              <span className={styles.labelText}>
                {option.name}
                <span className={styles.count}>{option.count}</span>
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range Filter */}
      <div className={styles.filterSection}>
        <h3 className={styles.filterTitle}>Price Range</h3>
        <div className={styles.rangeInputs}>
          <input
            type="text"
            value={`₹ ${filters.priceRange[0]}`}
            readOnly
            className={styles.rangeDisplay}
          />
          <span className={styles.rangeSeparator}>-</span>
          <input
            type="text"
            value={`₹ ${priceRange[1]}`}
            readOnly
            className={styles.rangeDisplay}
          />
        </div>
        <input
          type="range"
          min="0"
          max="5000"
          step="100"
          value={priceRange[1]}
          onChange={handlePriceRangeChange}
          className={styles.rangeSlider}
        />
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
        <button onClick={handleApplyFilters} className={styles.applyButton}>
          Apply Filters
        </button>
        <button onClick={handleClearFilters} className={styles.clearButton}>
          Clear
        </button>
      </div>
    </div>
  );
}
