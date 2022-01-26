import type {GetServerSidePropsContext, NextPage} from 'next'
import Image from "next/image";
import TestImage from "@/assets/images/1608636809_1.jpg";
import React from "react";
import axios from "axios";

export interface UsingCachePropInterface {
  user: any
}

const UsingCache = (props: UsingCachePropInterface) => {
  const { user } = props;
  return (
    <div>
      <h1>user detail</h1>
      <Image
        src={TestImage}
        alt={'image'}
        width={300}
        height={150}
      />
      <p>id: { user?.id }</p>
      <p>name: { user?.name }</p>
      <p>email: { user?.email }</p>
      <p>createdAt: { user?.createdAt }</p>
      <p>updatedAt: { user?.updatedAt }</p>
      <div>
      </div>
    </div>
  )
}

export async function getServerSideProps (context: GetServerSidePropsContext) {

  // cache lại giữ liệu trong 5s, nếu hết 5s sẽ call lại getServerSideProps
  context.res.setHeader('Cache-Control', 's-maxage=5')

  // cache lại giữ liệu trong 5s,
  // nếu hết 5s thì lần đầu tiên sẽ nhận được dữ liệu cũ
  // và mới thực hiện call lại getServerSideProps
  context.res.setHeader(
    'Cache-Control',
    's-maxage=5, stale-while-revalidate'
  )

  // cache lại giữ liệu trong 5s,
  // nếu thực hiện ở giây thứ 15 nó sẽ thực hiện call lại getServerSideProps
  context.res.setHeader(
    'Cache-Control',
    's-maxage=5, stale-while-revalidate=5'
  )

  // chờ 3s
  await new Promise((res) => setTimeout(res, 3000))

  const userId = context.query.userId
  if (!userId) return { props: { query: context.query } }

  const token: string = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiZHVvbmciLCJlbWFpbCI6Inh1YW5kdW9uZy5rbWFAZ21haWwuY29tIiwiaWQiOiIxMiIsImlhdCI6MTY0MzEyNDU2MCwiZXhwIjoxNjUxNzY0NTYwfQ.f9tD4_GDDoaItI5XqGCN4PEMCfHo5kzi20xpDwyyX9Q';
  const response: any = await axios.get(`http://localhost:3005/users/${userId}`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })

  return {
    props: {
      query: context.query,
      user: response.data
    }
  }
}


export default UsingCache
