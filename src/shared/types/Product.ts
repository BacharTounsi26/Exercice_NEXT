export type Product = {
  id: number;
  name: string;
  description?: string;
  price: number;
  discountRate?: number;
  review?: number;
  categoryId: string;
  categoryName: string;
  imageName: string;
  inStock?: boolean;
  isTopSeller?: boolean;
  isNewProduct?: boolean;
};
