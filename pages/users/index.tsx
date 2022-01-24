import React from 'react';
import {useRouter} from "next/router";
import Link from "next/link";

const UserDetail: React.FC<any>  = () => {
  const router = useRouter();

  console.log(router.query);
  return (
    <div>
      <h1>user list</h1>

      <ul>
        <li>
          <Link href={'/users/1'}>
            <div>User 1</div>
          </Link>
        </li>
        <li>
          <Link href={'/users/2'}>
            <div>User 2</div>
          </Link>
        </li>
        <li>
          <Link href={'/users/3'}>
            <div>User 3</div>
          </Link>
        </li>
      </ul>
    </div>
  )
}

export default UserDetail