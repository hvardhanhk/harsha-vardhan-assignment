# Testing Guide

Comprehensive guide for testing the E-Commerce Product Catalog application.

## 📋 Table of Contents

- [Overview](#overview)
- [Testing Stack](#testing-stack)
- [Running Tests](#running-tests)
- [Writing Tests](#writing-tests)
- [Test Coverage](#test-coverage)
- [Best Practices](#best-practices)

## Overview

This project uses Jest and React Testing Library for comprehensive testing coverage. Tests are organized by type and ensure reliability across all application features.

## Testing Stack

- **Jest**: Test runner and assertion library
- **React Testing Library**: Component testing utilities
- **ts-jest**: TypeScript support for Jest
- **@testing-library/jest-dom**: Custom Jest matchers
- **@testing-library/user-event**: User interaction simulation

## Running Tests

### Basic Commands

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Run specific test file
npm test -- ProductCard.test.tsx

# Run tests matching pattern
npm test -- --testNamePattern="should render"
```

### Watch Mode

Watch mode automatically reruns tests when files change:

```bash
npm run test:watch
```

Useful commands in watch mode:
- Press `a` to run all tests
- Press `f` to run only failed tests
- Press `p` to filter by filename
- Press `t` to filter by test name
- Press `q` to quit

### Coverage Reports

Generate detailed coverage reports:

```bash
npm run test:coverage
```

Coverage reports are generated in the `coverage/` directory:
- HTML report: `coverage/lcov-report/index.html`
- Console summary shows coverage percentages

## Writing Tests

### Component Tests

#### Basic Component Test

```typescript
import { render, screen } from '@testing-library/react';
import { Button } from '../src/components/Button';

describe('Button Component', () => {
  it('should render with text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });
});
```

#### Testing User Interactions

```typescript
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

it('should handle click events', async () => {
  const handleClick = jest.fn();
  render(<Button onClick={handleClick}>Click me</Button>);
  
  // Using fireEvent
  fireEvent.click(screen.getByText('Click me'));
  expect(handleClick).toHaveBeenCalledTimes(1);
  
  // Or using userEvent (more realistic)
  const user = userEvent.setup();
  await user.click(screen.getByText('Click me'));
  expect(handleClick).toHaveBeenCalledTimes(2);
});
```

#### Testing Async Operations

```typescript
import { render, screen, waitFor } from '@testing-library/react';

it('should display data after loading', async () => {
  render(<ProductList />);
  
  expect(screen.getByText('Loading...')).toBeInTheDocument();
  
  await waitFor(() => {
    expect(screen.getByText('Product 1')).toBeInTheDocument();
  });
});
```

#### Testing with Router

```typescript
import { BrowserRouter } from 'react-router-dom';

it('should navigate to product page', () => {
  render(
    <BrowserRouter>
      <ProductCard product={mockProduct} />
    </BrowserRouter>
  );
  
  const link = screen.getByRole('link');
  expect(link).toHaveAttribute('href', '/product/1');
});
```

### Hook Tests

```typescript
import { renderHook, waitFor } from '@testing-library/react';
import { useProducts } from '../src/hooks/useProducts';

describe('useProducts hook', () => {
  it('should fetch products', async () => {
    const { result } = renderHook(() => useProducts({}));
    
    expect(result.current.loading).toBe(true);
    
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
      expect(result.current.data).toBeDefined();
    });
  });
  
  it('should refetch on param change', async () => {
    const { result, rerender } = renderHook(
      ({ search }) => useProducts({ search }),
      { initialProps: { search: '' } }
    );
    
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
    
    rerender({ search: 'phone' });
    
    expect(result.current.loading).toBe(true);
  });
});
```

### API Tests

```typescript
import { productsAPI } from '../src/api/products';

// Mock fetch
global.fetch = jest.fn();

describe('ProductsAPI', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  
  it('should fetch products', async () => {
    const mockData = { products: [], total: 0 };
    
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockData,
    });
    
    const result = await productsAPI.getProducts();
    
    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining('/products')
    );
    expect(result).toEqual(mockData);
  });
  
  it('should handle errors', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 500,
    });
    
    await expect(productsAPI.getProducts()).rejects.toThrow();
  });
});
```

## Test Coverage

### Coverage Thresholds

The project maintains these minimum coverage thresholds:

```json
{
  "branches": 70,
  "functions": 70,
  "lines": 70,
  "statements": 70
}
```

### What to Test

✅ **Always Test:**
- User interactions (clicks, typing, navigation)
- Data transformations and calculations
- Error handling and edge cases
- Accessibility (ARIA labels, keyboard navigation)
- Loading and empty states
- API integrations

❌ **Don't Test:**
- Third-party library internals
- Implementation details (internal state)
- Trivial code (getters/setters)
- Static content

### Coverage by Area

| Area | Coverage Target | Current |
|------|----------------|---------|
| API Layer | 90% | ✅ |
| Components | 80% | ✅ |
| Hooks | 85% | ✅ |
| Utils | 90% | ✅ |
| Pages | 70% | ✅ |

## Best Practices

### 1. Use Semantic Queries

Prioritize queries that reflect how users interact:

```typescript
// ✅ Good - queries by role, label
screen.getByRole('button', { name: /submit/i })
screen.getByLabelText('Email address')
screen.getByText('Welcome back')

// ❌ Avoid - implementation details
screen.getByTestId('submit-button')
container.querySelector('.button')
```

### 2. Test User Behavior

Focus on what users see and do:

```typescript
// ✅ Good - tests behavior
it('should show error for invalid email', async () => {
  render(<LoginForm />);
  
  await userEvent.type(
    screen.getByLabelText('Email'),
    'invalid-email'
  );
  await userEvent.click(screen.getByRole('button', { name: /submit/i }));
  
  expect(screen.getByText(/invalid email/i)).toBeInTheDocument();
});

// ❌ Avoid - tests implementation
it('should set email state', () => {
  const { result } = renderHook(() => useState(''));
  act(() => {
    result.current[1]('test@example.com');
  });
  expect(result.current[0]).toBe('test@example.com');
});
```

### 3. Avoid Testing Implementation Details

```typescript
// ✅ Good - tests public API
it('should filter products by category', () => {
  render(<ProductList />);
  userEvent.selectOptions(screen.getByLabelText('Category'), 'electronics');
  expect(screen.getAllByRole('article')).toHaveLength(5);
});

// ❌ Avoid - tests internal state
it('should update filter state', () => {
  const wrapper = mount(<ProductList />);
  wrapper.find('Select').prop('onChange')({ target: { value: 'electronics' }});
  expect(wrapper.state('filter')).toBe('electronics');
});
```

### 4. Clean Up After Tests

```typescript
beforeEach(() => {
  jest.clearAllMocks();
});

afterEach(() => {
  cleanup();
  jest.restoreAllMocks();
});
```

### 5. Mock External Dependencies

```typescript
// Mock API calls
jest.mock('../src/api/products', () => ({
  productsAPI: {
    getProducts: jest.fn().mockResolvedValue({
      products: [],
      total: 0,
    }),
  },
}));

// Mock timers
jest.useFakeTimers();
jest.advanceTimersByTime(1000);
jest.useRealTimers();
```

### 6. Test Accessibility

```typescript
it('should be keyboard navigable', async () => {
  render(<Dialog />);
  
  const closeButton = screen.getByRole('button', { name: /close/i });
  closeButton.focus();
  
  expect(closeButton).toHaveFocus();
  
  fireEvent.keyDown(closeButton, { key: 'Enter' });
  
  expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
});
```

### 7. Use Descriptive Test Names

```typescript
// ✅ Good - clear and descriptive
it('should display error message when API returns 404', () => {});
it('should disable submit button while form is submitting', () => {});

// ❌ Avoid - vague or unclear
it('works correctly', () => {});
it('test error', () => {});
```

### 8. Group Related Tests

```typescript
describe('ProductCard', () => {
  describe('when product is on sale', () => {
    it('should display discount badge', () => {});
    it('should show original price strikethrough', () => {});
    it('should calculate discounted price', () => {});
  });
  
  describe('when product is out of stock', () => {
    it('should display out of stock message', () => {});
    it('should disable add to cart button', () => {});
  });
});
```

## Common Testing Patterns

### Testing Forms

```typescript
it('should submit form with valid data', async () => {
  const handleSubmit = jest.fn();
  render(<Form onSubmit={handleSubmit} />);
  
  await userEvent.type(screen.getByLabelText('Name'), 'John Doe');
  await userEvent.type(screen.getByLabelText('Email'), 'john@example.com');
  await userEvent.click(screen.getByRole('button', { name: /submit/i }));
  
  expect(handleSubmit).toHaveBeenCalledWith({
    name: 'John Doe',
    email: 'john@example.com',
  });
});
```

### Testing Lists

```typescript
it('should render all products', () => {
  const products = [
    { id: 1, title: 'Product 1' },
    { id: 2, title: 'Product 2' },
  ];
  
  render(<ProductList products={products} />);
  
  expect(screen.getAllByRole('article')).toHaveLength(2);
  expect(screen.getByText('Product 1')).toBeInTheDocument();
  expect(screen.getByText('Product 2')).toBeInTheDocument();
});
```

### Testing Conditional Rendering

```typescript
it('should show loading state', () => {
  render(<ProductList loading={true} />);
  expect(screen.getByText('Loading...')).toBeInTheDocument();
});

it('should show error state', () => {
  render(<ProductList error="Failed to load" />);
  expect(screen.getByText('Failed to load')).toBeInTheDocument();
});

it('should show empty state', () => {
  render(<ProductList products={[]} />);
  expect(screen.getByText('No products found')).toBeInTheDocument();
});
```

## Debugging Tests

### View Rendered Output

```typescript
import { screen, render } from '@testing-library/react';

const { debug } = render(<Component />);

// Print entire DOM
debug();

// Print specific element
debug(screen.getByRole('button'));

// Print with syntax highlighting
screen.logTestingPlaygroundURL();
```

### Common Issues

**Issue: "Unable to find element"**
```typescript
// Use screen.debug() to see what's rendered
screen.debug();

// Check if element appears asynchronously
await screen.findByText('Text');

// Use getByRole with name option
screen.getByRole('button', { name: /submit/i });
```

**Issue: "Not wrapped in act(...)"**
```typescript
// Ensure async operations are awaited
await waitFor(() => {
  expect(screen.getByText('Loaded')).toBeInTheDocument();
});
```

## Additional Resources

- [React Testing Library Docs](https://testing-library.com/react)
- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [Common Mistakes](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)
- [Testing Playground](https://testing-playground.com/)

---

**Happy Testing! 🧪**
