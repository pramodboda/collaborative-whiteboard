// theme.ts
import { createTheme } from '@mui/material/styles';
import { deepPurple } from '@mui/material/colors';

const theme = createTheme({
  palette: {
    // primary: {
    //   main: '#1976d2',
    // },
    // success: {
    //   main: '#2e7d32',
    // },

    // Custom Colors
    pramodMUI: {
      main: deepPurple[600],
      contrastText: '#fff',
    },
  },
});

export default theme;