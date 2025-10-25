# Testing Documentation for NutriMap

## Overview

This project uses **Vitest** as the testing framework along with **React Testing Library** for component testing. All tests are written in TypeScript to ensure type safety.

## Test Structure

Tests are organized alongside the source files they test:

```
src/
├── services/
│   ├── auth_service.tsx
│   ├── auth_service.test.tsx
│   ├── campaign_service.ts
│   ├── campaign_service.test.ts
│   └── ...
├── components/
│   ├── campaign_card.tsx
│   ├── campaign_card.test.tsx
│   └── ...
├── interfaces/
│   ├── interfaces.ts
│   └── interfaces.test.ts
└── App.test.tsx
```

## Running Tests

### Run all tests
```bash
npm test
```

### Run tests in watch mode
```bash
npm test -- --watch
```

### Run tests with UI
```bash
npm run test:ui
```

### Run tests with coverage
```bash
npm run test:coverage
```

## Test Coverage

The test suite covers:

### Services
- ✅ **auth_service.tsx** - Authentication logic, login, logout, user persistence
- ✅ **campaign_service.ts** - Campaign CRUD operations, filtering, status updates
- ✅ **user_service.ts** - User management, organization handling
- ✅ **volunteer_application_service.ts** - Application management
- ✅ **global_service.ts** - Utility functions (delay, axios instance)

### Components
- ✅ **protected_routes.tsx** - Route protection, role-based access
- ✅ **campaign_card.tsx** - Campaign display, conditional rendering
- ✅ **App.tsx** - Main app structure, routing

### Constants & Interfaces
- ✅ **PATHS.ts** - Route paths, user types, status constants
- ✅ **interfaces.ts** - TypeScript interface validation

### Utilities
- ✅ **test-utils.tsx** - Custom render functions with providers

## Writing Tests

### Example: Testing a Service

```typescript
import { describe, it, expect } from 'vitest'
import { getCampaignByID } from './campaign_service'

describe('CampaignService', () => {
  it('should return campaign when valid ID is provided', async () => {
    const response = await getCampaignByID('1')
    
    expect(response.data).toBeDefined()
    expect(response.data.id).toBe('1')
  })
})
```

### Example: Testing a Component

```typescript
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { renderWithAuth } from '../test-utils'
import MyComponent from './MyComponent'

describe('MyComponent', () => {
  it('should render correctly', () => {
    renderWithAuth(<MyComponent />)
    
    expect(screen.getByText('Expected Text')).toBeInTheDocument()
  })
})
```

## Test Utilities

The project includes custom test utilities in `src/test-utils.tsx`:

- **renderWithRouter** - Renders components with React Router context
- **renderWithAuth** - Renders components with both Router and Auth context
- **mockLocalStorage** - Mock implementation of localStorage for testing

## Mocking

Tests use Vitest's built-in mocking capabilities:

```typescript
import { vi } from 'vitest'
import * as campaignService from '../services/campaign_service'

vi.mock('../services/campaign_service')
vi.mocked(campaignService.getCampaignByID).mockResolvedValue({ data: mockCampaign })
```

## Best Practices

1. **Test Behavior, Not Implementation** - Focus on what the user sees and interacts with
2. **Use Semantic Queries** - Prefer `getByRole`, `getByLabelText` over `getByTestId`
3. **Async Testing** - Use `waitFor` for async operations
4. **Clean Up** - Tests automatically clean up after each test via setup file
5. **Descriptive Test Names** - Use clear, descriptive test names that explain the scenario

## Configuration

### Vitest Configuration (vite.config.ts)

```typescript
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setup-tests.ts',
    css: true,
  },
})
```

### Setup File (src/setup-tests.ts)

- Configures testing environment
- Sets up global test utilities
- Imports jest-dom matchers
- Cleans up after each test

## Continuous Integration

Tests are designed to run in CI/CD pipelines. Ensure all tests pass before merging:

```bash
npm run build && npm test
```

## Future Enhancements

- [ ] E2E tests with Playwright or Cypress
- [ ] Visual regression testing
- [ ] Performance testing
- [ ] Accessibility testing with jest-axe
- [ ] Code coverage thresholds

## Troubleshooting

### Common Issues

**Issue**: Tests fail with "Cannot find module"
- **Solution**: Ensure all dependencies are installed with `npm install`

**Issue**: Async tests timeout
- **Solution**: Increase timeout or check for unresolved promises

**Issue**: Component tests fail to render
- **Solution**: Ensure proper test utilities (renderWithAuth, renderWithRouter) are used

## Resources

- [Vitest Documentation](https://vitest.dev/)
- [React Testing Library](https://testing-library.com/react)
- [Testing Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)
