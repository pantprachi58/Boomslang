import Image from "next/image";
import SectionWrapper from "@/components/SectionWrapper/SectionWrapper";
import BlogCard from "@/components/BlogCard/BlogCard";
import { fetchRecentBlogs } from "@/lib/blogsApi";
import styles from "./BlogSection.module.css";

export default async function BlogSection() {
  const posts = await fetchRecentBlogs(4);

  if (!posts.length) return null;

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
              <BlogCard key={post.title} {...post} tone="light" />
            ))}
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
