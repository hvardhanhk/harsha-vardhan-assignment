import React from 'react';
import { StarIcon } from '../icons';

interface RatingProps {
  rating: number;
  maxRating?: number;
  size?: number;
  showValue?: boolean;
  className?: string;
}

export const Rating: React.FC<RatingProps> = ({
  rating,
  maxRating = 5,
  size = 16,
  showValue = false,
  className = '',
}) => {
  const stars = Array.from({ length: maxRating }, (_, index) => {
    const starValue = index + 1;
    const isFilled = starValue <= Math.round(rating);
    
    return (
      <StarIcon
        key={index}
        size={size}
        filled={isFilled}
        className={isFilled ? 'text-yellow-400' : 'text-gray-300'}
      />
    );
  });
  
  return (
    <div className={`flex items-center gap-1 ${className}`}>
      <div className="flex items-center" role="img" aria-label={`Rating: ${rating} out of ${maxRating}`}>
        {stars}
      </div>
      {showValue && (
        <span className="text-sm text-gray-600 ml-1">
          ({rating.toFixed(1)})
        </span>
      )}
    </div>
  );
};
