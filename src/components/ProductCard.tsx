import React from 'react';
import { Link } from 'react-router-dom';
import type { Product } from '../types';
import { Rating } from './Rating';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const productPrice = product.price;
  
  return (
    <Link
      to={`/product/${product.id}`}
      className="group block bg-white rounded-lg border border-gray-200 shadow-card hover:shadow-card-hover transition-shadow duration-100"
      aria-label={`View details for ${product.title}`}
    >
      <div className="relative m-4 aspect-square overflow-hidden rounded-t-lg bg-gray-100">
      <img
        src={product.thumbnail}
        alt={product.title}
        className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-200"
        loading="lazy"
      />
      </div>

      <div className="p-4">
      <h3 className="text-sm font-medium text-gray-900 line-clamp-2 mb-2 group-hover:text-primary transition-colors">
        {product.title}
      </h3>

      <div className="mb-2">
        <Rating rating={product.rating} showValue size={14} />
      </div>

      <div className="flex items-baseline gap-2">
        <span className="text-lg text-gray-900">
        ${productPrice.toFixed(2)}
        </span>
      </div>
      </div>
    </Link>
  );
};
