import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#a259ff', // Purple
      contrastText: '#fff',
    },
    secondary: {
      main: '#6c3483', // Darker purple
      contrastText: '#fff',
    },
    background: {
      default: '#18141c', // Black/dark
      paper: '#231933',   // Slightly lighter for dialogs/cards
    },
    text: {
      primary: '#fff',
      secondary: '#b39ddb',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          background: '#231933',
        },
      },
    },
  },
});

export default theme;