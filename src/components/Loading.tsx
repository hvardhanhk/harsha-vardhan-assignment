import React from 'react';
import { SpinnerIcon } from '../icons';

interface LoadingProps {
  message?: string;
  fullPage?: boolean;
}

/**
 * Loading spinner component
 */
export const Loading: React.FC<LoadingProps> = ({ 
  message = 'Loading...', 
  fullPage = false 
}) => {
  const containerClass = fullPage 
    ? 'fixed inset-0 flex items-center justify-center bg-white bg-opacity-75 z-50'
    : 'flex items-center justify-center py-12';
  
  return (
    <div className={containerClass} role="status" aria-live="polite">
      <div className="text-center">
        <SpinnerIcon size={40} className="text-primary mx-auto mb-4" />
        <p className="text-gray-600">{message}</p>
      </div>
    </div>
  );
};

interface ErrorMessageProps {
  message: string;
  retry?: () => void;
}

/**
 * Error message component with optional retry button
 */
export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, retry }) => {
  return (
    <div className="text-center py-12" role="alert">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 mb-4">
        <svg
          className="w-8 h-8 text-red-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">
        Something went wrong
      </h3>
      <p className="text-gray-600 mb-4">{message}</p>
      {retry && (
        <button
          onClick={retry}
          className="inline-flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
        >
          Try Again
        </button>
      )}
    </div>
  );
};
