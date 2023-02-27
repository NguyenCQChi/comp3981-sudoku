import { ResultProvider } from "@src/contexts/ResultContext"

function MyApp({ Component, pageProps } : { Component: any, pageProps: any}) {
  return(
  <ResultProvider>
    <Component {...pageProps}></Component>
  </ResultProvider>
  )
}

export default MyApp
