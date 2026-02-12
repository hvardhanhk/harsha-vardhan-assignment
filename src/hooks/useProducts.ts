import { useState, useEffect } from 'react';
import { productsAPI } from '../api/products';
import type { Product, ProductsResponse, SearchParams } from '../types';

/**
 * Custom hook for fetching and managing products list
 */
export function useProducts(params: SearchParams) {
  const [data, setData] = useState<ProductsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchProducts() {
      try {
        setLoading(true);
        setError(null);
        const result = await productsAPI.getProducts(params);
        
        if (isMounted) {
          setData(result);
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : 'An error occurred');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    fetchProducts();

    return () => {
      isMounted = false;
    };
  }, [
    params.search,
    params.category,
    params.sortBy,
    params.minPrice,
    params.maxPrice,
    params.skip,
    params.limit,
  ]);

  return { data, loading, error };
}

/**
 * Custom hook for fetching a single product by ID
 */
export function useProduct(id: number) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchProduct() {
      try {
        setLoading(true);
        setError(null);
        const result = await productsAPI.getProductById(id);
        
        if (isMounted) {
          setProduct(result);
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : 'Product not found');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    if (id) {
      fetchProduct();
    }

    return () => {
      isMounted = false;
    };
  }, [id]);

  return { product, loading, error };
}

/**
 * Custom hook for fetching categories
 */
export function useCategories() {
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchCategories() {
      try {
        setLoading(true);
        setError(null);
        const result = await productsAPI.getCategories();
        
        if (isMounted) {
          setCategories(result);
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : 'Failed to fetch categories');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    fetchCategories();

    return () => {
      isMounted = false;
    };
  }, []);

  return { categories, loading, error };
}
