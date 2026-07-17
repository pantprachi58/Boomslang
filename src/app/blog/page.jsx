import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import BlogContent from "@/components/sections/BlogContent/BlogContent";
import styles from "./Blog.module.css";

export const metadata = {
  title: "Blog | Boomslang Nutrition",
  description: "Explore expert articles, nutrition tips, and ayurvedic guides about weight gain and fitness.",
};

export default function BlogPage() {
  return (
    <>
      <Header />
      <main className={styles.blogPage}>
        <BlogContent />
      </main>
      <Footer />
    </>
  );
}
