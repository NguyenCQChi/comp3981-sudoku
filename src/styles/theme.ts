import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontFamily: [
      'sans-serif',
    ].join(',')
  },
  palette: {
    primary: {
      main: '#1B4F79', //button
      dark: '#143c5c', //text
      light: '#286aa0', //button hover
      contrastText: '#CAF0F8'
    },
    secondary: {
      main: '#849b9f',
      light: '#a7cbd3', //gradient background
      dark: '#7A7A7A' //button disabled
    }
  }
})

export default theme;