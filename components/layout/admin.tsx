import * as React from "react";
import Link from "next/link";
import {LayoutProps} from "@/models/common";

export function AdminLayout (props: LayoutProps) {
  const { children } = props;

  return (
    <div>
      <h1>Main layout</h1>
      <h1>Size bar</h1>

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