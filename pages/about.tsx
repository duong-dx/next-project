import type { NextPage } from 'next'
import {useRouter} from "next/router";
import dynamic from "next/dynamic";
import {useCallback, useEffect, useState} from "react";
import axios from "axios";
import {MainLayout} from "@/components/layout";
import {NextPageWithLayout} from "@/models/common";

export interface AboutPropInterface {}

const Header = dynamic(() => import('@/components/header'), { ssr: false })
const About: NextPageWithLayout = (props: AboutPropInterface) => {
  const [messages, setMessages] = useState()
  const [page, setPage] = useState<number>(1)
  const router = useRouter();

  useEffect(() => {
    if (!page) return
    getDataMessage(2, page)

  }, [page]);

  const getDataMessage = useCallback(async (conversationId: number, page: number) => {
    const token: string = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiZHVvbmciLCJlbWFpbCI6Inh1YW5kdW9uZy5rbWFAZ21haWwuY29tIiwiaWQiOiIxMiIsImlhdCI6MTY0MzEyNDU2MCwiZXhwIjoxNjUxNzY0NTYwfQ.f9tD4_GDDoaItI5XqGCN4PEMCfHo5kzi20xpDwyyX9Q';
    const response: any = await axios.get('http://localhost:3005/messages', {
      params: {
        conversation_id: conversationId,
        page: page,
      },
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })

    setMessages(response.data)
  }, [page])

  const handlePushParamToUrl = () => {
    const newPage = (Number(router.query?.page || 1)) + 1
    setPage(newPage)

    return router.push({
      pathname: '/about',
      query: {
        page: newPage,
      }
    }, undefined, { shallow: true } ) // sử dụng để không thực hiện trên server
    // chỉ sử dụng trên client
  }

  return (
    <div>
      About page nhesssss2222
      <Header />

      <button onClick={handlePushParamToUrl}> next page </button>
    </div>
  )
}

export async function getStaticProps () {
  console.log('get static props')

  return {
    props: {}
  }
}
//
// export async function getServerSideProps() {
//   // if use getServerSideProps and have param, component rendering 1 time
//   // file này trong .next/server/pages sẽ là 1 file js và nó sẽ client sẽ phải download file js này về để thực thi
//   return {
//     props: {}
//   }
// }

About.Layout = MainLayout

export default About
