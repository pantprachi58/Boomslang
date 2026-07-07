import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import Container from "@/components/Container/Container";
import styles from "./TermsCondition.module.css";

export const metadata = {
  title: "Terms & Conditions | Boomslang Nutrition",
  description:
    "Review the Terms & Conditions governing the use of Boomslang Nutrition's website, products, and services.",
};

export default function TermsCondition() {
  return (
    <>
      <Header />
      <main className={styles.main}>
        <Container>
          <div className={styles.content}>
            <h1 className={styles.title}>Terms &amp; Conditions</h1>
            <p className={styles.effectiveDate}>
              Effective Date: July 7, 2026
            </p>

            <p className={styles.intro}>
              Welcome to Boomslang Nutrition. These Terms &amp; Conditions
              ("Terms") govern your access to and use of our website, products,
              and services. By accessing, browsing, or purchasing from our
              website, you agree to be bound by these Terms. If you do not
              agree with any part of these Terms, please refrain from using our
              website.
            </p>

            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>1. Eligibility</h2>
              <p className={styles.paragraph}>By using this website, you confirm that:</p>
              <ul className={styles.list}>
                <li>
                  You are at least 18 years of age or are using the website
                  under the supervision of a parent or legal guardian.
                </li>
                <li>
                  You have the legal capacity to enter into a binding
                  agreement.
                </li>
                <li>
                  The information you provide is accurate, complete, and up to
                  date.
                </li>
              </ul>
            </section>

            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>2. Acceptance of Terms</h2>
              <p className={styles.paragraph}>
                Your use of this website constitutes your acceptance of these
                Terms &amp; Conditions, our Privacy Policy, Shipping Policy,
                Return &amp; Refund Policy, Disclaimer, and any other policies
                published on this website.
              </p>
            </section>

            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>3. Products &amp; Services</h2>
              <p className={styles.paragraph}>
                Boomslang Nutrition offers sports nutrition and dietary
                supplement products intended to support an active and healthy
                lifestyle.
              </p>
              <ul className={styles.list}>
                <li>
                  All product information, descriptions, images, nutritional
                  values, ingredients, and pricing are provided for general
                  information purposes only. While we strive for accuracy,
                  occasional errors or updates may occur.
                </li>
                <li>
                  We reserve the right to modify, discontinue, or limit the
                  availability of any product or service without prior notice.
                </li>
              </ul>
            </section>

            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>4. Orders &amp; Acceptance</h2>
              <p className={styles.paragraph}>
                Placing an order on our website constitutes an offer to
                purchase a product.
              </p>
              <p className={styles.paragraph}>
                All orders are subject to verification and acceptance by
                Boomslang Nutrition. We reserve the right to:
              </p>
              <ul className={styles.list}>
                <li>Accept or reject any order.</li>
                <li>
                  Cancel orders suspected of fraud or unauthorized activity.
                </li>
                <li>Limit purchase quantities.</li>
                <li>Refuse service at our sole discretion.</li>
              </ul>
              <p className={styles.paragraph}>
                If an order is cancelled after payment has been received, the
                applicable refund will be processed in accordance with our
                Return &amp; Refund Policy.
              </p>
            </section>

            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>5. Pricing &amp; Payment</h2>
              <ul className={styles.list}>
                <li>
                  All prices displayed on the website are in Indian Rupees
                  (INR) unless otherwise stated and are inclusive of applicable
                  taxes unless specified otherwise.
                </li>
                <li>
                  We reserve the right to update prices, promotional offers,
                  discounts, or product availability without prior notice.
                </li>
                <li>
                  In the event of a pricing error caused by a technical,
                  typographical, or system issue, Boomslang Nutrition reserves
                  the right to cancel the affected order and issue an
                  appropriate refund where applicable.
                </li>
                <li>
                  Payments are processed through secure third-party payment
                  gateway providers. Boomslang Nutrition does not store
                  sensitive payment information such as debit or credit card
                  details, CVV, UPI PIN, or internet banking credentials.
                </li>
              </ul>
            </section>

            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>6. Shipping &amp; Delivery</h2>
              <ul className={styles.list}>
                <li>
                  Orders are processed and shipped according to our Shipping
                  Policy.
                </li>
                <li>
                  Estimated delivery timelines are indicative and may vary due
                  to courier operations, weather conditions, public holidays,
                  government restrictions, or other circumstances beyond our
                  reasonable control.
                </li>
                <li>
                  Customers are responsible for providing accurate shipping
                  information. Boomslang Nutrition shall not be liable for
                  delays or failed deliveries resulting from incorrect or
                  incomplete address details.
                </li>
              </ul>
            </section>

            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>
                7. Returns, Replacements &amp; Refunds
              </h2>
              <ul className={styles.list}>
                <li>
                  Returns, replacements, cancellations, and refunds are
                  governed exclusively by our Return &amp; Refund Policy.
                </li>
                <li>Please review that policy before placing your order.</li>
              </ul>
            </section>

            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>8. User Accounts</h2>
              <p className={styles.paragraph}>
                If you create an account with Boomslang Nutrition, you are
                responsible for:
              </p>
              <ul className={styles.list}>
                <li>Maintaining the confidentiality of your login credentials.</li>
                <li>Restricting unauthorized access to your account.</li>
                <li>
                  Ensuring that all account information remains accurate.
                </li>
              </ul>
              <p className={styles.paragraph}>
                You are responsible for all activities conducted through your
                account.
              </p>
            </section>

            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>9. User Conduct</h2>
              <p className={styles.paragraph}>You agree not to:</p>
              <ul className={styles.list}>
                <li>Violate any applicable laws or regulations.</li>
                <li>Use the website for fraudulent or unlawful purposes.</li>
                <li>Attempt unauthorized access to our systems.</li>
                <li>Introduce malware, viruses, or malicious software.</li>
                <li>
                  Interfere with the operation or security of the website.
                </li>
                <li>
                  Copy, scrape, or misuse website content without
                  authorization.
                </li>
              </ul>
              <p className={styles.paragraph}>
                Boomslang Nutrition reserves the right to suspend or terminate
                access for violations of these Terms.
              </p>
            </section>

            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>10. User Reviews &amp; Content</h2>
              <p className={styles.paragraph}>
                If you submit reviews, testimonials, comments, ratings,
                photographs, or other content to our website or social media
                platforms, you grant Boomslang Nutrition a non-exclusive,
                royalty-free, worldwide license to use, reproduce, publish,
                modify, and display such content for marketing and business
                purposes.
              </p>
              <p className={styles.paragraph}>
                You agree not to submit content that is:
              </p>
              <ul className={styles.list}>
                <li>False or misleading.</li>
                <li>Defamatory or abusive.</li>
                <li>Obscene or offensive.</li>
                <li>Infringing on intellectual property rights.</li>
                <li>
                  Harmful, unlawful, or otherwise prohibited by applicable law.
                </li>
              </ul>
              <p className={styles.paragraph}>
                We reserve the right to remove any content that violates these
                Terms without prior notice.
              </p>
            </section>

            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>11. Intellectual Property</h2>
              <p className={styles.paragraph}>
                All website content, including but not limited to:
              </p>
              <ul className={styles.list}>
                <li>Logos</li>
                <li>Product names</li>
                <li>Images</li>
                <li>Videos</li>
                <li>Graphics</li>
                <li>Text</li>
                <li>Product descriptions</li>
                <li>Designs</li>
                <li>Icons</li>
                <li>Website layout</li>
              </ul>
              <p className={styles.paragraph}>
                is the exclusive property of Boomslang Nutrition or its
                licensors and is protected under applicable intellectual
                property laws.
              </p>
              <p className={styles.paragraph}>
                No content may be copied, reproduced, distributed, modified, or
                commercially exploited without prior written permission.
              </p>
            </section>

            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>12. Third-Party Links</h2>
              <p className={styles.paragraph}>
                Our website may contain links to third-party websites for your
                convenience.
              </p>
              <p className={styles.paragraph}>
                Boomslang Nutrition does not control or endorse the content,
                privacy practices, products, or services of these external
                websites and shall not be responsible for any loss or damage
                arising from their use.
              </p>
            </section>

            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>13. Electronic Communications</h2>
              <p className={styles.paragraph}>
                By using our website or placing an order, you consent to
                receive communications electronically, including emails, SMS,
                WhatsApp messages, order confirmations, invoices, promotional
                offers, and customer service communications, where permitted by
                applicable law.
              </p>
            </section>

            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>14. Disclaimer of Warranties</h2>
              <p className={styles.paragraph}>
                This website and all products are provided on an "As Is" and
                "As Available" basis.
              </p>
              <p className={styles.paragraph}>
                Boomslang Nutrition makes no express or implied warranties
                regarding:
              </p>
              <ul className={styles.list}>
                <li>Website availability.</li>
                <li>Accuracy of information.</li>
                <li>Uninterrupted or error-free operation.</li>
                <li>Compatibility with your device.</li>
                <li>Results obtained from the use of our products.</li>
              </ul>
              <p className={styles.paragraph}>
                Individual health and fitness results may vary.
              </p>
            </section>

            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>15. Limitation of Liability</h2>
              <p className={styles.paragraph}>
                To the fullest extent permitted by applicable law, Boomslang
                Nutrition shall not be liable for any direct, indirect,
                incidental, consequential, special, or punitive damages arising
                from:
              </p>
              <ul className={styles.list}>
                <li>Use of the website.</li>
                <li>Inability to access the website.</li>
                <li>Purchase or use of products.</li>
                <li>Reliance on website information.</li>
                <li>Technical failures or interruptions.</li>
              </ul>
              <p className={styles.paragraph}>
                Your use of the website and products is entirely at your own
                risk.
              </p>
            </section>

            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>16. Indemnification</h2>
              <p className={styles.paragraph}>
                You agree to indemnify and hold harmless Boomslang Nutrition,
                its directors, employees, affiliates, partners, and service
                providers against any claims, losses, liabilities, damages,
                costs, or expenses arising from:
              </p>
              <ul className={styles.list}>
                <li>Your misuse of the website.</li>
                <li>Violation of these Terms.</li>
                <li>Violation of applicable laws.</li>
                <li>Infringement of third-party rights.</li>
              </ul>
            </section>

            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>17. Force Majeure</h2>
              <p className={styles.paragraph}>
                Boomslang Nutrition shall not be liable for any delay or
                failure in performing its obligations due to circumstances
                beyond its reasonable control, including but not limited to
                natural disasters, pandemics, strikes, transportation
                disruptions, internet outages, cyberattacks, government
                actions, or other force majeure events.
              </p>
            </section>

            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>18. Changes to These Terms</h2>
              <p className={styles.paragraph}>
                Boomslang Nutrition reserves the right to update, modify, or
                replace these Terms &amp; Conditions at any time without prior
                notice.
              </p>
              <p className={styles.paragraph}>
                Updated versions will be published on this page with a revised
                Effective Date. Continued use of the website after any changes
                constitutes your acceptance of the updated Terms.
              </p>
            </section>

            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>
                19. Governing Law &amp; Jurisdiction
              </h2>
              <p className={styles.paragraph}>
                These Terms &amp; Conditions shall be governed by and
                interpreted in accordance with the laws of India.
              </p>
              <p className={styles.paragraph}>
                Any disputes arising from the use of this website or the
                purchase of products shall be subject to the exclusive
                jurisdiction of the competent courts in the jurisdiction where
                Boomslang Nutrition is registered, unless otherwise required by
                applicable law.
              </p>
            </section>

            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>20. Contact Us</h2>
              <p className={styles.paragraph}>
                If you have any questions regarding these Terms &amp;
                Conditions, please contact us:
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
            </section>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
