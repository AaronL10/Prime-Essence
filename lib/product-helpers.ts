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

export function getStartingPrice(variants: ProductVariant[] | undefined | null): number {
  const safe = variants ?? [];
  const inStock = safe.filter((v) => v.stock > 0);
  const pool = inStock.length > 0 ? inStock : safe;
  if (pool.length === 0) return 0;
  return Math.min(...pool.map((v) => v.price));
}

export function isAnyVariantInStock(variants: ProductVariant[] | undefined | null): boolean {
  return (variants ?? []).some((v) => v.stock > 0);
}