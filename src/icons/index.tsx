import React from 'react';
import searchIcon from './search.svg';
import settingsIcon from './settings.svg';
import boxIcon from './box.svg';
import arrowIcon from './arrow.svg';
import chevronIcon from './chevron.svg';
import securePaymentsIcon from './secure-payments.svg';
import starIcon from './star.svg';
import truckIcon from './truck.svg';


export { searchIcon, settingsIcon, boxIcon, arrowIcon, chevronIcon, securePaymentsIcon, starIcon, truckIcon };

interface IconProps {
  className?: string;
  size?: number;
}

/**
 * Search icon
 */
export const SearchIcon: React.FC<IconProps> = ({ className = '', size = 20 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <path
      d="M9 17A8 8 0 1 0 9 1a8 8 0 0 0 0 16zM19 19l-4.35-4.35"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/**
 * Star icon (for ratings)
 */
export const StarIcon: React.FC<IconProps & { filled?: boolean }> = ({ 
  className = '', 
  size = 16, 
  filled = false 
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 20 20"
    fill={filled ? 'currentColor' : 'none'}
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <path
      d="M10 1l2.928 6.472L20 8.344l-5.344 4.656L16 20l-6-3.6L4 20l1.344-7-5.344-4.656 7.072-.872L10 1z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/**
 * Chevron down icon (for dropdowns)
 */
export const ChevronDownIcon: React.FC<IconProps> = ({ className = '', size = 20 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <path
      d="M5 7.5l5 5 5-5"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/**
 * Filter icon
 */
export const FilterIcon: React.FC<IconProps> = ({ className = '', size = 20 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <path
      d="M3 4h14M6 8h8M8 12h4"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/**
 * Shopping cart icon
 */
export const CartIcon: React.FC<IconProps> = ({ className = '', size = 20 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <path
      d="M1 1h2.5l3.5 14h10M6 5h13l-1.5 7H6M8 18a1 1 0 1 0 0-2 1 1 0 0 0 0 2zM16 18a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/**
 * Spinner/Loading icon
 */
export const SpinnerIcon: React.FC<IconProps> = ({ className = '', size = 24 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`animate-spin ${className}`}
    aria-hidden="true"
  >
    <circle
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
      className="opacity-25"
    />
    <path
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      className="opacity-75"
    />
  </svg>
);

/**
 * Arrow left icon (for back navigation)
 */
export const ArrowLeftIcon: React.FC<IconProps> = ({ className = '', size = 20 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <path
      d="M15 10H5M8 6l-4 4 4 4"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
