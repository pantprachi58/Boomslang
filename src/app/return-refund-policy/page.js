import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import Container from "@/components/Container/Container";
import styles from "./ReturnRefundPolicy.module.css";

export const metadata = {
  title: "Return & Refund Policy | Boomslang Nutrition",
  description:
    "Learn about Boomslang Nutrition's Return & Refund Policy. Understand our process for returns, replacements, refunds, and order cancellations.",
};

export default function ReturnRefundPolicy() {
  return (
    <>
      <Header />
      <main className={styles.main}>
        <Container>
          <div className={styles.content}>
            <h1 className={styles.title}>Return &amp; Refund Policy</h1>
            <p className={styles.effectiveDate}>
              Effective Date: July 7, 2026
            </p>

            <p className={styles.intro}>
              At Boomslang Nutrition, customer satisfaction is important to us.
              We strive to deliver authentic, high-quality sports nutrition
              products in excellent condition. Due to the nature of dietary
              supplements, returns and refunds are accepted only under the
              conditions outlined below.
            </p>

            <p className={styles.intro}>
              By placing an order on our website, you agree to this Return &amp;
              Refund Policy.
            </p>

            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>1. Return Eligibility</h2>
              <p className={styles.paragraph}>
                You may be eligible for a return, replacement, or refund if:
              </p>
              <ul className={styles.list}>
                <li>You received an incorrect product.</li>
                <li>The product arrived damaged during transit.</li>
                <li>The product was defective upon delivery.</li>
                <li>The product expired at the time of delivery.</li>
                <li>Your order was incomplete or an item was missing.</li>
              </ul>
              <p className={styles.paragraph}>
                Any such issue must be reported to our customer support team
                within <strong>48 hours of delivery</strong>.
              </p>
            </section>

            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>
                2. Products Not Eligible for Return
              </h2>
              <p className={styles.paragraph}>
                For hygiene, health, and safety reasons, we cannot accept
                returns for:
              </p>
              <ul className={styles.list}>
                <li>Opened or used products.</li>
                <li>Products with broken or tampered safety seals.</li>
                <li>Products that have been partially or fully consumed.</li>
                <li>
                  Products damaged due to improper storage or handling after
                  delivery.
                </li>
                <li>Return requests submitted after the eligible reporting period.</li>
                <li>
                  Products purchased during clearance, promotional, or special
                  sale campaigns unless they are damaged, defective, or
                  incorrectly delivered.
                </li>
              </ul>
            </section>

            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>
                3. Unboxing Video Requirement
              </h2>
              <p className={styles.paragraph}>
                To help us investigate claims efficiently, customers are
                strongly encouraged to record a clear and uninterrupted
                unboxing video while opening the package.
              </p>
              <p className={styles.paragraph}>
                For claims related to damaged, incorrect, missing, or tampered
                products, an unboxing video and clear photographs may be
                requested as supporting evidence. Failure to provide sufficient
                evidence may affect our ability to approve the request.
              </p>
            </section>

            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>
                4. How to Request a Return
              </h2>
              <p className={styles.paragraph}>
                To request a return, replacement, or refund, please contact our
                customer support team with:
              </p>
              <ul className={styles.list}>
                <li>Order Number</li>
                <li>Registered Email Address or Mobile Number</li>
                <li>Description of the issue</li>
                <li>Clear photographs of the product and packaging</li>
                <li>Unboxing video (if available)</li>
              </ul>
              <p className={styles.paragraph}>
                Our support team will review your request and respond with the
                next steps.
              </p>
            </section>

            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>5. Return Approval</h2>
              <p className={styles.paragraph}>
                Each request is reviewed individually after verification.
              </p>
              <p className={styles.paragraph}>
                If approved, Boomslang Nutrition will provide instructions for
                returning the product or arrange a replacement, depending on the
                nature of the issue.
              </p>
              <p className={styles.paragraph}>
                Products should not be returned without prior approval from our
                customer support team.
              </p>
            </section>

            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>6. Replacement Policy</h2>
              <p className={styles.paragraph}>
                Where applicable, we may offer a replacement instead of a
                refund.
              </p>
              <p className={styles.paragraph}>Replacements are subject to:</p>
              <ul className={styles.list}>
                <li>Verification of the reported issue.</li>
                <li>Availability of stock.</li>
                <li>Compliance with this Return &amp; Refund Policy.</li>
              </ul>
              <p className={styles.paragraph}>
                If the original product is unavailable, we may offer an
                alternative product of similar value or process a refund.
              </p>
            </section>

            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>7. Refund Policy</h2>
              <p className={styles.paragraph}>
                Once your request has been approved and, where applicable, the
                returned product has been received and inspected, the refund
                will be initiated through the original payment method used
                during purchase.
              </p>
              <p className={styles.paragraph}>
                Approved refunds are generally processed within{" "}
                <strong>5–7 business days</strong>. The time required for the
                amount to reflect in your account may vary depending on your
                bank or payment service provider.
              </p>
            </section>

            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>8. Order Cancellation</h2>
              <p className={styles.paragraph}>
                Orders may be cancelled only before they have been dispatched.
              </p>
              <p className={styles.paragraph}>
                Once an order has been shipped, cancellation is no longer
                possible.
              </p>
              <p className={styles.paragraph}>
                If you refuse to accept a shipped order, Boomslang Nutrition
                reserves the right to deduct applicable shipping or handling
                charges from the refund, where permitted by applicable law.
              </p>
            </section>

            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>
                9. Order Marked Delivered but Not Received
              </h2>
              <p className={styles.paragraph}>
                If your order tracking status shows "Delivered" but you have not
                received your package, please notify our customer support team
                within <strong>72 hours</strong> of the delivery update.
              </p>
              <p className={styles.paragraph}>
                We will coordinate with the courier partner to investigate the
                matter and provide an appropriate resolution.
              </p>
            </section>

            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>
                10. Situations Where Refunds May Not Be Approved
              </h2>
              <p className={styles.paragraph}>
                Refunds or returns may not be approved in the following
                situations:
              </p>
              <ul className={styles.list}>
                <li>Change of mind after delivery.</li>
                <li>Incorrect product ordered by the customer.</li>
                <li>Personal taste or flavour preferences.</li>
                <li>
                  Dissatisfaction based on individual fitness or nutritional
                  results.
                </li>
                <li>
                  Allergic reactions to ingredients clearly listed on the
                  product label or website.
                </li>
                <li>Failure to follow the recommended usage instructions.</li>
                <li>Claims submitted without sufficient supporting evidence.</li>
              </ul>
              <p className={styles.paragraph}>
                Customers are advised to carefully review product descriptions,
                ingredients, nutritional information, and usage instructions
                before placing an order.
              </p>
            </section>

            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>
                11. Partial Payment Policy
              </h2>
              <p className={styles.paragraph}>
                Where Boomslang Nutrition accepts partial payments for selected
                products, services, or promotional offers, such partial payments
                shall be considered non-refundable, unless otherwise required by
                applicable law or specifically stated at the time of purchase.
              </p>
            </section>

            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>12. Contact Us</h2>
              <p className={styles.paragraph}>
                For any questions regarding returns, replacements,
                cancellations, or refunds, please contact us:
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
                Please include your Order Number and relevant details so our
                support team can assist you as quickly as possible.
              </p>
            </section>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
