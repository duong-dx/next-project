import * as React from 'react';
import {useAuth} from "@/hooks/use-auth";
import {useEffect} from "react";
import {useRouter} from "next/router";

export interface IAuthProps {
  children: any,
}

export const Auth: React.FC<IAuthProps> = (props) => {
  const { profile, firstLoading } = useAuth()

  const router = useRouter()

  useEffect(() => {
    if (!firstLoading && !profile) {
      router.push({
        pathname: '/login',
        query: {
          ref: router.pathname,
        }
      })
    }

  }, [profile, router, firstLoading])

  if (!profile) {
    return <div>Loading...</div>
  }

  return <div>{props.children}</div>
}
