import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import Container from "@/components/Container/Container";
import styles from "./PrivacyPolicy.module.css";

export const metadata = {
  title: "Privacy Policy | Boomslang Nutrition",
  description:
    "Learn how Boomslang Nutrition collects, uses, and protects your personal information. Read our comprehensive Privacy Policy.",
};

export default function PrivacyPolicy() {
  return (
    <>
      <Header />
      <main className={styles.main}>
        <Container>
          <div className={styles.content}>
            <h1 className={styles.title}>Privacy Policy</h1>
            <p className={styles.effectiveDate}>
              Effective Date: July 7, 2026
            </p>

            <p className={styles.intro}>
              At Boomslang Nutrition, we value your privacy and are committed
              to protecting your personal information. This Privacy Policy
              explains how we collect, use, store, process, and safeguard the
              information you provide when you visit our website, create an
              account, place an order, or interact with our services.
            </p>

            <p className={styles.intro}>
              By accessing or using our website, you acknowledge that you have
              read, understood, and agreed to this Privacy Policy. If you do
              not agree with any part of this Policy, please discontinue the
              use of our website and services.
            </p>

            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>1. Information We Collect</h2>
              <p className={styles.paragraph}>
                We may collect different types of information depending on how
                you interact with our website.
              </p>

              <h3 className={styles.subsectionTitle}>Personal Information</h3>
              <p className={styles.paragraph}>
                When you place an order, create an account, contact us, or
                subscribe to our communications, we may collect:
              </p>
              <ul className={styles.list}>
                <li>Full Name</li>
                <li>Email Address</li>
                <li>Mobile Number</li>
                <li>Billing Address</li>
                <li>Shipping Address</li>
                <li>PIN Code</li>
                <li>Order Details</li>
                <li>Customer Support Requests</li>
                <li>Communication Preferences</li>
              </ul>

              <h3 className={styles.subsectionTitle}>
                Automatically Collected Information
              </h3>
              <p className={styles.paragraph}>
                When you browse our website, we may automatically collect
                information such as:
              </p>
              <ul className={styles.list}>
                <li>IP Address</li>
                <li>Browser Type</li>
                <li>Device Information</li>
                <li>Operating System</li>
                <li>Pages Visited</li>
                <li>Time Spent on Our Website</li>
                <li>Referral Source</li>
                <li>Website Usage Data</li>
                <li>Cookies and Similar Technologies</li>
              </ul>
            </section>

            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>
                2. How We Collect Information
              </h2>
              <p className={styles.paragraph}>
                We collect information in several ways, including:
              </p>
              <ul className={styles.list}>
                <li>
                  Information you voluntarily provide while placing orders,
                  creating an account, or contacting us.
                </li>
                <li>
                  Information collected automatically through cookies, analytics
                  tools, and similar technologies.
                </li>
                <li>
                  Information received from trusted third-party service
                  providers where legally permitted.
                </li>
              </ul>
            </section>

            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>
                3. How We Use Your Information
              </h2>
              <p className={styles.paragraph}>
                We use your information to:
              </p>
              <ul className={styles.list}>
                <li>Process and fulfill your orders.</li>
                <li>Deliver products to your preferred address.</li>
                <li>Send order confirmations and shipping updates.</li>
                <li>Respond to customer service requests.</li>
                <li>Improve our website, products, and services.</li>
                <li>Personalize your shopping experience.</li>
                <li>Prevent fraud and unauthorized activities.</li>
                <li>Maintain website security.</li>
                <li>Comply with legal and regulatory obligations.</li>
                <li>Improve our marketing and customer experience.</li>
              </ul>
            </section>

            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>
                4. Marketing Communications
              </h2>
              <p className={styles.paragraph}>
                With your consent or where permitted by applicable law,
                Boomslang Nutrition may send you:
              </p>
              <ul className={styles.list}>
                <li>Promotional Emails</li>
                <li>SMS Notifications</li>
                <li>WhatsApp Messages</li>
                <li>Product Updates</li>
                <li>Newsletters</li>
                <li>Exclusive Offers</li>
                <li>Discount Campaigns</li>
              </ul>
              <p className={styles.paragraph}>
                You may unsubscribe from marketing communications at any time by
                using the unsubscribe option provided in the communication or by
                contacting our customer support team.
              </p>
            </section>

            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>5. Payment Information</h2>
              <p className={styles.paragraph}>
                Payments made through our website are processed by trusted and
                secure third-party payment gateway providers.
              </p>
              <p className={styles.paragraph}>
                Boomslang Nutrition does not collect or store your complete
                debit card, credit card, CVV, UPI PIN, internet banking
                credentials, or other sensitive payment information.
              </p>
              <p className={styles.paragraph}>
                Payment processing is subject to the security and privacy
                practices of the respective payment service providers.
              </p>
            </section>

            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>6. Cookies</h2>
              <p className={styles.paragraph}>
                Our website uses cookies and similar technologies to:
              </p>
              <ul className={styles.list}>
                <li>Remember your preferences.</li>
                <li>Improve website functionality.</li>
                <li>Analyze visitor behavior.</li>
                <li>Measure website performance.</li>
                <li>Enhance user experience.</li>
                <li>Support advertising and marketing campaigns.</li>
              </ul>
              <p className={styles.paragraph}>
                You can disable cookies through your browser settings. However,
                certain features of the website may not function properly if
                cookies are disabled.
              </p>
            </section>

            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>
                7. Sharing Your Information
              </h2>
              <p className={styles.paragraph}>
                We value your trust and do not sell, rent, or trade your
                personal information to third parties.
              </p>
              <p className={styles.paragraph}>
                Your information may be shared only with trusted service
                providers when necessary to operate our business, including:
              </p>
              <ul className={styles.list}>
                <li>Payment Gateway Providers</li>
                <li>Courier &amp; Logistics Partners</li>
                <li>Technology Service Providers</li>
                <li>Marketing &amp; Analytics Platforms</li>
                <li>Customer Support Providers</li>
                <li>Government Authorities where required by applicable law</li>
              </ul>
              <p className={styles.paragraph}>
                These parties receive only the information necessary to perform
                their services.
              </p>
            </section>

            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>
                8. Legal Disclosure &amp; Business Transfers
              </h2>
              <p className={styles.paragraph}>
                We may disclose your personal information if required to do so
                by applicable law, court order, government authority, or
                regulatory agency, or where necessary to protect the legal
                rights, safety, property, or operations of Boomslang Nutrition
                or our customers.
              </p>
              <p className={styles.paragraph}>
                In the event of a merger, acquisition, restructuring, sale of
                assets, or other business transfer, your personal information
                may be transferred to the successor entity. Any such entity will
                continue to protect your information in accordance with this
                Privacy Policy.
              </p>
            </section>

            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>9. Data Security</h2>
              <p className={styles.paragraph}>
                We implement appropriate administrative, technical, and
                organizational security measures to protect your personal
                information against unauthorized access, misuse, alteration,
                disclosure, or loss.
              </p>
              <p className={styles.paragraph}>
                While we take reasonable precautions to safeguard your
                information, no method of electronic transmission or internet
                storage can guarantee absolute security.
              </p>
            </section>

            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>10. Data Retention</h2>
              <p className={styles.paragraph}>
                We retain your personal information only for as long as
                necessary to:
              </p>
              <ul className={styles.list}>
                <li>Complete your orders.</li>
                <li>Provide customer support.</li>
                <li>Comply with legal, tax, and accounting obligations.</li>
                <li>Resolve disputes.</li>
                <li>Prevent fraud.</li>
                <li>Enforce our policies and agreements.</li>
              </ul>
              <p className={styles.paragraph}>
                When your information is no longer required, it will be securely
                deleted or anonymized where appropriate.
              </p>
            </section>

            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>11. Your Rights</h2>
              <p className={styles.paragraph}>
                Subject to applicable laws, you may request to:
              </p>
              <ul className={styles.list}>
                <li>Access your personal information.</li>
                <li>Correct inaccurate or incomplete information.</li>
                <li>Update your account details.</li>
                <li>
                  Request deletion of your personal data, where legally
                  permitted.
                </li>
                <li>Withdraw consent for marketing communications.</li>
              </ul>
              <p className={styles.paragraph}>
                To exercise these rights, please contact us using the details
                provided below.
              </p>
            </section>

            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>12. Third-Party Websites</h2>
              <p className={styles.paragraph}>
                Our website may contain links to third-party websites or
                services.
              </p>
              <p className={styles.paragraph}>
                Boomslang Nutrition is not responsible for the content, privacy
                practices, security, or policies of third-party websites. We
                encourage you to review their respective privacy policies before
                providing any personal information.
              </p>
            </section>

            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>13. Children's Privacy</h2>
              <p className={styles.paragraph}>
                Our website and products are intended for individuals aged 18
                years or older, or those using the website under the supervision
                of a parent or legal guardian.
              </p>
              <p className={styles.paragraph}>
                We do not knowingly collect personal information from children.
                If we become aware that such information has been collected
                unintentionally, we will take appropriate steps to remove it.
              </p>
            </section>

            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>14. Your Consent</h2>
              <p className={styles.paragraph}>
                By using the Boomslang Nutrition website and purchasing our
                products, you consent to the collection, use, storage, and
                processing of your personal information in accordance with this
                Privacy Policy.
              </p>
            </section>

            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>
                15. Changes to This Privacy Policy
              </h2>
              <p className={styles.paragraph}>
                Boomslang Nutrition reserves the right to update or modify this
                Privacy Policy at any time to reflect changes in our business
                practices, legal requirements, or technology.
              </p>
              <p className={styles.paragraph}>
                Any updates will be published on this page along with the
                revised Effective Date. Your continued use of our website after
                such changes constitutes your acceptance of the updated Privacy
                Policy.
              </p>
            </section>

            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>16. Contact Us</h2>
              <p className={styles.paragraph}>
                If you have any questions, concerns, or requests regarding this
                Privacy Policy or the way your personal information is handled,
                please contact us:
              </p>
              <div className={styles.contactInfo}>
                <p className={styles.contactBrand}>
                  <strong>Boomslang Nutrition</strong>
                </p>
                <p className={styles.contactEmail}>
                  <strong>Email:</strong>{" "}
                  <a href="mailto:support@boomslangnutrition.com">
                    support@boomslangnutrition.com
                  </a>
                </p>
              </div>
              <p className={styles.paragraph}>
                We will make reasonable efforts to respond to your queries as
                promptly as possible.
              </p>
            </section>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
