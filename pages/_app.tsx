import '../styles/globals.css'
import {EmptyLayout} from "@/components/layout";
import {AppPropsWithLayout} from "@/models/common";
import axiosClient from "@/api-client/axios-client";
import { SWRConfig } from "swr";

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const Layout = Component.Layout ?? EmptyLayout
  return (
    <SWRConfig value={{
      fetcher: (url) => axiosClient.get(url),
      shouldRetryOnError: false
    }}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SWRConfig>
  )
}

export default MyApp
