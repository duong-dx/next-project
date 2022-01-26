import React, {useCallback} from 'react';
import {useRouter} from "next/router";
import Link from "next/link";
import Image from "next/image";
import TestImage from '../../assets/images/1608636809_1.jpg';
import {GetStaticPaths, GetStaticProps, GetStaticPropsContext} from "next";
import axios from "axios";
import ErrorPage from 'next/error'

interface UserDetailProp {
  user: any
}

const UserDetail: React.FC<UserDetailProp>  = (props ) => {
  const { user } = props
  const router = useRouter()
  // const { id } = router.query;
  //
  // const handleClick = useCallback(() => {
  //   return router.push('/login')
  // }, [])
  //
  // const handlePushWithData = useCallback(() => {
  //   return router.push({
  //     pathname: '/',
  //     query: {
  //       userId: id,
  //       ref: 'user',
  //       old: 'users',
  //     }
  //   })
  // }, [id])
  //
  const handleBack = useCallback(() => {
    return router.back()
  }, [router])

  if (router.isFallback) {
    return <div style={{ fontSize: 50, textAlign: 'center' }}>Loading....</div>
  }

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
        <button onClick={handleBack}>Back page</button>
      </div>
    </div>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  console.log('get static paths')
  const token: string = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiZHVvbmciLCJlbWFpbCI6Inh1YW5kdW9uZy5rbWFAZ21haWwuY29tIiwiaWQiOiIxMiIsImlhdCI6MTY0MzEyNDU2MCwiZXhwIjoxNjUxNzY0NTYwfQ.f9tD4_GDDoaItI5XqGCN4PEMCfHo5kzi20xpDwyyX9Q';
  const response: any = await axios.get('http://localhost:3005/users', {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })

  return {
    paths: response.data.map((user: any) => ({
      params: { id: user?.id}
    })),
    // fallback: false // static site generation
    fallback: true
  }
}

export const getStaticProps: GetStaticProps<UserDetailProp> = async (context: GetStaticPropsContext) => {
  const userId = context.params?.id
  console.log('get static props', 'id',  userId)
  if (!userId) return { notFound: true }

  const token: string = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiZHVvbmciLCJlbWFpbCI6Inh1YW5kdW9uZy5rbWFAZ21haWwuY29tIiwiaWQiOiIxMiIsImlhdCI6MTY0MzEyNDU2MCwiZXhwIjoxNjUxNzY0NTYwfQ.f9tD4_GDDoaItI5XqGCN4PEMCfHo5kzi20xpDwyyX9Q';
  const response: any = await axios.get(`http://localhost:3005/users/${userId}`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })

  const dataUserResponse = response.data

  return {
    props: {
      user: {
        id: dataUserResponse?.id,
        name : dataUserResponse?.name,
        email: dataUserResponse?.email,
        createdAt: dataUserResponse?.createdAt,
        updatedAt: dataUserResponse?.updatedAt,
      }
    },
    revalidate: 5, // quá 5s sẽ đi cập nhập lại dữ liệu - Incremental Static Regeneration
  }
}

export default UserDetail