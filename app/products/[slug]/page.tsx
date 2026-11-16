
import { notFound } from "next/navigation";
import { products } from "../../products/products";
import ProductDetail from "../../components/product-details";

export const instant = false;

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;

  const product = products.find(
    (item) => item.slug === slug
  );

  if (!product) {
    notFound();
  }

  return <ProductDetail product={product} />;
}