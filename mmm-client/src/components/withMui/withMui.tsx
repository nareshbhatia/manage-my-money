import React from 'react';
import red from '@material-ui/core/colors/red';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

// A custom theme for this app
const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#1277eb',
            dark: '#0366d6'
        },
        secondary: {
            main: '#28a745'
        },
        error: {
            main: red.A400
        }
    }
});

export function withMui<P>(Component: React.ComponentType<P>) {
    function WithMui(props: P) {
        return (
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Component {...props} />
            </ThemeProvider>
        );
    }

    return WithMui;
}
