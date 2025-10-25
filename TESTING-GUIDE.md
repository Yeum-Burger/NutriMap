# Testing Quick Reference Guide

## Common Testing Patterns for NutriMap

### 1. Testing Services

#### Basic Service Test
```typescript
import { describe, it, expect } from 'vitest'
import { myService } from './my_service'

describe('MyService', () => {
  it('should return expected data', async () => {
    const result = await myService()
    expect(result.data).toBeDefined()
  })
})
```

#### Testing with Error Handling
```typescript
it('should throw error when not found', async () => {
  await expect(getById('invalid-id')).rejects.toThrow('Not found')
})
```

### 2. Testing Components

#### Basic Component Test
```typescript
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { renderWithAuth } from '../test-utils'
import MyComponent from './MyComponent'

describe('MyComponent', () => {
  it('should render text', () => {
    renderWithAuth(<MyComponent />)
    expect(screen.getByText('Hello')).toBeInTheDocument()
  })
})
```

#### Testing with User Interactions
```typescript
import userEvent from '@testing-library/user-event'

it('should handle button click', async () => {
  const user = userEvent.setup()
  renderWithAuth(<MyButton />)
  
  const button = screen.getByRole('button', { name: /click me/i })
  await user.click(button)
  
  expect(screen.getByText('Clicked!')).toBeInTheDocument()
})
```

#### Testing Async Loading States
```typescript
import { waitFor } from '@testing-library/react'

it('should display loading then data', async () => {
  renderWithAuth(<AsyncComponent />)
  
  expect(screen.getByText('Loading...')).toBeInTheDocument()
  
  await waitFor(() => {
    expect(screen.getByText('Data loaded')).toBeInTheDocument()
  })
})
```

### 3. Testing with Mocks

#### Mocking a Service
```typescript
import { vi } from 'vitest'
import * as myService from '../services/my_service'

vi.mock('../services/my_service')

it('should use mocked service', async () => {
  vi.mocked(myService.getData).mockResolvedValue({ data: 'mocked' })
  
  const result = await myService.getData()
  expect(result.data).toBe('mocked')
})
```

#### Mocking localStorage
```typescript
beforeEach(() => {
  const localStorageMock = {
    getItem: vi.fn(),
    setItem: vi.fn(),
    clear: vi.fn(),
  }
  global.localStorage = localStorageMock as any
})
```

### 4. Testing Authentication

#### Testing Protected Routes
```typescript
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from '../services/auth_service'

it('should redirect to login when not authenticated', () => {
  render(
    <MemoryRouter initialEntries={['/protected']}>
      <AuthProvider>
        <Routes>
          <Route path="/protected" element={
            <ProtectedRoute><Protected /></ProtectedRoute>
          } />
          <Route path="/login" element={<Login />} />
        </Routes>
      </AuthProvider>
    </MemoryRouter>
  )
  
  expect(screen.getByText('Login Page')).toBeInTheDocument()
})
```

### 5. Common Queries

#### Finding Elements
```typescript
// By text
screen.getByText('Submit')
screen.getByText(/submit/i) // case insensitive

// By role (preferred)
screen.getByRole('button', { name: /submit/i })
screen.getByRole('textbox', { name: /email/i })

// By label
screen.getByLabelText('Email')

// By placeholder
screen.getByPlaceholderText('Enter email')

// By test ID (last resort)
screen.getByTestId('submit-button')
```

#### Query Variants
```typescript
// getBy - throws error if not found
screen.getByText('Hello')

// queryBy - returns null if not found
screen.queryByText('Hello')

// findBy - async, waits for element
await screen.findByText('Hello')
```

### 6. Testing Forms

#### Basic Form Test
```typescript
import userEvent from '@testing-library/user-event'

it('should submit form with data', async () => {
  const user = userEvent.setup()
  const onSubmit = vi.fn()
  
  renderWithAuth(<MyForm onSubmit={onSubmit} />)
  
  await user.type(screen.getByLabelText('Email'), 'test@example.com')
  await user.type(screen.getByLabelText('Password'), 'password123')
  await user.click(screen.getByRole('button', { name: /submit/i }))
  
  expect(onSubmit).toHaveBeenCalledWith({
    email: 'test@example.com',
    password: 'password123'
  })
})
```

### 7. Testing Navigation

```typescript
import { useNavigate } from 'react-router-dom'

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useNavigate: vi.fn(),
  }
})

it('should navigate on click', async () => {
  const navigate = vi.fn()
  vi.mocked(useNavigate).mockReturnValue(navigate)
  
  const user = userEvent.setup()
  renderWithAuth(<MyComponent />)
  
  await user.click(screen.getByRole('button', { name: /view/i }))
  
  expect(navigate).toHaveBeenCalledWith('/details/1')
})
```

### 8. Testing Conditional Rendering

```typescript
it('should hide element when prop is true', () => {
  renderWithAuth(<MyComponent hideButton={true} />)
  
  const button = screen.queryByRole('button')
  expect(button).toHaveStyle({ display: 'none' })
})

it('should not render element when condition is false', () => {
  renderWithAuth(<MyComponent showExtra={false} />)
  
  expect(screen.queryByText('Extra Content')).not.toBeInTheDocument()
})
```

### 9. Testing Lists

```typescript
it('should render list of items', async () => {
  renderWithAuth(<ItemList />)
  
  await waitFor(() => {
    const items = screen.getAllByRole('listitem')
    expect(items).toHaveLength(3)
  })
})
```

### 10. Assertions

#### Common Matchers
```typescript
// Existence
expect(element).toBeInTheDocument()
expect(element).not.toBeInTheDocument()

// Visibility
expect(element).toBeVisible()
expect(element).not.toBeVisible()

// Values
expect(input).toHaveValue('test')
expect(checkbox).toBeChecked()

// Attributes
expect(element).toHaveAttribute('href', '/home')
expect(element).toHaveClass('active')

// Text content
expect(element).toHaveTextContent('Hello')

// Arrays
expect(array).toHaveLength(3)
expect(array).toContain('item')

// Objects
expect(object).toEqual({ key: 'value' })
expect(object).toMatchObject({ key: 'value' })

// Functions
expect(fn).toHaveBeenCalled()
expect(fn).toHaveBeenCalledWith('arg')
expect(fn).toHaveBeenCalledTimes(2)
```

### 11. Setup and Teardown

```typescript
import { beforeEach, afterEach } from 'vitest'

describe('MyTests', () => {
  beforeEach(() => {
    // Runs before each test
    localStorage.clear()
  })

  afterEach(() => {
    // Runs after each test
    vi.clearAllMocks()
  })

  it('test 1', () => {
    // test code
  })
})
```

### 12. Debugging Tests

```typescript
import { screen } from '@testing-library/react'

it('debug test', () => {
  renderWithAuth(<MyComponent />)
  
  // Print entire DOM
  screen.debug()
  
  // Print specific element
  screen.debug(screen.getByRole('button'))
  
  // Log queries
  console.log(screen.getByRole('button'))
})
```

## Best Practices

1. **Use semantic queries**: Prefer `getByRole` > `getByLabelText` > `getByTestId`
2. **Test user behavior**: Focus on what users see and do
3. **Avoid implementation details**: Don't test state or props directly
4. **Use async utilities**: Always use `waitFor` for async operations
5. **Clean up**: Let setup file handle cleanup automatically
6. **Descriptive test names**: Write clear, descriptive test descriptions
7. **One assertion per test**: Keep tests focused and simple
8. **Mock external dependencies**: Mock API calls and services

## Running Specific Tests

```bash
# Run tests in specific file
npm test -- src/services/auth_service.test.tsx

# Run tests matching pattern
npm test -- --grep "login"

# Run in watch mode
npm test -- --watch

# Run with coverage
npm run test:coverage
```

## Troubleshooting

### Test fails with "Cannot find module"
- Ensure dependencies are installed
- Check import paths

### Async test timeout
- Use `waitFor` for async operations
- Increase timeout if needed

### Element not found
- Use `screen.debug()` to see DOM
- Check query selectors
- Ensure element is rendered

### Mock not working
- Verify mock path matches import
- Use `vi.clearAllMocks()` between tests
- Check mock is called before test runs
