import { useMemo } from "react";
import App from "./App";
import { ThemeProvider, CssBaseline, useMediaQuery } from "@mui/material";
import theme from "./theme";
import { BrowserRouter } from "react-router-dom";
import { mobile_context } from "./mobile_context";

const Root = () => {
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));
    const value = useMemo(() => isMobile, [isMobile]);

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <BrowserRouter>
                <mobile_context.Provider value={value}>
                    <App />
                </mobile_context.Provider>
            </BrowserRouter>
        </ThemeProvider>
    );
};

export default Root;