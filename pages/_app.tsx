import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Header from '../components/Header'
import useLikes from '../hooks/useLikes'
import LikeContextProvider from '../context/LikeContext'

function MyApp({ Component, pageProps }: AppProps) {
  
  return (
  <LikeContextProvider>
    <Header />
    <Component {...pageProps} />
  </LikeContextProvider>
  )
}

export default MyApp
