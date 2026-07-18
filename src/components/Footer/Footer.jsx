import Image from "next/image";
import Link from "next/link";
import Container from "@/components/Container/Container";
import { MailIcon, PinIcon } from "@/components/icons/Icons";
import styles from "./Footer.module.css";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
  { label: "About", href: "/about" },
  { label: "FAQs", href: "/faqs" },
  { label: "Contact", href: "/contact" },
];

const productLinks = [
  { label: "GOKU GAINZ", href: "/shop/goku-gainz" },
  { label: "STRYCNNINE Mango", href: "/shop/strychnine-mango" },
  { label: "STRYCNNINE Mix Fruit", href: "/shop/strychnine-mix-fruit" },
  { label: "STRYCNNINE Pineapple", href: "/shop/strychnine-pineapple" },
  {
    label: "STRYCNNINE Electric Blood Orange",
    href: "/shop/strychnine-electric-blood-orange",
  },
];

const supportLinks = [
  { label: "Shipping Policy", href: "/shipping-policy" },
  { label: "Return & Refund Policy", href: "/return-refund-policy" },
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms & Conditions", href: "/terms-condition" },
  // { label: "Disclaimer", href: "/disclaimer" },
];

const socials = [
  { label: "Instagram", href: "https://instagram.com", icon: "/icons/instagram.svg" },
  { label: "Facebook", href: "https://facebook.com", icon: "/icons/facebook.svg" },
  { label: "YouTube", href: "https://youtube.com", icon: "/icons/youtube.svg" },
  { label: "LinkedIn", href: "https://linkedin.com", icon: "/icons/linkedin.svg" },
];

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <Container className={styles.inner}>
        <div className={styles.grid}>
          <div className={styles.brandCol}>
            <Image
              src="/images/logo.png"
              alt="Boomslang Nutrition"
              width={200}
              height={100}
              className={styles.logoImg}
            />
            <p className={styles.tagline}>
              From Ayurvedic supplements for weight gain to pre workout supplements, Boomslang Nutrition is committed to supporting your fitness goals with quality nutrition and trusted formulations.
            </p>
            <h3 className={styles.followTitle}>Follow</h3>
            <div className={styles.socials}>
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className={styles.socialLink}
                  aria-label={social.label}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image
                    src={social.icon}
                    alt=""
                    width={18}
                    height={18}
                    className={styles.socialIcon}
                    aria-hidden="true"
                  />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className={styles.colTitle}>Quick Links</h3>
            <ul className={styles.linkList}>
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className={styles.link}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className={styles.colTitle}>Products</h3>
            <ul className={styles.linkList}>
              {productLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className={styles.link}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className={styles.colTitle}>Support</h3>
            <ul className={styles.linkList}>
              {supportLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className={styles.link}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className={styles.colTitle}>Contact</h3>
            <ul className={styles.contactList}>
              <li className={styles.contactItem}>
                <PinIcon className={styles.contactIcon} />
                <span>India</span>
              </li>
              <li className={styles.contactItem}>
                <MailIcon className={styles.contactIcon} />
                <a href="mailto:support@boomslangnutrition.com" className={styles.link}>
                   support@boomslangnutrition.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className={styles.bottom}>
          <p className={styles.copyright}>
            &copy; {new Date().getFullYear()} Boomslang Nutrition. All Rights Reserved. Crafted with ❤️ by VD Infotech – Web Development | Digital Marketing | App & Software | Branding
          </p>
        </div>
      </Container>
    </footer>
  );
}
