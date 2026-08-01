import ProductForm from "../ProductForm";

export default function EditProductPage({ params }) {
  return <ProductForm mode="edit" slug={params.slug} />;
}
