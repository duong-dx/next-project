import React, {useCallback} from 'react';
import {useRouter} from "next/router";
import Link from "next/link";
import Image from "next/image";
import TestImage from '../../assets/images/1608636809_1.jpg';

const UserDetail: React.FC<any>  = () => {
  const router = useRouter()

  const { id } = router.query;

  const handleClick = useCallback(() => {
    return router.push('/login')
  }, [])

  const handlePushWithData = useCallback(() => {
    return router.push({
      pathname: '/',
      query: {
        userId: id,
        ref: 'user',
        old: 'users',
      }
    })
  }, [id])

  const handleBack = useCallback(() => {
    return router.back()
  }, [])

  return (
    <div>
      <h1>user detail : {id}</h1>
      <Image
        src={TestImage}
        alt={'image'}
        width={300}
        height={150}
      />

      <div><Link href={'/users'}><button>go to user list</button></Link></div>
      <div>
        <button onClick={handleClick}>Go to login</button>
      </div>
      <div>
        <button onClick={handleBack}>Button back</button>
      </div>
      <div>
        <button onClick={handlePushWithData}>go to home</button>
      </div>
    </div>
  )
}

export default UserDetail