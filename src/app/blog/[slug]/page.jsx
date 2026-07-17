import { notFound } from "next/navigation";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import BlogDetailContent from "@/components/sections/BlogDetailContent/BlogDetailContent";
import { getAllBlogs, getBlogBySlug } from "@/data/blogs";

export function generateStaticParams() {
  return getAllBlogs().map((blog) => ({
    slug: blog.slug,
  }));
}

export function generateMetadata({ params }) {
  const blog = getBlogBySlug(params.slug);

  if (!blog) {
    return {
      title: "Blog Not Found | Boomslang Nutrition",
    };
  }

  return {
    title: `${blog.title} | Boomslang Nutrition`,
    description: blog.description,
  };
}

export default function BlogDetailPage({ params }) {
  const blog = getBlogBySlug(params.slug);

  if (!blog) {
    notFound();
  }

  return (
    <>
      <Header />
      <BlogDetailContent blog={blog} />
      <Footer />
    </>
  );
}
