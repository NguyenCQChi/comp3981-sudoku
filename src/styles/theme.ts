import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontFamily: [
      'sans-serif',
    ].join(',')
  },
  palette: {
    primary: {
      main: '#1B4F79',
      dark: '#143c5c',
      light: '#286aa0',
      contrastText: '#CAF0F8'
    },
    secondary: {
      main: '#849b9f',
      light: '#a7cbd3',
      dark: '#7A7A7A'
    }
  }
})

export default theme;