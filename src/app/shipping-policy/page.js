import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import Container from "@/components/Container/Container";
import styles from "./ShippingPolicy.module.css";

export const metadata = {
  title: "Shipping Policy | Boomslang Nutrition",
  description:
    "Learn about Boomslang Nutrition's shipping policy, delivery timelines, and order processing for ayurvedic supplements.",
};

export default function ShippingPolicy() {
  return (
    <>
      <Header />
      <main className={styles.main}>
        <Container>
          <div className={styles.content}>
            <h1 className={styles.title}>Shipping Policy</h1>
            <p className={styles.effectiveDate}>
              Effective Date: July 7, 2026
            </p>

            <p className={styles.intro}>
              At Boomslang Nutrition, we are committed to delivering your order
              safely and efficiently. This Shipping Policy outlines how we
              process, dispatch, and deliver orders placed through our website.
            </p>

            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>1. Order Processing</h2>
              <ul className={styles.list}>
                <li>
                  Orders are typically processed within 1–2 business days after
                  successful payment confirmation.
                </li>
                <li>
                  Orders placed on weekends or public holidays will be
                  processed on the next business day.
                </li>
                <li>
                  During peak seasons, promotional campaigns, or unforeseen
                  circumstances, processing times may be slightly longer.
                </li>
                <li>
                  Once your order has been dispatched, you will receive a
                  shipping confirmation along with tracking details via your
                  registered email address or mobile number, where applicable.
                </li>
              </ul>
            </section>

            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>2. Delivery Timeline</h2>
              <p className={styles.paragraph}>
                Estimated delivery times are as follows:
              </p>
              <ul className={styles.list}>
                <li>
                  <strong>Metro Cities:</strong> 2–5 business days
                </li>
                <li>
                  <strong>Other Cities & Towns:</strong> 3–7 business days
                </li>
                <li>
                  <strong>Remote Locations:</strong> 5–10 business days
                </li>
              </ul>
              <p className={styles.paragraph}>
                Delivery timelines are estimates and may vary depending on your
                location, courier partner availability, weather conditions,
                public holidays, or other factors beyond our control.
              </p>
            </section>

            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>3. Shipping Charges</h2>
              <ul className={styles.list}>
                <li>
                  Shipping charges, if applicable, will be displayed during
                  checkout before payment is completed.
                </li>
                <li>
                  From time to time, Boomslang Nutrition may offer free
                  shipping promotions. Any such offers will be clearly
                  mentioned on our website and will apply only under the
                  specified terms.
                </li>
              </ul>
            </section>

            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>4. Delivery Coverage</h2>
              <ul className={styles.list}>
                <li>
                  We currently deliver to most serviceable locations across
                  India.
                </li>
                <li>
                  Delivery availability depends on the service network of our
                  courier partners. If your location is not serviceable, our
                  customer support team will contact you regarding alternative
                  arrangements or order cancellation.
                </li>
              </ul>
            </section>

            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>5. Order Tracking</h2>
              <ul className={styles.list}>
                <li>
                  After your order has been shipped, you will receive a
                  tracking number or tracking link to monitor your shipment.
                </li>
                <li>
                  Tracking information may take up to 24 hours to become active
                  after dispatch.
                </li>
              </ul>
            </section>

            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>6. Delivery Attempts</h2>
              <p className={styles.paragraph}>
                Our courier partners may make multiple delivery attempts before
                returning a shipment.
              </p>
              <p className={styles.paragraph}>To avoid delays, please ensure that:</p>
              <ul className={styles.list}>
                <li>Your shipping address is complete and accurate.</li>
                <li>Your contact number is correct and reachable.</li>
                <li>
                  Someone is available to receive the package during delivery.
                </li>
              </ul>
              <p className={styles.paragraph}>
                Additional shipping charges may apply if a package needs to be
                re-dispatched due to incorrect address details or repeated
                unsuccessful delivery attempts.
              </p>
            </section>

            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>7. Address Changes</h2>
              <ul className={styles.list}>
                <li>
                  If you need to update your shipping address after placing an
                  order, please contact us as soon as possible.
                </li>
                <li>
                  Address modifications can only be made before the order has
                  been dispatched. Once the shipment is in transit, we may not
                  be able to change the delivery address.
                </li>
              </ul>
            </section>

            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>8. Delayed Deliveries</h2>
              <p className={styles.paragraph}>
                While we strive to deliver orders within the estimated
                timeframe, delays may occasionally occur due to circumstances
                beyond our control, including:
              </p>
              <ul className={styles.list}>
                <li>Extreme weather conditions</li>
                <li>Natural disasters</li>
                <li>Public holidays</li>
                <li>Transportation disruptions</li>
                <li>Government restrictions</li>
                <li>High order volumes</li>
                <li>Courier operational issues</li>
              </ul>
              <p className={styles.paragraph}>
                We appreciate your patience and understanding in such
                situations.
              </p>
            </section>

            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>9. Lost Shipments</h2>
              <ul className={styles.list}>
                <li>
                  If your order has not been delivered within the expected
                  timeframe and tracking information has not been updated for
                  an extended period, please contact our customer support team.
                </li>
                <li>
                  We will coordinate with the courier partner to investigate
                  the shipment and provide an appropriate resolution.
                </li>
              </ul>
            </section>

            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>
                10. Damaged or Incorrect Orders
              </h2>
              <ul className={styles.list}>
                <li>
                  If you receive a damaged, defective, incomplete, or incorrect
                  product, please notify us as soon as possible after delivery.
                </li>
                <li>
                  The process for replacements and refunds is outlined in our
                  Return & Refund Policy.
                </li>
              </ul>
            </section>

            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>11. International Shipping</h2>
              <ul className={styles.list}>
                <li>
                  Unless otherwise stated on our website, Boomslang Nutrition
                  currently ships only within India.
                </li>
                <li>
                  If international shipping becomes available in the future,
                  applicable shipping charges, customs duties, taxes, and
                  delivery timelines will be communicated during checkout.
                </li>
              </ul>
            </section>

            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>12. Contact Us</h2>
              <p className={styles.paragraph}>
                If you have any questions regarding shipping or your order
                status, please contact us:
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
