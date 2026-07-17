"use client";

import { useState } from "react";
import Image from "next/image";
import Container from "@/components/Container/Container";
import ShopFilters from "@/components/ShopFilters/ShopFilters";
import ShopGrid from "@/components/ShopGrid/ShopGrid";
import styles from "./ShopContent.module.css";

// Sample product data - replace with actual data from API/database
const allProducts = [
  {
    id: 1,
    name: "GOKU GAINZ",
    description: "Herbal Weight Gain Capsules 1000mg",
    category: "GOKU GAINZ",
    image: "/images/5.png",
    originalPrice: 999,
    discountedPrice: 799,
    percentOff: 20,
    availability: "In Stock",
  },
  {
    id: 2,
    name: "STRYCNNINE",
    description: "Electric Blood Orange",
    category: "STRYCNNINE",
    image: "/images/1.png",
    originalPrice: 1499,
    discountedPrice: 1350,
    percentOff: 10,
    availability: "In Stock",
  },
  {
    id: 3,
    name: "STRYCNNINE",
    description: "Mango",
    category: "STRYCNNINE",
    image: "/images/2.png",
    originalPrice: 1499,
    discountedPrice: 1350,
    percentOff: 10,
    availability: "In Stock",
  },
  {
    id: 4,
    name: "STRYCNNINE",
    description: "Pineapple",
    category: "STRYCNNINE",
    image: "/images/3.png",
    originalPrice: 1499,
    discountedPrice: 1350,
    percentOff: 10,
    availability: "In Stock",
  },
  {
    id: 5,
    name: "STRYCNNINE",
    description: "Mix Fruit",
    category: "STRYCNNINE",
    image: "/images/4.png",
    originalPrice: 1499,
    discountedPrice: 1350,
    percentOff: 10,
    availability: "In Stock",
  },
];

export default function ShopContent() {
  const [filters, setFilters] = useState({
    categories: [],
    availability: [],
    priceRange: [0, 5000],
    discount: [0, 100],
  });

  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6;

  // Filter products based on selected filters
  const filteredProducts = allProducts.filter((product) => {
    // Category filter
    if (filters.categories.length > 0 && !filters.categories.includes(product.category)) {
      return false;
    }

    // Availability filter
    if (filters.availability.length > 0 && !filters.availability.includes(product.availability)) {
      return false;
    }

    // Price range filter
    if (product.discountedPrice < filters.priceRange[0] || product.discountedPrice > filters.priceRange[1]) {
      return false;
    }

    // Discount filter
    if (product.percentOff < filters.discount[0] || product.percentOff > filters.discount[1]) {
      return false;
    }

    return true;
  });

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, startIndex + productsPerPage);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setCurrentPage(1); // Reset to first page when filters change
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
          src="/images/banner/product.png"
          alt="Shop Banner"
          fill
          className={styles.bannerImage}
          priority
          sizes="100vw"
        />
      </div>

      {/* Shop Content */}
      <Container>
        <div className={styles.shopContent}>
          <aside className={styles.sidebar}>
            <ShopFilters 
              filters={filters} 
              onFilterChange={handleFilterChange}
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
