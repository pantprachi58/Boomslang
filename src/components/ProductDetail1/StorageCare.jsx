import Image from "next/image";
import Container from "@/components/Container/Container";
import { resolveAssetUrl } from "@/lib/assetUrl";
import styles from "./StorageCare.module.css";

export default function StorageCare({
  storageTitle = "Storage & Care",
  storage,
  disclaimerTitle = "Disclaimer",
  disclaimer,
  image,
  imageAlt = "Product storage",
}) {
  return (
    <section className={styles.section}>
      <Container>
        <div className={`${styles.grid} ${!image ? styles.singleColumn : ""}`}>
          {image && (
            <div className={styles.imageWrap}>
              <Image
                src={resolveAssetUrl(image)}
                alt={imageAlt}
                width={500}
                height={500}
                className={styles.image}
                sizes="(max-width: 768px) 100vw, 45vw"
              />
            </div>
          )}

          <div className={styles.content}>
            {storage && (
              <>
                <h2 className={styles.title}>{storageTitle}</h2>
                <p className={styles.description}>{storage}</p>
              </>
            )}

            {disclaimer && (
              <>
                <h2 className={styles.title}>{disclaimerTitle}</h2>
                <p className={styles.description}>{disclaimer}</p>
              </>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
