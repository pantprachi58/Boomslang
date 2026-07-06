import Container from "@/components/Container/Container";
import styles from "./SectionWrapper.module.css";

export default function SectionWrapper({
  children,
  background = "light",
  className = "",
  containerClassName = "",
  as: Tag = "section",
  ...rest
}) {
  return (
    <Tag
      className={`${styles.section} ${styles[background]} ${className}`}
      {...rest}
    >
      <Container className={containerClassName}>{children}</Container>
    </Tag>
  );
}
