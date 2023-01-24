import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Header from '../components/Header'
import LikeContextProvider from '../context/LikeContext'
import {useState} from "react"
import Sidemenu from '../components/Sidemenu'

function MyApp({ Component, pageProps }: AppProps) {
  const [menuState, setMenuState] = useState<boolean>(false)
  const menu = {
    close: () => setMenuState(false),
    toggle: () => setMenuState(!menuState)
  }
  
  return (
  <LikeContextProvider>
    <Header menuState={menuState} toggleMenu={menu.toggle}/>
    <Sidemenu closeMenu={menu.close} menuState={menuState}/>
    <Component {...pageProps} />
  </LikeContextProvider>
  )
}

export default MyApp
