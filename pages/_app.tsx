import '@styles/style.css';
import { ResultProvider } from "@src/contexts/ResultContext"
import { theme } from '@styles/index';
import { ThemeProvider } from '@mui/material/styles';

function MyApp({ Component, pageProps } : { Component: any, pageProps: any}) {
  return(
    <ThemeProvider theme={theme}>
      <ResultProvider>
        <Component {...pageProps}></Component>
      </ResultProvider>
    </ThemeProvider>
  )
}

export default MyApp
