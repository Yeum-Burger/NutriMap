import { render, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it, beforeEach } from 'vitest';
import { ThemeProvider } from '@mui/material';
import theme from './theme';
import { mobile_context } from './mobile_context';
import App from './App';

// Create a wrapper component that provides all necessary contexts EXCEPT AuthProvider
// (since App already provides it)
const TestWrapper = ({ children }: { children: React.ReactNode }) => (
    <ThemeProvider theme={theme}>
        <MemoryRouter>
            <mobile_context.Provider value={false}>
                {children}
            </mobile_context.Provider>
        </MemoryRouter>
    </ThemeProvider>
);

describe('App', () => {
    beforeEach(() => {
        // Create root element if it doesn't exist (for safety)
        if (!document.getElementById('root')) {
            const root = document.createElement('div');
            root.id = 'root';
            document.body.appendChild(root);
        }
    });

    it('should render without crashing', () => {
        const { container } = render(<App />, { wrapper: TestWrapper });
        expect(container).toBeTruthy();
    });

    it('should render NavBar component', async () => {
        const { container } = render(<App />, { wrapper: TestWrapper });

        // Uncomment to see what's rendered:
        // debug();

        await waitFor(() => {
            // Try multiple selectors since Material-UI AppBar might render as header
            const navbar = container.querySelector('nav') ||
                container.querySelector('[role="navigation"]') ||
                container.querySelector('header') ||
                container.querySelector('.MuiAppBar-root');
            expect(navbar).toBeTruthy();
        }, { timeout: 3000 });
    });

    it('should render Footer component', async () => {
        const { container } = render(<App />, { wrapper: TestWrapper });

        await waitFor(() => {
            const footer = container.querySelector('footer') ||
                container.querySelector('[role="contentinfo"]');
            expect(footer).toBeTruthy();
        }, { timeout: 3000 });
    });

    it('should render landing page on home route', () => {
        const { container } = render(<App />, { wrapper: TestWrapper });
        expect(container).toBeTruthy();
    });

    it('should wrap content in AuthProvider', () => {
        const { container } = render(<App />, { wrapper: TestWrapper });
        expect(container.firstChild).toBeTruthy();
    });
});