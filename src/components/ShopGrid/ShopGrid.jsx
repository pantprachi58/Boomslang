import ShopProductCard from "@/components/ShopProductCard/ShopProductCard";
import styles from "./ShopGrid.module.css";

export default function ShopGrid({ products, currentPage, totalPages, onPageChange }) {
  const renderPagination = () => {
    if (totalPages <= 1) return null;

    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => onPageChange(i)}
          className={`${styles.pageButton} ${currentPage === i ? styles.active : ""}`}
        >
          {i}
        </button>
      );
    }

    return (
      <div className={styles.pagination}>
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={styles.navButton}
          aria-label="Previous page"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12.5 15L7.5 10L12.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        
        {pages}
        
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={styles.navButton}
          aria-label="Next page"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
    );
  };

  if (products.length === 0) {
    return (
      <div className={styles.emptyState}>
        <p className={styles.emptyMessage}>No products found matching your filters.</p>
        <p className={styles.emptySubtext}>Try adjusting your filter criteria.</p>
      </div>
    );
  }

  return (
    <div className={styles.shopGrid}>
      <div className={styles.productGrid}>
        {products.map((product) => (
          <ShopProductCard key={product.id} {...product} />
        ))}
      </div>
      {renderPagination()}
    </div>
  );
}
