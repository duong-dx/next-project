import React from 'react';
import useSWR from 'swr'

export interface IUserDetail {
  userId: string | number
}

export const UserDetail: React.FC<IUserDetail>  = (props) => {
  const {
    data,
    error,
    mutate,
    isValidating
  } = useSWR(`users/${props.userId}`, {
    dedupingInterval: 2000, // chỉ call api sau mỗi 2s - chỉ trong trường hợp gọi api cùng key
  })

  const handleClick = () => {
    mutate({
      data: { // set data = value nayf
        name: 'DuongDx',
        email: 'xuanduong.kma@gmail.com',
      }},
      true, // option true: sau khi click thự hiện call api và update lại data
//      false // thực hiện call api
    );
  }
  return (
    <div>
      <h1>User detail</h1>
      <h2>{data?.data?.name}</h2>
      <h2>{data?.data?.email}</h2>

    <button onClick={handleClick}>mutate</button>
    </div>
  )
}

