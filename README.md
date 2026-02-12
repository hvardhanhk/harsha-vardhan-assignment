# E-Commerce Product Catalog

I deployed the repository and vercel and we can see the demo at https://harsha-vardhan-commbox-assignment.vercel.app/

A modern, responsive e-commerce product catalog built with React, TypeScript, and Tailwind CSS. Features product browsing, searching, filtering, and detailed product views.

## 🚀 Features

- **Product Listing**: Browse products in a responsive grid layout
- **Search Functionality**: Real-time search with debouncing
- **Advanced Filtering**:
  - Category-based filtering
  - Price range filtering
  - Multiple sort options (newest, oldest, price)
- **Product Details**: Comprehensive product information pages with:
  - Image gallery with thumbnails
  - Customer reviews and ratings
  - Stock availability
  - Product specifications
- **Pagination**: Navigate through product pages efficiently
- **Responsive Design**: Optimized for mobile, tablet, and desktop
- **Accessibility**: WCAG-compliant with proper ARIA labels
- **Performance**: Optimized API calls with debouncing and caching

## 🛠️ Tech Stack

- **React 18.2**: Modern React with hooks
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first styling
- **React Router**: Client-side routing
- **Vite**: Fast build tool and dev server
- **Jest**: Unit and integration testing
- **React Testing Library**: Component testing

## 📁 Project Structure

```
ecommerce-project/
├── src/
│   ├── api/              # API integration layer
│   │   └── products.ts   # Products API service
│   ├── components/       # Reusable UI components
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Select.tsx
│   │   ├── Rating.tsx
│   │   ├── ProductCard.tsx
│   │   ├── Pagination.tsx
│   │   └── Loading.tsx
│   ├── hooks/           # Custom React hooks
│   │   ├── useProducts.ts
│   │   └── useDebounce.ts
│   ├── icons/           # SVG icon components
│   │   └── index.tsx
│   ├── pages/           # Page components
│   │   ├── ProductsPage.tsx
│   │   └── ProductDetailPage.tsx
│   ├── types/           # TypeScript type definitions
│   │   └── index.ts
│   ├── App.tsx          # Main app component with routing
│   ├── main.tsx         # Application entry point
│   └── tailwind.css     # Tailwind styles
├── __tests__/           # Test files
│   ├── api.test.ts
│   ├── components.test.tsx
│   └── hooks.test.ts
└── package.json
```

## 🚦 Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ecommerce-project
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm test` - Run all tests
- `npm run test:watch` - Run tests in watch mode
- `npm run test:coverage` - Generate test coverage report
- `npm run lint` - Lint code with ESLint

## 🧪 Testing

The project includes comprehensive test coverage:

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage
```

### Test Coverage

- **API Layer**: Tests for all API methods, error handling, filtering, and sorting
- **Components**: Tests for UI components, interactions, and accessibility
- **Hooks**: Tests for custom hooks, state management, and side effects

### Coverage Thresholds

The project maintains minimum coverage thresholds:
- Branches: 70%
- Functions: 70%
- Lines: 70%
- Statements: 70%

## 🎨 Component Library

### Core Components

#### Button
Versatile button component with multiple variants and states.

```tsx
<Button variant="primary" size="lg" onClick={handleClick}>
  Click Me
</Button>
```

#### Input
Accessible input component with label, error state, and icon support.

```tsx
<Input 
  label="Email" 
  error="Invalid email"
  icon={<SearchIcon />}
/>
```

#### Select
Dropdown component with custom styling.

```tsx
<Select 
  options={options}
  value={selected}
  onChange={handleChange}
/>
```

#### Rating
Star rating display component.

```tsx
<Rating rating={4.5} showValue />
```

#### ProductCard
Product display card for grid layout.

```tsx
<ProductCard product={product} />
```

#### Pagination
Navigation component for paginated content.

```tsx
<Pagination 
  currentPage={1}
  totalItems={100}
  itemsPerPage={12}
  onPageChange={handlePageChange}
/>
```

## 🔧 API Integration

The project uses the [DummyJSON API](https://dummyjson.com) for product data.

### API Methods

```typescript
// Fetch all products with filters
await productsAPI.getProducts({
  search: 'phone',
  category: 'smartphones',
  sortBy: 'price-low-high',
  minPrice: 100,
  maxPrice: 1000,
  skip: 0,
  limit: 30
});

// Fetch single product
await productsAPI.getProductById(1);

// Fetch all categories
await productsAPI.getCategories();
```

## 🎯 Custom Hooks

### useProducts
Fetches and manages product list with filters.

```typescript
const { data, loading, error } = useProducts({
  search: 'laptop',
  category: 'electronics',
  sortBy: 'price-low-high'
});
```

### useProduct
Fetches single product details.

```typescript
const { product, loading, error } = useProduct(productId);
```

### useCategories
Fetches available product categories.

```typescript
const { categories, loading, error } = useCategories();
```

### useDebounce
Debounces rapidly changing values.

```typescript
const debouncedSearch = useDebounce(searchQuery, 500);
```

## ♿ Accessibility

The application follows WCAG 2.1 guidelines:

- Semantic HTML structure
- ARIA labels and roles
- Keyboard navigation support
- Focus management
- Screen reader compatibility
- Sufficient color contrast
- Responsive text sizing

## 🎨 Styling

The project uses Tailwind CSS with a custom configuration:

### Color Palette
- Primary: Blue (`#2563eb`)
- Gray scale: 50-900
- Additional states: Success, warning, error

### Typography
- Font family: Inter (system fallback)
- Responsive font sizes
- Line height optimization

### Responsive Breakpoints
- sm: 640px
- md: 768px
- lg: 1024px
- xl: 1280px

## 🚀 Performance Optimizations

- **Debounced Search**: Reduces API calls during typing
- **Lazy Loading**: Images load as needed
- **Code Splitting**: Route-based code splitting
- **Optimized Images**: Proper image sizing and formats
- **Memoization**: Prevents unnecessary re-renders

## 🔒 Error Handling

Robust error handling throughout the application:

- API error handling with user-friendly messages
- Network error detection
- Loading states for all async operations
- Retry functionality for failed requests
- Form validation

## 📱 Responsive Design

The application is fully responsive:

- Mobile-first approach
- Flexible grid layouts
- Touch-friendly interactions
- Optimized for all screen sizes

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📄 License

This project is part of a frontend development assessment.

## 🤝 Contributing

This is an assessment project. For production use, please follow standard contribution guidelines.

## 📞 Support

For questions or issues, please refer to the project documentation or contact the development team.

---

**Built with ❤️ using React, TypeScript, and Tailwind CSS**
