import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { ProtectedRoute, RoleBasedRoute, PublicOnlyRoute } from './protected_routes'
import { AuthProvider } from '../services/auth_service'
import { PATHS, USER_TYPES } from '../PATHS'

const MockProtectedComponent = () => <div>Protected Content</div>
const MockLoginComponent = () => <div>Login Page</div>
const MockDashboardComponent = () => <div>Dashboard</div>

describe('ProtectedRoute', () => {
  it('should redirect to login when user is not logged in', () => {
    render(
      <MemoryRouter initialEntries={['/protected']}>
        <AuthProvider>
          <Routes>
            <Route path="/protected" element={
              <ProtectedRoute>
                <MockProtectedComponent />
              </ProtectedRoute>
            } />
            <Route path={PATHS.LOGIN} element={<MockLoginComponent />} />
          </Routes>
        </AuthProvider>
      </MemoryRouter>
    )

    expect(screen.getByText('Login Page')).toBeInTheDocument()
    expect(screen.queryByText('Protected Content')).not.toBeInTheDocument()
  })
})

describe('RoleBasedRoute', () => {
  it('should redirect to login when user is not logged in', () => {
    render(
      <MemoryRouter initialEntries={['/volunteer-only']}>
        <AuthProvider>
          <Routes>
            <Route path="/volunteer-only" element={
              <RoleBasedRoute allowedType={USER_TYPES.VOLUNTEER}>
                <MockProtectedComponent />
              </RoleBasedRoute>
            } />
            <Route path={PATHS.LOGIN} element={<MockLoginComponent />} />
          </Routes>
        </AuthProvider>
      </MemoryRouter>
    )

    expect(screen.getByText('Login Page')).toBeInTheDocument()
  })
})

describe('PublicOnlyRoute', () => {
  it('should render public content when user is not logged in', () => {
    render(
      <MemoryRouter initialEntries={[PATHS.LOGIN]}>
        <AuthProvider>
          <Routes>
            <Route path={PATHS.LOGIN} element={
              <PublicOnlyRoute>
                <MockLoginComponent />
              </PublicOnlyRoute>
            } />
            <Route path={PATHS.DASHBOARD} element={<MockDashboardComponent />} />
          </Routes>
        </AuthProvider>
      </MemoryRouter>
    )

    expect(screen.getByText('Login Page')).toBeInTheDocument()
  })
})
