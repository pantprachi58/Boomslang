"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { navItems } from "@/data/navigation";
import Button from "@/components/Button/Button";
import styles from "./Header.module.css";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [openMobileSubmenu, setOpenMobileSubmenu] = useState(null);
  const headerRef = useRef(null);

  useEffect(() => {
    document.body.classList.toggle("no-scroll", isMobileMenuOpen);
    return () => document.body.classList.remove("no-scroll");
  }, [isMobileMenuOpen]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (headerRef.current && !headerRef.current.contains(event.target)) {
        setOpenDropdown(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    function handleEscape(event) {
      if (event.key === "Escape") {
        setOpenDropdown(null);
        setIsMobileMenuOpen(false);
      }
    }
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);
  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setOpenMobileSubmenu(null);
  };

  return (
    <header className={styles.header} ref={headerRef}>
      <div className={styles.inner}>
        <Link href="/" className={styles.logo} aria-label="Boomslang Nutrition home">
          <Image
            src="/images/logo.png"
            alt="Boomslang Nutrition"
            width={160}
            height={80}
            className={styles.logoImg}
            priority
          />
        </Link>

        <nav className={styles.nav} aria-label="Primary">
          <ul className={styles.navList}>
            {navItems.map((item) => (
              <li
                key={item.label}
                className={styles.navItem}
                onMouseEnter={() => item.children && setOpenDropdown(item.label)}
                onMouseLeave={() => item.children && setOpenDropdown(null)}
              >
                {item.children ? (
                  <>
                    <button
                      type="button"
                      className={styles.navLink}
                      aria-expanded={openDropdown === item.label}
                      aria-haspopup="true"
                      aria-controls={`dropdown-${item.label}`}
                      onClick={() =>
                        setOpenDropdown((prev) =>
                          prev === item.label ? null : item.label
                        )
                      }
                    >
                      {item.label}
                      <span className={styles.chevron} aria-hidden="true" />
                    </button>
                    <ul
                      id={`dropdown-${item.label}`}
                      className={`${styles.dropdown} ${
                        openDropdown === item.label ? styles.dropdownOpen : ""
                      }`}
                    >
                      {item.children.map((child) => (
                        <li key={child.label}>
                          <Link href={child.href} className={styles.dropdownLink}>
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </>
                ) : (
                  <Link href={item.href} className={styles.navLink}>
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.actions}>
          <div className={styles.searchBox}>
            <svg
              className={styles.searchIcon}
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
              <line
                x1="21"
                y1="21"
                x2="16.65"
                y2="16.65"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
            <input type="search" placeholder="Search for..." aria-label="Search products" />
          </div>

          <button
            type="button"
            className={styles.iconBtn}
            aria-label="Account"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="2" />
              <path
                d="M4 20c0-4.4 3.6-7 8-7s8 2.6 8 7"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>

          <button type="button" className={styles.iconBtn} aria-label="Cart, 0 items">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M3 4h2l2.4 12.2a2 2 0 0 0 2 1.6h7.6a2 2 0 0 0 2-1.6L21 8H6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle cx="10" cy="21" r="1.4" fill="currentColor" />
              <circle cx="17" cy="21" r="1.4" fill="currentColor" />
            </svg>
            <span className={styles.cartBadge}>0</span>
          </button>

          <Button href="/shop" size="sm" className={styles.shopNowBtn}>
            Shop Now
          </Button>

          <button
            type="button"
            className={`${styles.hamburger} ${isMobileMenuOpen ? styles.hamburgerOpen : ""}`}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
            onClick={toggleMobileMenu}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        className={`${styles.mobileMenu} ${isMobileMenuOpen ? styles.mobileMenuOpen : ""}`}
      >
        <div className={styles.mobileSearchBox}>
          <svg
            className={styles.searchIcon}
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
          >
            <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
            <line
              x1="21"
              y1="21"
              x2="16.65"
              y2="16.65"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
          <input type="search" placeholder="Search for..." aria-label="Search products" />
        </div>

        <ul className={styles.mobileNavList}>
          {navItems.map((item) => (
            <li key={item.label} className={styles.mobileNavItem}>
              {item.children ? (
                <>
                  <button
                    type="button"
                    className={styles.mobileNavLink}
                    aria-expanded={openMobileSubmenu === item.label}
                    onClick={() =>
                      setOpenMobileSubmenu((prev) =>
                        prev === item.label ? null : item.label
                      )
                    }
                  >
                    {item.label}
                    <span
                      className={`${styles.chevron} ${
                        openMobileSubmenu === item.label ? styles.chevronOpen : ""
                      }`}
                      aria-hidden="true"
                    />
                  </button>
                  <ul
                    className={`${styles.mobileSubList} ${
                      openMobileSubmenu === item.label ? styles.mobileSubListOpen : ""
                    }`}
                  >
                    {item.children.map((child) => (
                      <li key={child.label}>
                        <Link
                          href={child.href}
                          className={styles.mobileSubLink}
                          onClick={closeMobileMenu}
                        >
                          {child.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </>
              ) : (
                <Link
                  href={item.href}
                  className={styles.mobileNavLink}
                  onClick={closeMobileMenu}
                >
                  {item.label}
                </Link>
              )}
            </li>
          ))}
        </ul>

        <Button href="/shop" size="lg" fullWidth onClick={closeMobileMenu}>
          Shop Now
        </Button>
      </div>
    </header>
  );
}
