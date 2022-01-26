import React, { useEffect } from "react";
import { LayoutProps } from "@/models/index";
import Link from 'next/link'

export function MainLayout (props: LayoutProps) {
  useEffect(() => {
    console.log('component mounting')

    return () => console.log('component Unmounting ...')
  }, [])

  const { children } = props;
  return (
    <div>
      <h1>Main layout</h1>

      <Link href={'/'}>
        <a>Home</a>
      </Link>

      <Link href={'/about'}>
        <a>About</a>
      </Link>

      <div>{children}</div>
    </div>
  )
}