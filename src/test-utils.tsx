import {render, type RenderOptions} from '@testing-library/react'
import {type ReactElement} from 'react'
import {MemoryRouter} from 'react-router-dom'
import {AuthProvider} from './services/auth_service'

interface CustomRenderOptions extends Omit<RenderOptions, 'wrapper'> {
  initialEntries?: string[]
}

export function renderWithRouter(
  ui: ReactElement,
  { initialEntries = ['/'], ...renderOptions }: CustomRenderOptions = {}
) {
  return render(
    <MemoryRouter initialEntries={initialEntries}>
      {ui}
    </MemoryRouter>,
    renderOptions
  )
}

export function renderWithAuth(
  ui: ReactElement,
  { initialEntries = ['/'], ...renderOptions }: CustomRenderOptions = {}
) {
  return render(
    <MemoryRouter initialEntries={initialEntries}>
      <AuthProvider>
        {ui}
      </AuthProvider>
    </MemoryRouter>,
    renderOptions
  )
}

export const mockLocalStorage = () => {
  const store: Record<string, string> = {}

  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value
    },
    removeItem: (key: string) => {
      delete store[key]
    },
    clear: () => {
      Object.keys(store).forEach(key => delete store[key])
    },
  }
}

export * from '@testing-library/react'
export { default as userEvent } from '@testing-library/user-event'
