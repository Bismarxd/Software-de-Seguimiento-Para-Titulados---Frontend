import "@/styles/globals.css";
import type { AppProps } from "next/app";
import {useEffect, useState} from 'react'
import {Prompt} from 'next/font/google'

const font = Prompt({weight: '400',subsets: ['latin']})

export default function App({ Component, pageProps }: AppProps) {

  const [paginaLista, setPaginaLista] = useState(false)
  useEffect(() => {
    setPaginaLista(true)
  },[])
  return (
    paginaLista ? <main className={font.className}><Component {...pageProps} /></main> : null
  );
}
