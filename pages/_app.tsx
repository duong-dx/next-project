import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Head from "next/head";
import {EmptyLayout} from "@/components/layout";
import {AppPropsWithLayout} from "@/models/common";

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const Layout = Component.Layout ?? EmptyLayout
  return (
      <Layout>
        <Head>
          <title>Hello world</title>
          <link rel="icon" href='/favicon.ico'/>
          <link rel="stylesheet" href='/css/index.css'/>
        </Head>
        <Component {...pageProps} />
      </Layout>
  )
}

export default MyApp
