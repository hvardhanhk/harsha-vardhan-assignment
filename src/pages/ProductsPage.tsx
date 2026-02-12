import React, { useState, useMemo } from 'react';
import { useProducts, useCategories } from '../hooks/useProducts';
import { useDebounce } from '../hooks/useDebounce';
import { ProductCard } from '../components/ProductCard';
import { Input } from '../components/Input';
import { Select } from '../components/Select';
import { Pagination } from '../components/Pagination';
import { Loading, ErrorMessage } from '../components/Loading';
import { searchIcon } from '../icons';
import type { SortOption } from '../types';

const ITEMS_PER_PAGE = 12;

export const ProductsPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState<SortOption>('newest');
  const [currentPage, setCurrentPage] = useState(1);

  // Debounce search query to avoid excessive API calls
  const debouncedSearch = useDebounce(searchQuery, 500);

  // Fetch products with current filters
  const { data, loading, error } = useProducts({
    search: debouncedSearch,
    category: selectedCategory,
    sortBy,
    minPrice: 0,
    maxPrice: 10000,
    skip: (currentPage - 1) * ITEMS_PER_PAGE,
    limit: ITEMS_PER_PAGE,
  });

  const { categories, loading: categoriesLoading } = useCategories();

  // Sort options for dropdown
  const sortOptions = [
    { value: 'newest', label: 'Newest' },
    { value: 'oldest', label: 'Oldest' },
    { value: 'price-low-high', label: 'Price: Low to High' },
    { value: 'price-high-low', label: 'Price: High to Low' },
  ];

  const categoryOptions = useMemo(() => {
    const options = [{ value: 'all', label: 'All Categories' }];
    if (categories.length > 0) {
      categories.forEach(category => {
        options.push({
          value: category,
          label: category.charAt(0).toUpperCase() + category.slice(1).replace(/-/g, ' '),
        });
      });
    }
    return options;
  }, [categories]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  React.useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearch, selectedCategory, sortBy]);

  return (
    <div className="min-h-screen">
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-2xl text-gray-900">Product Catalog</h1>
          <p className="mt-1 text-sm text-gray-600">Discover our wide selection of quality products</p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters Section */}
        <div className="bg-white rounded-lg shadow-card p-6 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Search Input */}
            <div className="lg:col-span-2">
              <Input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              icon={<img src={searchIcon} alt="Search" className="w-5 h-5 text-gray-400" />}
              aria-label="Search products"
              className="bg-gray-100 placeholder-gray-700"
              />
            </div>

            {/* Category Filter */}
            <Select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              options={categoryOptions}
              disabled={categoriesLoading}
              aria-label="Filter by category"
              id="category-filter"
              className="bg-gray-100 placeholder-gray-700"
            />

            {/* Sort Dropdown */}
            <Select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              options={sortOptions}
              aria-label="Sort products"
              className="bg-gray-100 placeholder-gray-700"
            />
            </div>
        </div>

        {/* Results Count */}
        {data && !loading && (
          <div className="mb-4 text-sm text-gray-600">
            Showing <span className="font-semibold">{data.products.length}</span> of{' '}
            <span className="font-semibold">{data.total}</span> products
          </div>
        )}

        {/* Loading State */}
        {loading && <Loading message="Loading products..." />}

        {/* Error State */}
        {error && <ErrorMessage message={error} />}

       
        {!loading && !error && data && (
          <>
            {data.products.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {data.products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No products found</p>
                <p className="text-gray-400 mt-2">Try adjusting your search or filters</p>
              </div>
            )}

            {/* Pagination */}
            {data.products.length > 0 && (
              <Pagination
                currentPage={currentPage}
                totalItems={data.total}
                itemsPerPage={ITEMS_PER_PAGE}
                onPageChange={handlePageChange}
              />
            )}
          </>
        )}
      </main>
    </div>
  );
};
