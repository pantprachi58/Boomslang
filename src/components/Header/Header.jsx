"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { UserRound, MapPin, ShoppingBag, LogOut, LogIn, KeyRound } from "lucide-react";
import navItems from "@/data/navigation";
import Button from "@/components/Button/Button";
import { useAuth } from "@/components/AuthProvider/AuthProvider";
import { useCart } from "@/components/CartProvider/CartProvider";
import {
  ChevronDownIcon,
  HamburgerIcon,
  CloseIcon,
  SearchIcon,
  UserIcon,
  CartIcon,
} from "@/components/icons/Icons";
import styles from "./Header.module.css";

export default function Header() {
  const router = useRouter();
  const [openDropdown, setOpenDropdown] = useState(null);
  const [accountOpen, setAccountOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState(null);
  const { totals } = useCart();
  const { user, isAuthenticated, logout } = useAuth();
  const headerRef = useRef(null);
  const accountLabel = isAuthenticated
    ? `${user.firstName || user.name || "Account"} account`
    : "Login";
  const accountName = user?.name || [user?.firstName, user?.lastName].filter(Boolean).join(" ");

  useEffect(() => {
    document.body.classList.toggle("noScroll", mobileOpen);
    return () => document.body.classList.remove("noScroll");
  }, [mobileOpen]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (headerRef.current && !headerRef.current.contains(event.target)) {
        setOpenDropdown(null);
        setAccountOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    function handleEscape(event) {
      if (event.key === "Escape") {
        setOpenDropdown(null);
        setAccountOpen(false);
        setMobileOpen(false);
      }
    }
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  const toggleMobileExpanded = (label) => {
    setMobileExpanded((prev) => (prev === label ? null : label));
  };

  const closeMobileMenu = () => {
    setMobileOpen(false);
    setMobileExpanded(null);
    setAccountOpen(false);
  };

  const handleLogout = () => {
    logout();
    setAccountOpen(false);
    setMobileOpen(false);
    router.push("/");
    router.refresh();
  };

  const renderAccountMenu = () => isAuthenticated ? (
    <div className={`${styles.accountDropdown} ${accountOpen ? styles.accountDropdownOpen : ""}`}>
      <div className={styles.accountName}>{accountName}</div>
      <Link href="/profile" className={styles.accountLink} onClick={closeMobileMenu}>
        <UserRound aria-hidden="true" />
        Profile
      </Link>
      <Link href="/orders" className={styles.accountLink} onClick={closeMobileMenu}>
        <ShoppingBag aria-hidden="true" />
        Orders
      </Link>
      <Link href="/address" className={styles.accountLink} onClick={closeMobileMenu}>
        <MapPin aria-hidden="true" />
        Address
      </Link>
      <Link href="/change-password" className={styles.accountLink} onClick={closeMobileMenu}>
        <KeyRound aria-hidden="true" />
        Change Password
      </Link>
      <button type="button" className={styles.accountLogout} onClick={handleLogout}>
        <LogOut aria-hidden="true" />
        Logout
      </button>
    </div>
  ) : null;

  return (
    <header className={styles.header} ref={headerRef}>
      <div className={styles.bar}>
        <Link href="/" className={styles.logoLink} aria-label="Boomslang Nutrition home">
          <Image
            src="/images/logo.png"
            alt="Boomslang Nutrition"
            width={200}
            height={100}
            className={styles.logoImg}
            priority
          />
          
        </Link>

        <nav className={styles.nav} aria-label="Primary navigation">
          <ul className={styles.navList}>
            {navItems.map((item) => {
              const hasChildren = Boolean(item.children?.length);
              const isOpen = openDropdown === item.label;
              return (
                <li
                  key={item.label}
                  className={styles.navItem}
                  onMouseEnter={() => hasChildren && setOpenDropdown(item.label)}
                  onMouseLeave={() => hasChildren && setOpenDropdown(null)}
                >
                  {hasChildren ? (
                    <button
                      type="button"
                      className={styles.navLink}
                      aria-expanded={isOpen}
                      aria-haspopup="true"
                      onClick={() => setOpenDropdown(isOpen ? null : item.label)}
                    >
                      {item.label}
                      <ChevronDownIcon
                        className={`${styles.chevron} ${isOpen ? styles.chevronOpen : ""}`}
                      />
                    </button>
                  ) : (
                    <Link href={item.href} className={styles.navLink}>
                      {item.label}
                    </Link>
                  )}

                  {hasChildren && (
                    <ul
                      className={`${styles.dropdown} ${isOpen ? styles.dropdownOpen : ""}`}
                      role="menu"
                    >
                      {item.children.map((child) => (
                        <li key={child.label} role="none">
                          <Link
                            href={child.href}
                            className={styles.dropdownLink}
                            role="menuitem"
                          >
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        <div className={styles.actions}>
          <form
            className={styles.searchBox}
            role="search"
            onSubmit={(event) => event.preventDefault()}
          >
            <SearchIcon className={styles.searchIcon} aria-hidden="true" />
            <input
              type="search"
              name="q"
              placeholder="Search Products"
              className={styles.searchInput}
              aria-label="Search products"
            />
          </form>
          <div
            className={styles.accountWrap}
            onMouseEnter={() => isAuthenticated && setAccountOpen(true)}
            onMouseLeave={() => setAccountOpen(false)}
          >
            {isAuthenticated ? (
              <button
                type="button"
                className={styles.iconBtn}
                aria-label={accountLabel}
                aria-expanded={accountOpen}
                onClick={() => setAccountOpen((prev) => !prev)}
              >
                <UserIcon />
              </button>
            ) : (
              <Link href="/login" className={styles.iconBtn} aria-label="Login">
                <UserIcon />
              </Link>
            )}
            {renderAccountMenu()}
          </div>
          <Link href="/cart" className={`${styles.iconBtn} ${styles.cartBtn}`} aria-label="Cart">
            <CartIcon />
            <span className={styles.cartBadge} aria-hidden="true">
              {totals.totalQuantity}
            </span>
          </Link>
          <Button href="/shop" className={styles.shopBtn}>
            Shop Now
          </Button>
          <button
            type="button"
            className={styles.hamburgerBtn}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            onClick={() => setMobileOpen((prev) => !prev)}
          >
            {mobileOpen ? <CloseIcon /> : <HamburgerIcon />}
          </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        className={`${styles.mobileMenu} ${mobileOpen ? styles.mobileMenuOpen : ""}`}
        aria-hidden={!mobileOpen}
      >
        {isAuthenticated && (
          <div className={styles.mobileWelcomeTop}>
            <span>Welcome</span>
            <strong>{accountName}</strong>
          </div>
        )}

        <form
          className={styles.mobileSearchBox}
          role="search"
          onSubmit={(event) => event.preventDefault()}
        >
          <SearchIcon className={styles.searchIcon} aria-hidden="true" />
          <input
            type="search"
            name="q"
            placeholder="Search Products"
            className={styles.searchInput}
            aria-label="Search products"
          />
        </form>

        <ul className={styles.mobileNavList}>
          {navItems.map((item) => {
            const hasChildren = Boolean(item.children?.length);
            const isExpanded = mobileExpanded === item.label;
            return (
              <li key={item.label} className={styles.mobileNavItem}>
                <div className={styles.mobileNavRow}>
                  <Link
                    href={item.href}
                    className={styles.mobileNavLink}
                    onClick={closeMobileMenu}
                  >
                    {item.label}
                  </Link>
                  {hasChildren && (
                    <button
                      type="button"
                      className={styles.mobileExpandBtn}
                      aria-expanded={isExpanded}
                      aria-label={`Toggle ${item.label} submenu`}
                      onClick={() => toggleMobileExpanded(item.label)}
                    >
                      <ChevronDownIcon
                        className={isExpanded ? styles.mobileExpandBtnOpen : ""}
                      />
                    </button>
                  )}
                </div>
                {hasChildren && (
                  <div
                    className={`${styles.mobileChildren} ${
                      isExpanded ? styles.mobileChildrenOpen : ""
                    }`}
                  >
                    {item.children.map((child) => (
                      <Link
                        key={child.label}
                        href={child.href}
                        className={styles.mobileChildLink}
                        onClick={closeMobileMenu}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </li>
            );
          })}
        </ul>

        <Button href="/shop" className={styles.mobileShopBtn} onClick={closeMobileMenu}>
          Shop Now
        </Button>

        <div className={styles.mobileAccountPanel}>
          {isAuthenticated ? (
            <>
              <Link href="/profile" className={styles.mobileAccountLink} onClick={closeMobileMenu}>
                <UserRound aria-hidden="true" />
                Profile
              </Link>
              <Link href="/address" className={styles.mobileAccountLink} onClick={closeMobileMenu}>
                <MapPin aria-hidden="true" />
                Address
              </Link>
              <Link
                href="/change-password"
                className={styles.mobileAccountLink}
                onClick={closeMobileMenu}
              >
                <KeyRound aria-hidden="true" />
                Change Password
              </Link>
              <Link href="/orders" className={styles.mobileAccountLink} onClick={closeMobileMenu}>
                <ShoppingBag aria-hidden="true" />
                Orders
              </Link>
              <button
                type="button"
                className={styles.mobileAccountLink}
                onClick={handleLogout}
              >
                <LogOut aria-hidden="true" />
                Logout
              </button>
            </>
          ) : (
            <Link href="/login" className={styles.mobileAccountLink} onClick={closeMobileMenu}>
              <LogIn aria-hidden="true" />
              Login
            </Link>
          )}
        </div>
      </div>

    </header>
  );
}
