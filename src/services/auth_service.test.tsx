import {renderHook, waitFor} from '@testing-library/react'
import {beforeEach, describe, expect, it} from 'vitest'
import type {LogInFormData} from '../interfaces/interfaces'
import {USER_TYPES} from '../PATHS'
import {AuthProvider, useAuth} from './auth_service'

describe('AuthService', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  describe('useAuth', () => {
    it('should provide initial auth state', () => {
      const { result } = renderHook(() => useAuth(), {
        wrapper: AuthProvider,
      })

      expect(result.current.user).toBeNull()
      expect(result.current.logged_in).toBe(false)
      expect(result.current.user_type).toBeNull()
    })

    it('should log in volunteer user successfully', async () => {
      const { result } = renderHook(() => useAuth(), {
        wrapper: AuthProvider,
      })

      const loginData: LogInFormData = {
        email: 'john.doe@example.com',
        password: 'password123',
      }

      await result.current.log_in(loginData)

      await waitFor(() => {
        expect(result.current.logged_in).toBe(true)
      })

      expect(result.current.user_type).toBe(USER_TYPES.VOLUNTEER)
      expect(result.current.user).toBeDefined()
      expect(result.current.user?.email).toBe('john.doe@example.com')
    })

    it('should log in organization user successfully', async () => {
      const { result } = renderHook(() => useAuth(), {
        wrapper: AuthProvider,
      })

      const loginData: LogInFormData = {
        email: 'contact@foodbank.org',
        password: 'password123',
      }

      await result.current.log_in(loginData)

      await waitFor(() => {
        expect(result.current.logged_in).toBe(true)
      })

      expect(result.current.user_type).toBe(USER_TYPES.ORGANIZATION)
    })

    it('should log in admin user successfully', async () => {
      const { result } = renderHook(() => useAuth(), {
        wrapper: AuthProvider,
      })

      const loginData: LogInFormData = {
        email: 'admin@nutrimap.com',
        password: 'password123',
      }

      await result.current.log_in(loginData)

      await waitFor(() => {
        expect(result.current.logged_in).toBe(true)
      })

      expect(result.current.user_type).toBe(USER_TYPES.ADMIN)
    })

    it('should throw error for incorrect email', async () => {
      const { result } = renderHook(() => useAuth(), {
        wrapper: AuthProvider,
      })

      const loginData: LogInFormData = {
        email: 'wrong@example.com',
        password: 'password123',
      }

      await expect(result.current.log_in(loginData)).rejects.toThrow('Incorrect account details')
    })

    it('should throw error for incorrect password', async () => {
      const { result } = renderHook(() => useAuth(), {
        wrapper: AuthProvider,
      })

      const loginData: LogInFormData = {
        email: 'john.doe@example.com',
        password: 'wrongpassword',
      }

      await expect(result.current.log_in(loginData)).rejects.toThrow('Incorrect account details')
    })

    it('should log out user successfully', async () => {
      const { result } = renderHook(() => useAuth(), {
        wrapper: AuthProvider,
      })

      const loginData: LogInFormData = {
        email: 'john.doe@example.com',
        password: 'password123',
      }

      await result.current.log_in(loginData)

      await waitFor(() => {
        expect(result.current.logged_in).toBe(true)
      })

      result.current.log_out()

      await waitFor(() => {
        expect(result.current.logged_in).toBe(false)
      })

      expect(result.current.user).toBeNull()
      expect(result.current.user_type).toBeNull()
      expect(localStorage.getItem('user')).toBeNull()
      expect(localStorage.getItem('logged_in')).toBeNull()
      expect(localStorage.getItem('user_type')).toBeNull()
    })

    it('should persist user data in localStorage on login', async () => {
      const { result } = renderHook(() => useAuth(), {
        wrapper: AuthProvider,
      })

      const loginData: LogInFormData = {
        email: 'john.doe@example.com',
        password: 'password123',
      }

      await waitFor(async () => {
        await result.current.log_in(loginData)
      })

      expect(localStorage.getItem('logged_in')).toBe('true')
      expect(localStorage.getItem('user_type')).toBeDefined()
      expect(localStorage.getItem('user')).toBeDefined()
    })
  })
})
