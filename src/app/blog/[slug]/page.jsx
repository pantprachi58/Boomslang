import { notFound } from "next/navigation";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import BlogDetailContent from "@/components/sections/BlogDetailContent/BlogDetailContent";
import { fetchBlogBySlug, fetchPublicBlogs } from "@/lib/blogsApi";


export async function generateMetadata({ params }) {
  const blog = await fetchBlogBySlug(params.slug);

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

export default async function BlogDetailPage({ params }) {
  const blog = await fetchBlogBySlug(params.slug);

  if (!blog) {
    notFound();
  }

  const relatedResult = await fetchPublicBlogs({
    category: blog.category,
    limit: 3,
  });
  const relatedPosts = relatedResult.blogs
    .filter((post) => post.slug !== blog.slug)
    .slice(0, 2);

  return (
    <>
      <Header />
      <BlogDetailContent blog={blog} relatedPosts={relatedPosts} />
      <Footer />
    </>
  );
}
