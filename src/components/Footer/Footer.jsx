import Image from "next/image";
import Link from "next/link";
import Container from "@/components/Container/Container";
import { footerLinks, socialLinks } from "@/data/footer";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <Container>
        <div className={styles.top}>
          <div className={styles.brand}>
            <Image
              src="/images/logo.png"
              alt="Boomslang Nutrition"
              width={180}
              height={90}
              loading="eager"
              className={styles.brandLogo}
            />
            <p className={styles.brandText}>
              From Ayurvedic supplements for weight gain to pre workout supplements,
              Boomslang Nutrition is committed to supporting your fitness goals with
              quality nutrition and trusted formulations.
            </p>
            <div className={styles.social}>
              <h3 className={styles.socialTitle}>Follow Us</h3>
              <ul className={styles.socialList}>
                {socialLinks.map((social) => (
                  <li key={social.label}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      className={styles.socialLink}
                    >
                      <Image
                        src={social.icon}
                        alt=""
                        width={social.width}
                        height={social.height}
                        loading="eager"
                        aria-hidden="true"
                      />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <nav className={styles.linkCol} aria-label="Quick links">
            <h3 className={styles.colTitle}>Quick Links</h3>
            <ul>
              {footerLinks.quickLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav className={styles.linkCol} aria-label="Products">
            <h3 className={styles.colTitle}>Products</h3>
            <ul>
              {footerLinks.products.map((link) => (
                <li key={link.label}>
                  <Link href={link.href}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav className={styles.linkCol} aria-label="Support">
            <h3 className={styles.colTitle}>Support</h3>
            <ul>
              {footerLinks.support.map((link) => (
                <li key={link.label}>
                  <Link href={link.href}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className={styles.linkCol}>
            <h3 className={styles.colTitle}>Contact</h3>
            <ul className={styles.contactList}>
              <li>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path
                    d="M12 21s7-6.5 7-11.5A7 7 0 0 0 5 9.5C5 14.5 12 21 12 21z"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <circle cx="12" cy="9.5" r="2.4" stroke="currentColor" strokeWidth="2" />
                </svg>
                <span>India</span>
              </li>
              <li>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="2" />
                  <path d="m4 7 8 6 8-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
                <a href="mailto:support@boomslangnutrition.com">
                  support@boomslangnutrition.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className={styles.bottom}>
          <p>
            &copy; {new Date().getFullYear()} Boomslang Nutrition. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
}
