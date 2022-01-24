import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Head from "next/head";

function MyApp({ Component, pageProps }: AppProps) {
  return (
      <div className={'root'}>
        <Head>
          <title>Hello world</title>
          <link rel="icon" href='/favicon.ico'/>
          <link rel="stylesheet" href='/css/index.css'/>
        </Head>
        <Component {...pageProps} />
      </div>
  )
}

export default MyApp
