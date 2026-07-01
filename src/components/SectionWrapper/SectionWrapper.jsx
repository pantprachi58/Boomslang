import Container from "@/components/Container/Container";
import styles from "./SectionWrapper.module.css";

export default function SectionWrapper({
  children,
  id,
  className = "",
  containerClassName = "",
  background = "transparent",
  noContainer = false,
}) {
  return (
    <section
      id={id}
      className={`${styles.section} ${styles[background]} ${className}`}
    >
      {noContainer ? (
        children
      ) : (
        <Container className={containerClassName}>{children}</Container>
      )}
    </section>
  );
}
