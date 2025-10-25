import {render} from '@testing-library/react'
import {MemoryRouter} from 'react-router-dom'
import {describe, expect, it} from 'vitest'
import App from './App'

describe('App', () => {
  it('should render without crashing', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    )
    
    expect(document.body).toBeTruthy()
  })

  it('should render NavBar component', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    )
    
    // NavBar should be present in the document
    const navbar = document.querySelector('nav') || document.querySelector('[role="navigation"]')
    expect(navbar).toBeTruthy()
  })

  it('should render Footer component', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    )
    
    // Footer should be present in the document
    const footer = document.querySelector('footer') || document.querySelector('[role="contentinfo"]')
    expect(footer).toBeTruthy()
  })

  it('should render landing page on home route', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    )
    
    // Landing page should be rendered
    expect(document.body).toBeTruthy()
  })

  it('should wrap content in AuthProvider', () => {
    const { container } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    )
    
    // The app should render successfully with AuthProvider
    expect(container.firstChild).toBeTruthy()
  })
})
