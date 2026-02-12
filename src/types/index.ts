/**
 * Product type definitions based on DummyJSON API
 */

export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
  tags?: string[];
  sku?: string;
  weight?: number;
  dimensions?: {
    width: number;
    height: number;
    depth: number;
  };
  warrantyInformation?: string;
  shippingInformation?: string;
  availabilityStatus?: string;
  reviews?: Review[];
  returnPolicy?: string;
  minimumOrderQuantity?: number;
}

export interface Review {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
  reviewerEmail: string;
}

export interface ProductsResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

export interface SearchParams {
  search?: string;
  category?: string;
  sortBy?: SortOption;
  minPrice?: number;
  maxPrice?: number;
  skip?: number;
  limit?: number;
}

export type SortOption = 
  | 'newest' 
  | 'oldest' 
  | 'price-low-high' 
  | 'price-high-low';

export interface CategoryResponse {
  slug: string;
  name: string;
  url: string;
}
