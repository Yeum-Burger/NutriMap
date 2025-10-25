import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    // Palette configuration
    palette: {
        primary: {
            main: "#008000", // your green color
            contrastText: "#ffffff", // ensures readable text on green
        },
    },

    typography: {
        // Base font configuration
        fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",

        // Base font size (default is 14px in MUI)
        fontSize: 16,

        // H1 - Main page title
        h1: {
            fontSize: '2.5rem', // 40px
            lineHeight: 1.2,
            letterSpacing: '-0.01562em',
            '@media (min-width:600px)': {
                fontSize: '3rem', // 48px
            },
            '@media (min-width:900px)': {
                fontSize: '3.5rem', // 56px
            },
            '@media (min-width:1200px)': {
                fontSize: '4rem', // 64px
            },
        },

        // H2 - Section titles
        h2: {
            fontSize: '2rem', // 32px
            lineHeight: 1.3,
            letterSpacing: '-0.00833em',
            '@media (min-width:600px)': {
                fontSize: '2.5rem', // 40px
            },
            '@media (min-width:900px)': {
                fontSize: '3rem', // 48px
            },
            '@media (min-width:1200px)': {
                fontSize: '3.5rem', // 56px
            },
        },

        // H3 - Subsection titles
        h3: {
            fontSize: '1.75rem', // 28px
            lineHeight: 1.4,
            letterSpacing: '0em',
            '@media (min-width:600px)': {
                fontSize: '2rem', // 32px
            },
            '@media (min-width:900px)': {
                fontSize: '2.25rem', // 36px
            },
            '@media (min-width:1200px)': {
                fontSize: '2.5rem', // 40px
            },
        },

        // H4 - Card titles, minor sections
        h4: {
            fontSize: '1.5rem', // 24px
            lineHeight: 1.4,
            letterSpacing: '0.00735em',
            '@media (min-width:600px)': {
                fontSize: '1.75rem', // 28px
            },
            '@media (min-width:900px)': {
                fontSize: '2rem', // 32px
            },
        },

        // H5 - Component titles
        h5: {
            fontSize: '1.25rem', // 20px
            lineHeight: 1.5,
            letterSpacing: '0em',
            '@media (min-width:600px)': {
                fontSize: '1.375rem', // 22px
            },
            '@media (min-width:900px)': {
                fontSize: '1.5rem', // 24px
            },
        },

        // H6 - Small headings
        h6: {
            fontSize: '1.125rem', // 18px
            lineHeight: 1.5,
            letterSpacing: '0.0075em',
            '@media (min-width:600px)': {
                fontSize: '1.25rem', // 20px
            },
        },

        // Subtitle1 - Larger subtitles
        subtitle1: {
            fontSize: '1rem', // 16px
            lineHeight: 1.75,
            letterSpacing: '0.00938em',
            '@media (min-width:600px)': {
                fontSize: '1.125rem', // 18px
            },
        },

        // Subtitle2 - Smaller subtitles
        subtitle2: {
            fontSize: '0.875rem', // 14px
            lineHeight: 1.57,
            letterSpacing: '0.00714em',
            '@media (min-width:600px)': {
                fontSize: '1rem', // 16px
            },
        },

        // Body1 - Main body text
        body1: {
            fontSize: '1rem', // 16px
            lineHeight: 1.6,
            letterSpacing: '0.00938em',
            '@media (min-width:600px)': {
                fontSize: '1.0625rem', // 17px
            },
            '@media (min-width:900px)': {
                fontSize: '1.125rem', // 18px
            },
        },

        // Body2 - Secondary body text
        body2: {
            fontSize: '0.875rem', // 14px
            lineHeight: 1.6,
            letterSpacing: '0.01071em',
            '@media (min-width:600px)': {
                fontSize: '0.9375rem', // 15px
            },
            '@media (min-width:900px)': {
                fontSize: '1rem', // 16px
            },
        },

        // Button text
        button: {
            fontSize: '0.875rem', // 14px
            lineHeight: 1.75,
            letterSpacing: '0.02857em',
            textTransform: 'uppercase',
            '@media (min-width:600px)': {
                fontSize: '0.9375rem', // 15px
            },
        },

        // Caption - Small text
        caption: {
            fontSize: '0.75rem', // 12px
            lineHeight: 1.66,
            letterSpacing: '0.03333em',
            '@media (min-width:600px)': {
                fontSize: '0.8125rem', // 13px
            },
        },

        // Overline - Labels
        overline: {
            fontSize: '0.75rem', // 12px
            lineHeight: 2.66,
            letterSpacing: '0.08333em',
            textTransform: 'uppercase',
            '@media (min-width:600px)': {
                fontSize: '0.8125rem', // 13px
            },
        },
    },

    // Breakpoints (MUI default)
    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            md: 900,
            lg: 1200,
            xl: 1536,
        },
    },

    // Component style overrides
    components: {
        MuiButton: {
            defaultProps: {
                variant: 'contained'
            },
            styleOverrides: {
                root: ({ theme, ownerState }) => ({
                    ...(ownerState.color !== 'error' && {
                        backgroundColor: theme.palette.primary.main,
                        color: theme.palette.primary.contrastText,
                        border: '1px solid',
                        borderColor: theme.palette.primary.main,
                        transition: "all 0.3s ease-in-out",
                        '&:hover': {
                            backgroundColor: theme.palette.primary.contrastText,
                            color: theme.palette.primary.main,
                            borderColor: theme.palette.primary.main,
                        }
                    }),
                    ...(ownerState.color === 'error' && ownerState.variant === 'outlined' && {
                        border: '1px solid',
                        borderColor: '#d32f2f',
                        color: '#d32f2f',
                        backgroundColor: 'transparent',
                        transition: "all 0.3s ease-in-out",
                        '&:hover': {
                            backgroundColor: '#d32f2f',
                            color: '#ffffff',
                            borderColor: '#d32f2f',
                        }
                    }),
                })
            }
        },
        MuiIconButton: {
            styleOverrides: {
                root: ({ theme }) => ({
                    backgroundColor: theme.palette.primary.main,
                    color: theme.palette.primary.contrastText,
                    border: '1px solid',
                    borderColor: theme.palette.primary.main,
                    transition: "all 0.3s ease-in-out",
                    '&:hover': {
                        backgroundColor: theme.palette.primary.contrastText,
                        color: theme.palette.primary.main,
                        borderColor: theme.palette.primary.main,
                    }
                })
            }
        },
        MuiTypography: {
            styleOverrides: {
                root: {
                    display: "flex",
                    alignItems: "center",
                    gap: 5
                }
            }
        },
        MuiTextField: {
            defaultProps: {
                variant: 'outlined',
                fullWidth: true,
                required: true,
            }
        },
        MuiCard: {
            defaultProps: {
                elevation: 4,
            },
            styleOverrides: {
                root: {
                    borderRadius: 10,
                }
            }
        }
    }
});
export default theme