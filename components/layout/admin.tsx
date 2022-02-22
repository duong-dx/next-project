import * as React from "react";
import Link from "next/link";
import {LayoutProps} from "@/models/common";
import {Auth} from "@/components/common";
import {Button} from "@mui/material";
import {useAuth} from "@/hooks/use-auth";
import {useRouter} from "next/router";

export function AdminLayout (props: LayoutProps) {
  const { children } = props;
  const { logout } = useAuth({
    revalidateOnMount: false,
  })

  const router = useRouter()

  const handleLogout = async () => {
    try {
      await logout()

      router.push('/login')
    } catch (event) {
      console.log(event)
    }
  }

  return (
    <Auth>
      <div>
        <h1>Main layout</h1>
        <h1>Size bar</h1>

        <Link href={'/'}>
          <a>Home</a>
        </Link>

        <Button onClick={handleLogout} variant="outlined">logout</Button>

        <div>{children}</div>
      </div>
    </Auth>
  )
}