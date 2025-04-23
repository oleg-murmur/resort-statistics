import {
    Container,
    CssBaseline,
    ThemeProvider,
    createTheme,
    Theme,
    Box,
    Button,
    ButtonGroup,
} from '@mui/material'
import React from 'react'
import { Provider } from 'react-redux'

import FilterForm from './components/FilterForm'
import ResortChart from './components/ResortChart'
import { LocaleProvider, useLocale } from './contexts/LocaleContext'
import { store } from './store'

const theme: Theme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#90caf9',
            light: '#e3f2fd',
            dark: '#42a5f5',
        },
        secondary: {
            main: '#f48fb1',
            light: '#fce4ec',
            dark: '#ec407a',
        },
        background: {
            default: '#121212',
            paper: '#1e1e1e',
        },
        text: {
            primary: '#ffffff',
            secondary: 'rgba(255, 255, 255, 0.7)',
        },
    },
    typography: {
        fontFamily: '"Pixelify Sans", "Roboto", "Helvetica", "Arial", sans-serif',
        h1: {
            fontSize: '2.5rem',
            fontWeight: 500,
        },
        h2: {
            fontSize: '2rem',
            fontWeight: 500,
        },
        h3: {
            fontSize: '1.75rem',
            fontWeight: 500,
        },
        body1: {
            fontSize: '1rem',
            lineHeight: 1.5,
        },
    },
    shape: {
        borderRadius: 12,
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 20,
                    textTransform: 'none',
                    padding: '8px 24px',
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    backgroundImage: 'none',
                },
            },
        },
        MuiContainer: {
            styleOverrides: {
                root: {
                    paddingTop: '2rem',
                    paddingBottom: '2rem',
                },
            },
        },
        MuiSelect: {
            styleOverrides: {
                root: {
                    borderRadius: 12,
                },
            },
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    '& .MuiOutlinedInput-root': {
                        borderRadius: 12,
                    },
                },
            },
        },
        MuiCheckbox: {
            styleOverrides: {
                root: {
                    borderRadius: 4,
                },
            },
        },
    },
})

const LanguageSelector = () => {
    const { locale, setLocale } = useLocale()

    return (
        <Box sx={{ position: 'fixed', top: 16, right: 16, zIndex: 1000 }}>
            <ButtonGroup variant='contained' size='small'>
                <Button
                    onClick={() => setLocale('en')}
                    color={locale === 'en' ? 'primary' : 'inherit'}
                >
                    EN
                </Button>
                <Button
                    onClick={() => setLocale('ru')}
                    color={locale === 'ru' ? 'primary' : 'inherit'}
                >
                    RU
                </Button>
            </ButtonGroup>
        </Box>
    )
}

const AppContent = () => {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Container maxWidth='lg'>
                <LanguageSelector />
                <FilterForm />
                <ResortChart />
            </Container>
        </ThemeProvider>
    )
}

const App = () => {
    return (
        <Provider store={store}>
            <LocaleProvider>
                <AppContent />
            </LocaleProvider>
        </Provider>
    )
}

export default App
