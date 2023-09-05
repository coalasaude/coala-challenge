import { Roboto } from 'next/font/google';
import { createTheme } from '@mui/material/styles';

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
});

const theme = createTheme({
  typography: {
    fontFamily: roboto.style.fontFamily,

    button: {
      textTransform: 'none',
    },
  },
  palette: {
    background: {
      default: '#f5f5f5',
    },

    secondary: {
      main: '#FFFFFF',
    },

    primary: {
      main: '#6FA9E6',
    },
  },
});

export default theme;
