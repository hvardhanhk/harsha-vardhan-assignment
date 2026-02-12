import type { Product, ProductsResponse, SearchParams, CategoryResponse } from '../types';

const API_BASE_URL = 'https://dummyjson.com';

/**
 * API service for interacting with DummyJSON products endpoint
 */
class ProductsAPI {
  async getProducts(params: SearchParams = {}): Promise<ProductsResponse> {
    const { 
      search, 
      category, 
      sortBy, 
      minPrice, 
      maxPrice, 
      skip = 0, 
      limit = 30 
    } = params;

    let url: string;

    if (search && search.trim()) {
      url = `${API_BASE_URL}/products/search?q=${encodeURIComponent(search)}&limit=${limit}&skip=${skip}`;
    } 
    else if (category && category !== 'all') {
      url = `${API_BASE_URL}/products/category/${encodeURIComponent(category)}?limit=${limit}&skip=${skip}`;
    } 
    else {
      url = `${API_BASE_URL}/products?limit=${limit}&skip=${skip}`;
    }

    try {
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      let data: ProductsResponse = await response.json();

      let products = data.products;

      if (minPrice !== undefined || maxPrice !== undefined) {
        products = products.filter(product => {
          const price = product.price;
          if (minPrice !== undefined && price < minPrice) return false;
          if (maxPrice !== undefined && price > maxPrice) return false;
          return true;
        });
      }

      if (sortBy) {
        products = this.sortProducts(products, sortBy);
      }

      return {
        ...data,
        products,
        total: products.length,
      };
    } catch (error) {
      console.error('Error fetching products:', error);
      throw new Error('Failed to fetch products. Please try again later.');
    }
  }

  /**
   * Fetch a single product by ID
   */
  async getProductById(id: number): Promise<Product> {
    try {
      const response = await fetch(`${API_BASE_URL}/products/${id}`);
      
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('Product not found');
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error(`Error fetching product ${id}:`, error);
      throw error instanceof Error ? error : new Error('Failed to fetch product');
    }
  }

  /**
   * Fetch all available categories
   */
  async getCategories(): Promise<string[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/products/categories`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const categories: CategoryResponse[] = await response.json();
      return categories.map(cat => cat.slug);
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw new Error('Failed to fetch categories');
    }
  }

  /**
   * Sort products based on the selected option
   */
  private sortProducts(products: Product[], sortBy: string): Product[] {
    const sorted = [...products];

    switch (sortBy) {
      case 'newest':
        // Assume higher ID means newer (limitation of DummyJSON)
        return sorted.sort((a, b) => b.id - a.id);
      
      case 'oldest':
        return sorted.sort((a, b) => a.id - b.id);
      
      case 'price-low-high':
        return sorted.sort((a, b) => a.price - b.price);
      
      case 'price-high-low':
        return sorted.sort((a, b) => b.price - a.price);
      
      default:
        return sorted;
    }
  }
}

// Export singleton instance
export const productsAPI = new ProductsAPI();
