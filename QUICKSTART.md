# 🚀 Quick Start Guide

Get the E-Commerce Product Catalog running in 3 minutes!

## Prerequisites

- Node.js 18+ installed ([Download](https://nodejs.org/))
- npm or yarn package manager

## Installation & Setup

### 1️⃣ Install Dependencies

```bash
cd ecommerce-project
npm install
```

This will install all required packages including React, TypeScript, Tailwind CSS, and testing libraries.

### 2️⃣ Start Development Server

```bash
npm run dev
```

The application will start at `http://localhost:3000` and automatically open in your browser.

### 3️⃣ Run Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage
```

## 🎯 What's Included

### ✅ Complete Features
- Product listing with grid layout
- Search functionality (debounced)
- Category filtering
- Price range filtering
- Multiple sort options
- Pagination
- Product detail pages
- Responsive design
- Full accessibility support

### ✅ Production Ready
- TypeScript for type safety
- Comprehensive test suite (70%+ coverage)
- ESLint configuration
- Clean code architecture
- Detailed documentation

### ✅ Code Quality
- Unit tests for all components
- Integration tests for API
- Hook tests
- Error handling throughout
- Loading states
- Accessibility features (ARIA labels, keyboard navigation)

## 📁 Project Structure

```
ecommerce-project/
├── src/
│   ├── api/              # API integration
│   ├── components/       # Reusable UI components
│   ├── hooks/           # Custom React hooks
│   ├── icons/           # SVG icon components
│   ├── pages/           # Page components
│   ├── types/           # TypeScript definitions
│   ├── App.tsx          # Main app with routing
│   ├── main.tsx         # Entry point
│   └── tailwind.css     # Styles
├── __tests__/           # Test files
├── README.md            # Full documentation
├── DEVELOPMENT.md       # Development guidelines
└── TESTING.md          # Testing guide
```

## 🧪 Testing

The project includes comprehensive tests:

```bash
# Run all tests
npm test

# Watch mode
npm run test:watch

# Coverage report (opens in browser)
npm run test:coverage
```

**Test Coverage:**
- API Layer: ✅ 90%+
- Components: ✅ 80%+
- Hooks: ✅ 85%+
- Overall: ✅ 70%+

## 🎨 Key Features Demo

### Search Products
1. Type in the search bar
2. Results update automatically (debounced)

### Filter by Category
1. Click the category dropdown
2. Select a category
3. Products filter instantly

### Sort Products
1. Use the sort dropdown
2. Choose from:
   - Newest
   - Oldest
   - Price: Low to High
   - Price: High to Low

### View Product Details
1. Click any product card
2. See full details, images, reviews
3. Use back button to return

### Price Range Filter
1. Enter min/max price
2. Products filter as you type

## 🔧 Configuration

### Environment Variables (Optional)

Create `.env` file for custom configuration:

```env
VITE_API_BASE_URL=https://dummyjson.com
```

### Tailwind Customization

Edit `tailwind.config.js` to customize:
- Colors
- Fonts
- Spacing
- Breakpoints

## 📱 Responsive Design

The app is fully responsive:
- Mobile: 320px+
- Tablet: 768px+
- Desktop: 1024px+
- Large Desktop: 1280px+

## ♿ Accessibility

- WCAG 2.1 AA compliant
- Keyboard navigation
- Screen reader support
- ARIA labels throughout
- Focus management

## 🚀 Build for Production

```bash
# Create optimized build
npm run build

# Preview production build
npm run preview
```

Build output goes to `dist/` directory.

## 📚 Documentation

- `README.md` - Complete project documentation
- `DEVELOPMENT.md` - Development guidelines
- `TESTING.md` - Testing guide
- Code comments throughout

## 🐛 Troubleshooting

### Port Already in Use

```bash
# Change port in vite.config.ts or use:
npm run dev -- --port 3001
```

### Tests Failing

```bash
# Clear Jest cache
npm test -- --clearCache

# Update snapshots if needed
npm test -- -u
```

### TypeScript Errors

```bash
# Check TypeScript compilation
npm run build
```

## 📞 Support

Check the documentation files for detailed information:
- Technical details → `README.md`
- Development practices → `DEVELOPMENT.md`
- Testing guide → `TESTING.md`

## ⚡ Next Steps

1. ✅ Run the app: `npm run dev`
2. ✅ Explore features: Search, filter, sort
3. ✅ Run tests: `npm test`
4. ✅ Read documentation
5. ✅ Customize as needed

## 🎉 Success Checklist

After setup, you should have:
- [x] App running on localhost:3000
- [x] All tests passing
- [x] No TypeScript errors
- [x] No ESLint warnings
- [x] Responsive on all devices
- [x] Accessible keyboard navigation

---

**Enjoy building! 🚀**

Need help? Check the full README.md for detailed documentation.
