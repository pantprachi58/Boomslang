import Image from "next/image";
import SectionWrapper from "@/components/SectionWrapper/SectionWrapper";
import BlogCard from "@/components/BlogCard/BlogCard";
import styles from "./BlogSection.module.css";

const posts = [
  {
    image: "/images/blog-ayurvedic-supplements.png",
    title: "Ayurvedic Supplements for Weight Gain: Everything You Need To Know",
    description: "Learn how Ayurvedic ingredients can support healthy weight gain naturally.",
    date: "16 / 07 / 2026",
  },
  {
    image: "/images/blog-weight-gain-capsules.png",
    title: "Best Weight Gain Capsules: How to Choose the Right One",
    description: "Understand the factors to consider before selecting a weight gain supplement.",
    date: "16 / 07 / 2026",
  },
  {
    image: "/images/blog-healthy-weight-gain-tips.png",
    title: "Healthy Weight Gain Tips That Actually Work",
    description: "Discover simple lifestyle and nutrition habits that support sustainable weight gain.",
    date: "16 / 07 / 2026",
  },
  {
    image: "/images/blog-improve-appetite.png",
    title: "How to Improve Appetite Naturally",
    description: "Explore practical ways to encourage healthy eating habits and better nutrient intake.",
    date: "16 / 07 / 2026",
  },
];

export default function BlogSection() {
  return (
    <SectionWrapper background="light" className={styles.section} containerClassName={styles.container}>
      <div className={styles.banner}>
        <div className={styles.bannerBg}>
          <Image
            src="/images/learn-more-bg.jpg"
            alt=""
            fill
            className={styles.bannerImage}
            aria-hidden="true"
          />
        </div>
        <div className={styles.content}>
          <div className={styles.heading}>
            <span className={styles.titleTop}>Learn More About</span>
            <h2 className={styles.title}>Weight Gain &amp; Pre-Workout Supplements</h2>
            <p className={styles.subtitle}>
              Explore expert articles, nutrition tips, and ayurvedic guides to help you
              understand weight gain throughout your fitness journey.
            </p>
          </div>
          <div className={styles.grid}>
            {posts.map((post) => (
              <BlogCard key={post.title} {...post} />
            ))}
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
