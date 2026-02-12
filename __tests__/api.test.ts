import { productsAPI } from '../src/api/products';

// Mock fetch globally
(globalThis as any).fetch = jest.fn();

describe('ProductsAPI', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getProducts', () => {
    it('should fetch all products successfully', async () => {
      const mockResponse = {
        products: [
          { id: 1, title: 'Product 1', price: 100 },
          { id: 2, title: 'Product 2', price: 200 },
        ],
        total: 2,
        skip: 0,
        limit: 30,
      };

      (globalThis.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      const result = await productsAPI.getProducts();

      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining('/products?limit=30&skip=0')
      );
      expect(result.products).toHaveLength(2);
      expect(result.total).toBe(2);
    });

    it('should handle search queries', async () => {
      const mockResponse = {
        products: [{ id: 1, title: 'iPhone', price: 999 }],
        total: 1,
        skip: 0,
        limit: 30,
      };

      (globalThis.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      await productsAPI.getProducts({ search: 'iPhone' });

      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining('/products/search?q=iPhone')
      );
    });

    it('should handle category filtering', async () => {
      const mockResponse = {
        products: [{ id: 1, title: 'Smartphone', price: 699 }],
        total: 1,
        skip: 0,
        limit: 30,
      };

      (globalThis.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      await productsAPI.getProducts({ category: 'smartphones' });

      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining('/products/category/smartphones')
      );
    });

    it('should handle API errors', async () => {
      (globalThis.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        status: 500,
      });

      await expect(productsAPI.getProducts()).rejects.toThrow(
        'Failed to fetch products'
      );
    });

    it('should filter products by price range', async () => {
      const mockResponse = {
        products: [
          { id: 1, title: 'Product 1', price: 50 },
          { id: 2, title: 'Product 2', price: 150 },
          { id: 3, title: 'Product 3', price: 250 },
        ],
        total: 3,
        skip: 0,
        limit: 30,
      };

      (globalThis.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      const result = await productsAPI.getProducts({
        minPrice: 100,
        maxPrice: 200,
      });

      expect(result.products).toHaveLength(1);
      expect(result.products[0].price).toBe(150);
    });

    it('should sort products by price low to high', async () => {
      const mockResponse = {
        products: [
          { id: 1, title: 'Product 1', price: 300 },
          { id: 2, title: 'Product 2', price: 100 },
          { id: 3, title: 'Product 3', price: 200 },
        ],
        total: 3,
        skip: 0,
        limit: 30,
      };

      (globalThis.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      const result = await productsAPI.getProducts({ sortBy: 'price-low-high' });

      expect(result.products[0].price).toBe(100);
      expect(result.products[1].price).toBe(200);
      expect(result.products[2].price).toBe(300);
    });
  });

  describe('getProductById', () => {
    it('should fetch a single product successfully', async () => {
      const mockProduct = {
        id: 1,
        title: 'Test Product',
        price: 99.99,
        description: 'Test description',
      };

      (globalThis.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockProduct,
      });

      const result = await productsAPI.getProductById(1);

      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining('/products/1')
      );
      expect(result.id).toBe(1);
      expect(result.title).toBe('Test Product');
    });

    it('should handle 404 errors', async () => {
      (globalThis.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        status: 404,
      });

      await expect(productsAPI.getProductById(999)).rejects.toThrow(
        'Product not found'
      );
    });
  });

  describe('getCategories', () => {
    it('should fetch categories successfully', async () => {
      const mockCategories = [
        { slug: 'smartphones', name: 'Smartphones', url: '' },
        { slug: 'laptops', name: 'Laptops', url: '' },
      ];

      (globalThis.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockCategories,
      });

      const result = await productsAPI.getCategories();

      expect(result).toEqual(['smartphones', 'laptops']);
    });

    it('should handle errors when fetching categories', async () => {
      (globalThis.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        status: 500,
      });

      await expect(productsAPI.getCategories()).rejects.toThrow(
        'Failed to fetch categories'
      );
    });
  });
});
