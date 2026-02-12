import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProduct } from '../hooks/useProducts';
import { Loading, ErrorMessage } from '../components/Loading';
import { Button } from '../components/Button';
import { Rating } from '../components/Rating';
import { ArrowLeftIcon, boxIcon, truckIcon, securePaymentsIcon, chevronIcon } from '../icons';

/**
 * Product detail page showing comprehensive product information
 */
export const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const productId = parseInt(id || '0', 10);
  
  const { product, loading, error } = useProduct(productId);

  if (loading) {
    return <Loading message="Loading product details..." fullPage />;
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <ErrorMessage 
          message={error || 'Product not found'} 
          retry={() => navigate('/')}
        />
      </div>
    );
  }

  const handleAddToCart = () => {
    alert(`Added ${product.title} to cart!`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with Back Button */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors"
            aria-label="Back to products"
          >
            <ArrowLeftIcon className="mr-2" />
            <span className="font-medium">Back to Products</span>
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-card overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6 lg:p-8">
            {/* Product Images */}
            <div>
              {/* Main Image */}
              <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden mb-4">
                <img
                  src={product.thumbnail}
                  alt={`${product.title} - Main Image`}
                  className="w-full h-full object-cover object-center"
                />
              </div>
            </div>

            {/* Product Information */}
            <div>
               <span className="inline-block bg-gray-100 capitalize text-black text-xs px-3 py-1 rounded-full mb-2">
                  {product.category}
                </span>
                <span className="inline-block mx-2 bg-black text-white text-xs font-semibold px-3 py-1 rounded-full mb-2">
                  In stock
                </span>

              {/* Title */}
              <h1 className="text-3xl text-gray-900 mb-2">
                {product.title}
              </h1>

              <div className="mb-4 text-gray-700">{product.description}</div>


              {/* Rating and Reviews */}
              <div className="flex items-center gap-4 mb-6">
                <Rating rating={product.rating} showValue size={18} />
              </div>

              {/* Price */}
              <div className="mb-6">
                <div className="flex items-baseline gap-3">
                  <span className="text-4xl text-gray-900">
                    ${product.price.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Product Details */}
                <div className="grid grid-cols-2 gap-4 mb-6 pt-4 border-t border-gray-200">
                {product.brand && (
                  <div>
                    <p className="text-sm text-gray-500">Brand</p>
                    <p className="font-medium text-gray-900">{product.brand}</p>
                  </div>
                )}
                {product.sku && (
                  <div>
                    <p className="text-sm text-gray-500">SKU</p>
                    <p className="font-medium text-gray-900">{product.sku}</p>
                  </div>
                )}
                <div>
                  <p className="text-sm text-gray-500">Stock</p>
                  <p className="font-medium text-gray-900">{product.stock} units</p>
                </div>
                {product.weight && (
                  <div>
                    <p className="text-sm text-gray-500">Weight</p>
                    <p className="font-medium text-gray-900">{product.weight}g</p>
                  </div>
                )}
                {product.dimensions && (
                  <div>
                    <p className="text-sm text-gray-500">Dimensions</p>
                    <p className="font-medium text-gray-900">
                      {product.dimensions.width} × {product.dimensions.height} × {product.dimensions.depth} cm
                    </p>
                  </div>
                )}
              </div>

              {/* Tags */}
              {product.tags && product.tags.length > 0 && (
                <div className="mb-6">
                  <p className="text-sm text-gray-500 mb-2">Tags</p>
                  <div className="flex flex-wrap gap-2">
                    {product.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="bg-gray-100 capitalize text-gray-900 px-3 py-1 rounded-full text-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex items-center gap-4 mb-6">
      
                <div className="flex-1">
                  <label className="block text-sm text-gray-700 mb-1">&nbsp;</label>
                  <Button
                    variant="primary"
                    size="md"
                    className='bg-black hover:bg-black/90 text-white'
                    fullWidth
                    onClick={handleAddToCart}
                    disabled={product.stock === 0}
                  >
                    
                    {product.stock === 0 ? 'Out of Stock' : <><img src={boxIcon} alt="Order Now" className="w-4 h-4" /> <span className="ml-2">Order Now</span></>}
                  </Button>
                </div>
              </div>
              <div className="flex items-center gap-2 mt-4 border-t border-gray-200 pt-2">
                <img src={truckIcon} alt="Fast shipping" className="w-4 h-4" />
                <span className="text-sm text-gray-700">Fast shipping</span>
                <img src={securePaymentsIcon} alt="Secure Payment" className="w-4 h-4 ml-4" />
                <span className="text-sm text-gray-700">Secure Payment</span>
              </div>
            </div>
          </div>

          {/* Additional Information */}
                {(product.warrantyInformation || product.shippingInformation || product.returnPolicy) && (
                <div className="border-t border-gray-200 p-4 lg:p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Additional Information</h2>
                    <div className="space-y-1">
                    {/* Warranty Accordion */}
                    {product.warrantyInformation && (
                    <details className="group py-2 border-b border-gray-200">
                      <summary className="flex items-center cursor-pointer py-2 font-medium text-gray-700 transition-colors border-none bg-transparent">
                      <span>Warranty Information</span>
                      <span className="ml-auto transition-transform group-open:rotate-90">
                       <img src={chevronIcon} alt="Expand" className="w-4 h-4 text-gray-500" />
                      </span>
                      </summary>
                      <div className="py-2 text-sm text-gray-600">
                      {product.warrantyInformation}
                      </div>
                    </details>
                    )}
                    {/* Shipping Accordion */}
                    {product.shippingInformation && (
                    <details className="group py-2 border-b border-gray-200">
                      <summary className="flex items-center cursor-pointer py-2 font-medium text-gray-700 transition-colors border-none bg-transparent">
                      <span>Shipping Information</span>
                      <span className="ml-auto transition-transform group-open:rotate-90">
                      <img src={chevronIcon} alt="Expand" className="w-4 h-4 text-gray-500" />
                      </span>
                      </summary>
                      <div className="py-2 text-sm text-gray-600">
                      {product.shippingInformation}
                      </div>
                    </details>
                    )}
                    {/* Return Policy Accordion */}
                    {product.returnPolicy && (
                    <details className="group py-2">
                      <summary className="flex items-center cursor-pointer py-2 font-medium text-gray-700 transition-colors border-none bg-transparent">
                      <span>Return Policy</span>
                      <span className="ml-auto transition-transform group-open:rotate-90">
                      <img src={chevronIcon} alt="Expand" className="w-4 h-4 text-gray-500" />
                      </span>
                      </summary>
                      <div className="py-2 text-sm text-gray-600">
                      {product.returnPolicy}
                      </div>
                    </details>
                    )}
                    </div>
                </div>
                )}

          {/* Customer Reviews */}
          {product.reviews && product.reviews.length > 0 && (
            <div className="border-t border-gray-200 p-6 lg:p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Customer Reviews</h2>
              <div className="space-y-6">
                {product.reviews.map((review, index) => (
                    <div
                    key={index}
                    className="border border-gray-200 rounded-lg p-6 mb-6 last:mb-0"
                    >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                      <p className="font-semibold text-gray-900">{review.reviewerName}</p>
                      <p className="text-sm text-gray-500 mb-1">{review.reviewerEmail}</p>
                      <p className="text-gray-600">{review.comment}</p>
                      </div>
                      <div className="flex flex-col items-end gap-1">
                      <Rating rating={review.rating} />
                      <span className="text-xs pt-1 text-gray-500">
                        {new Date(review.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        })}
                      </span>
                      </div>
                    </div>
                    </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};
