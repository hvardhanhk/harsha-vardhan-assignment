import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Button } from '../src/components/Button';
import { Input } from '../src/components/Input';
import { Select } from '../src/components/Select';
import { Rating } from '../src/components/Rating';
import { ProductCard } from '../src/components/ProductCard';
import { Pagination } from '../src/components/Pagination';
import type { Product } from '../src/types';

describe('Button Component', () => {
  it('renders button with children', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('handles click events', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    
    fireEvent.click(screen.getByText('Click me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('shows loading state', () => {
    render(<Button loading>Submit</Button>);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('is disabled when loading', () => {
    render(<Button loading>Submit</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('applies different variants', () => {
    const { rerender } = render(<Button variant="primary">Primary</Button>);
    expect(screen.getByRole('button')).toHaveClass('bg-primary');

    rerender(<Button variant="secondary">Secondary</Button>);
    expect(screen.getByRole('button')).toHaveClass('bg-gray-200');
  });
});

describe('Input Component', () => {
  it('renders input with label', () => {
    render(<Input label="Email" />);
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
  });

  it('displays error message', () => {
    render(<Input label="Email" error="Invalid email" />);
    expect(screen.getByText('Invalid email')).toBeInTheDocument();
  });

  it('handles value changes', () => {
    const handleChange = jest.fn();
    render(<Input onChange={handleChange} />);
    
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'test' } });
    
    expect(handleChange).toHaveBeenCalled();
  });

  it('renders with icon', () => {
    const icon = <span data-testid="test-icon">🔍</span>;
    render(<Input icon={icon} />);
    expect(screen.getByTestId('test-icon')).toBeInTheDocument();
  });
});

describe('Select Component', () => {
  const options = [
    { value: '1', label: 'Option 1' },
    { value: '2', label: 'Option 2' },
  ];

  it('renders select with options', () => {
    render(<Select options={options} />);
    expect(screen.getByRole('combobox')).toBeInTheDocument();
    expect(screen.getByText('Option 1')).toBeInTheDocument();
    expect(screen.getByText('Option 2')).toBeInTheDocument();
  });

  it('handles value changes', () => {
    const handleChange = jest.fn();
    render(<Select options={options} onChange={handleChange} />);
    
    const select = screen.getByRole('combobox');
    fireEvent.change(select, { target: { value: '2' } });
    
    expect(handleChange).toHaveBeenCalled();
  });
});

describe('Rating Component', () => {
  it('renders correct number of stars', () => {
    const { container } = render(<Rating rating={4} />);
    const stars = container.querySelectorAll('svg');
    expect(stars).toHaveLength(5);
  });

  it('shows rating value when showValue is true', () => {
    render(<Rating rating={4.5} showValue />);
    expect(screen.getByText('(4.5)')).toBeInTheDocument();
  });

  it('has correct aria-label', () => {
    render(<Rating rating={3} />);
    expect(screen.getByRole('img')).toHaveAttribute(
      'aria-label',
      'Rating: 3 out of 5'
    );
  });
});

describe('ProductCard Component', () => {
  const mockProduct: Product = {
    id: 1,
    title: 'Test Product',
    description: 'Test description',
    price: 99.99,
    discountPercentage: 10,
    rating: 4.5,
    stock: 50,
    brand: 'TestBrand',
    category: 'test',
    thumbnail: 'https://example.com/image.jpg',
    images: ['https://example.com/image.jpg'],
  };

  it('renders product information', () => {
    render(
      <BrowserRouter>
        <ProductCard product={mockProduct} />
      </BrowserRouter>
    );

    expect(screen.getByText('Test Product')).toBeInTheDocument();
    // There are multiple elements with role="img" (product image and rating), so select the correct one
    const images = screen.getAllByRole('img');
    const productImg = images.find(img => img.getAttribute('alt') === 'Test Product');
    expect(productImg).toBeInTheDocument();
  });

  it('shows discounted price', () => {
    render(
      <BrowserRouter>
        <ProductCard product={mockProduct} />
      </BrowserRouter>
    );

    expect(screen.getByText('$89.99')).toBeInTheDocument(); // 10% off 99.99
    expect(screen.getByText('$99.99')).toBeInTheDocument();
  });

  it('shows discount badge', () => {
    render(
      <BrowserRouter>
        <ProductCard product={mockProduct} />
      </BrowserRouter>
    );

    expect(screen.getByText('-10%')).toBeInTheDocument();
  });

  it('shows low stock warning', () => {
    const lowStockProduct = { ...mockProduct, stock: 5 };
    render(
      <BrowserRouter>
        <ProductCard product={lowStockProduct} />
      </BrowserRouter>
    );

    expect(screen.getByText('Only 5 left in stock')).toBeInTheDocument();
  });

  it('links to product detail page', () => {
    render(
      <BrowserRouter>
        <ProductCard product={mockProduct} />
      </BrowserRouter>
    );

    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/product/1');
  });
});

describe('Pagination Component', () => {
  it('renders pagination buttons', () => {
    const handlePageChange = jest.fn();
    render(
      <Pagination
        currentPage={1}
        totalItems={50}
        itemsPerPage={10}
        onPageChange={handlePageChange}
      />
    );

    expect(screen.getByText('Previous')).toBeInTheDocument();
    expect(screen.getByText('Next')).toBeInTheDocument();
  });

  it('handles page changes', () => {
    const handlePageChange = jest.fn();
    render(
      <Pagination
        currentPage={1}
        totalItems={50}
        itemsPerPage={10}
        onPageChange={handlePageChange}
      />
    );

    fireEvent.click(screen.getByLabelText('Go to page 2'));
    expect(handlePageChange).toHaveBeenCalledWith(2);
  });

  it('disables previous button on first page', () => {
    const handlePageChange = jest.fn();
    render(
      <Pagination
        currentPage={1}
        totalItems={50}
        itemsPerPage={10}
        onPageChange={handlePageChange}
      />
    );

    expect(screen.getByText('Previous')).toBeDisabled();
  });

  it('disables next button on last page', () => {
    const handlePageChange = jest.fn();
    render(
      <Pagination
        currentPage={5}
        totalItems={50}
        itemsPerPage={10}
        onPageChange={handlePageChange}
      />
    );

    expect(screen.getByText('Next')).toBeDisabled();
  });

  it('does not render when total pages is 1', () => {
    const handlePageChange = jest.fn();
    const { container } = render(
      <Pagination
        currentPage={1}
        totalItems={5}
        itemsPerPage={10}
        onPageChange={handlePageChange}
      />
    );

    expect(container.firstChild).toBeNull();
  });
});
