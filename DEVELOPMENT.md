# Development Guidelines

This document outlines the development practices and guidelines for the E-Commerce Product Catalog project.

## 🏗️ Architecture

### Component Structure

Components follow a consistent structure:

```typescript
import React from 'react';

interface ComponentNameProps {
  // Props definition
}

/**
 * Component description with JSDoc
 */
export const ComponentName: React.FC<ComponentNameProps> = ({ props }) => {
  // Component logic
  return (
    // JSX
  );
};
```

### File Organization

- **One component per file**: Each component gets its own file
- **Index exports**: Use index files for cleaner imports
- **Co-location**: Keep related files close (tests, styles, etc.)

## 🎨 Styling Guidelines

### Tailwind CSS Best Practices

1. **Use utility classes**: Prefer Tailwind utilities over custom CSS
2. **Consistent spacing**: Use Tailwind's spacing scale (p-4, m-2, etc.)
3. **Responsive design**: Mobile-first with responsive modifiers (sm:, md:, lg:)
4. **Custom classes**: Only when absolutely necessary

Example:
```tsx
<div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
  {/* Content */}
</div>
```

### Component Variants

Create variants using props:

```tsx
const variantClasses = {
  primary: 'bg-blue-600 text-white',
  secondary: 'bg-gray-200 text-gray-900',
};

<button className={variantClasses[variant]}>
  {children}
</button>
```

## 🔄 State Management

### Local State

Use `useState` for component-specific state:

```typescript
const [isOpen, setIsOpen] = useState(false);
```

### Effects

Use `useEffect` for side effects with proper cleanup:

```typescript
useEffect(() => {
  let isMounted = true;

  async function fetchData() {
    const result = await api.getData();
    if (isMounted) {
      setData(result);
    }
  }

  fetchData();

  return () => {
    isMounted = false;
  };
}, [dependencies]);
```

### Custom Hooks

Extract reusable logic into custom hooks:

```typescript
export function useCustomHook(param: string) {
  const [state, setState] = useState();

  useEffect(() => {
    // Logic
  }, [param]);

  return { state };
}
```

## 🧪 Testing Guidelines

### Unit Tests

Test individual components and functions:

```typescript
describe('ComponentName', () => {
  it('should render correctly', () => {
    render(<ComponentName />);
    expect(screen.getByText('Expected Text')).toBeInTheDocument();
  });

  it('should handle user interactions', () => {
    const handleClick = jest.fn();
    render(<ComponentName onClick={handleClick} />);
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalled();
  });
});
```

### Integration Tests

Test component interactions:

```typescript
it('should update state when input changes', async () => {
  render(<Form />);
  const input = screen.getByLabelText('Email');
  
  fireEvent.change(input, { target: { value: 'test@example.com' } });
  
  await waitFor(() => {
    expect(screen.getByText('Valid email')).toBeInTheDocument();
  });
});
```

### Testing Best Practices

1. **Test behavior, not implementation**: Focus on what users see and do
2. **Use semantic queries**: Prefer `getByRole`, `getByLabelText`
3. **Avoid snapshot tests**: Use them sparingly
4. **Mock external dependencies**: Mock API calls and third-party libraries
5. **Test edge cases**: Empty states, errors, loading states

## 📝 Code Style

### TypeScript

1. **Type everything**: Avoid `any` types
2. **Use interfaces for objects**: Define clear contracts
3. **Export types**: Make types reusable

```typescript
interface User {
  id: number;
  name: string;
  email: string;
}

function getUser(id: number): Promise<User> {
  // Implementation
}
```

### Naming Conventions

- **Components**: PascalCase (`ProductCard`, `SearchBar`)
- **Files**: Match component name (`ProductCard.tsx`)
- **Functions**: camelCase (`handleClick`, `fetchProducts`)
- **Constants**: UPPER_SNAKE_CASE (`API_BASE_URL`, `MAX_ITEMS`)
- **CSS Classes**: kebab-case (Tailwind handles this)

### Comments

Use JSDoc for public APIs:

```typescript
/**
 * Fetches products from the API with optional filters
 * @param params - Search and filter parameters
 * @returns Promise resolving to products response
 */
async function getProducts(params: SearchParams): Promise<ProductsResponse> {
  // Implementation
}
```

## ♿ Accessibility

### ARIA Labels

Always provide descriptive labels:

```tsx
<button aria-label="Close dialog">
  <CloseIcon />
</button>

<img src={url} alt="Product thumbnail showing..." />
```

### Keyboard Navigation

Ensure all interactive elements are keyboard accessible:

```tsx
<div
  role="button"
  tabIndex={0}
  onKeyDown={handleKeyDown}
  onClick={handleClick}
>
  Interactive element
</div>
```

### Focus Management

Manage focus for modals and dynamic content:

```typescript
useEffect(() => {
  if (isOpen) {
    const firstElement = dialogRef.current?.querySelector('button');
    firstElement?.focus();
  }
}, [isOpen]);
```

## 🚀 Performance

### Optimization Techniques

1. **Debounce expensive operations**:
```typescript
const debouncedSearch = useDebounce(searchQuery, 300);
```

2. **Memoize expensive calculations**:
```typescript
const sortedData = useMemo(() => 
  data.sort(sortFunction), 
  [data, sortFunction]
);
```

3. **Use lazy loading for images**:
```tsx
<img loading="lazy" src={url} alt={alt} />
```

4. **Code splitting with React.lazy**:
```typescript
const HeavyComponent = React.lazy(() => import('./HeavyComponent'));
```

## 🔒 Error Handling

### API Errors

Always handle API errors gracefully:

```typescript
try {
  const data = await api.fetchData();
  setData(data);
} catch (error) {
  setError(error instanceof Error ? error.message : 'An error occurred');
}
```

### Error Boundaries

Use error boundaries for component errors:

```tsx
<ErrorBoundary fallback={<ErrorMessage />}>
  <App />
</ErrorBoundary>
```

## 📦 API Integration

### API Service Pattern

Centralize API calls in service files:

```typescript
class ProductsAPI {
  async getProducts(params: Params) {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  }
}

export const productsAPI = new ProductsAPI();
```

### Custom Hooks for Data

Wrap API calls in custom hooks:

```typescript
export function useProducts(params: Params) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch logic
  }, [params]);

  return { data, loading, error };
}
```

## 🔍 Code Review Checklist

Before submitting code:

- [ ] All tests pass
- [ ] TypeScript compiles without errors
- [ ] ESLint shows no warnings
- [ ] Components have proper prop types
- [ ] Accessibility requirements met
- [ ] Error handling implemented
- [ ] Loading states handled
- [ ] Responsive design verified
- [ ] Comments added for complex logic
- [ ] No console.logs in production code

## 📚 Resources

- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [WCAG Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)

## 🤝 Git Workflow

### Commit Messages

Follow conventional commits:

```
feat: add product search functionality
fix: resolve pagination bug on mobile
docs: update README with new features
test: add tests for ProductCard component
refactor: simplify filter logic
style: format code with Prettier
```

### Branch Naming

- `feature/product-search`
- `fix/pagination-bug`
- `refactor/api-service`
- `test/add-component-tests`

---

**Happy Coding! 🎉**
