import React from 'react';
import { ChevronDownIcon, settingsIcon } from '../icons';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: Array<{ value: string; label: string }>;
}

/**
 * Reusable Select/Dropdown component
 */
export const Select: React.FC<SelectProps> = ({
  label,
  error,
  options,
  className = '',
  id,
  ...props
}) => {
  const selectId = id || `select-${Math.random().toString(36).substr(2, 9)}`;
  
  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={selectId}
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          {label}
        </label>
      )}
      <div className="relative">
        {id==="category-filter" && <img src={settingsIcon} alt="Filter" className="absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-400" />}
        <select
          id={selectId}
          className={`
            block w-full rounded-lg border border-gray-300 bg-grey-50
            px-8 py-2 pr-10 text-gray-900
            focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary
            disabled:bg-gray-100 disabled:cursor-not-allowed
            appearance-none cursor-pointer
            ${error ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}
            ${className}
          `}
          {...props}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          <ChevronDownIcon className="text-gray-400" />
        </div>
      </div>
      {error && (
        <p className="mt-1 text-sm text-red-600" role="alert">
          {error}
        </p>
      )}
    </div>
  );
};
