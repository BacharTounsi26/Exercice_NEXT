import DescriptionTabs from "./DescriptionTabs";
import type { Product } from "@/shared/types/Product";

interface Props { product: Product }

/**
 * Prépare les données de description et specs côté serveur (SSR),
 * les passe en props à DescriptionTabs (CSR) qui gère le switch d'onglets.
 */
export default function ProductDescription({ product }: Props) {
  const specs = [
    { label: "SKU",      value: String(product.id) },
    { label: "Brand",    value: product.categoryName },
    { label: "Rating",   value: `${product.review ?? "—"}/5` },
    { label: "Stock",    value: product.inStock !== false ? "Available" : "Out of stock" },
    { label: "Discount", value: product.discountRate ? `${product.discountRate}%` : "None" },
  ];

  const descriptionParagraphs = product.description
    ? product.description.split("\n")
    : [];

  return (
    <DescriptionTabs
      descriptionParagraphs={descriptionParagraphs}
      specs={specs}
    />
  );
}
