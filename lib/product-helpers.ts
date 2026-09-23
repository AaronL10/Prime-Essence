export interface ProductVariant {
  id: string;
  sizeMl: number;
  price: number;
  stock: number;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  brand: string;
  description: string;
  image: string;
  category?: string;
  variants: ProductVariant[];
}

export function getStartingPrice(variants: ProductVariant[]): number {
  const inStock = variants.filter((v) => v.stock > 0);
  const pool = inStock.length > 0 ? inStock : variants;
  if (pool.length === 0) return 0;
  return Math.min(...pool.map((v) => v.price));
}

export function isAnyVariantInStock(variants: ProductVariant[]): boolean {
  return variants.some((v) => v.stock > 0);
}