import { StrictMode, createContext, useMemo } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { ThemeProvider, CssBaseline, useMediaQuery } from "@mui/material";
import theme from "./theme";
import { BrowserRouter } from "react-router-dom";

export const mobile_context = createContext<boolean>(false)

const Root = () => {
    const isMobile = useMediaQuery(theme.breakpoints.down("md"))
    const value = useMemo(() => isMobile, [isMobile])

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <BrowserRouter>
                <mobile_context.Provider value={value}>
                    <App />
                </mobile_context.Provider>
            </BrowserRouter>
        </ThemeProvider>
    )
}

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <Root />
    </StrictMode>
)
