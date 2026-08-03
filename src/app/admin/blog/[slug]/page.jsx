import BlogForm from "../BlogForm";

export default function EditBlogPage({ params }) {
  return <BlogForm mode="edit" slug={params.slug} />;
}
