import React, {useCallback} from 'react';
import {useRouter} from "next/router";
import Link from "next/link";
import {GetStaticProps, GetStaticPropsContext} from "next";
import axios from "axios";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import {AdminLayout} from "@/components/layout";

export interface UserListProps {
  users: any[]
}
const UserDetail: React.FC<any>  = (props: UserListProps) => {
  const renderUser = useCallback(() => {
    return props.users && props.users.map(user => {
      return (
        <div key={user?.id}>
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Avatar alt={user?.name} src={'@/assets/images/1608636809_1.jpg'} />
            </ListItemAvatar>
            <ListItemText
              primary={user?.name}
              secondary={
                <React.Fragment>
                  <Typography
                    sx={{ display: 'inline' }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    <Link href={`/users/${user?.id}`}>
                      <a>
                        {user?.email}
                      </a>
                    </Link>
                  </Typography>
                </React.Fragment>
              }
            />
          </ListItem>
        </div>
      )
    })
  }, [props.users])
  return (
    <AdminLayout>
      <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
        {renderUser()}
      </List>
    </AdminLayout>
  )
}

export const getStaticProps: GetStaticProps<UserListProps> = async (context: GetStaticPropsContext) => {
  const token: string = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiZHVvbmciLCJlbWFpbCI6Inh1YW5kdW9uZy5rbWFAZ21haWwuY29tIiwiaWQiOiIxMiIsImlhdCI6MTY0MzEyNDU2MCwiZXhwIjoxNjUxNzY0NTYwfQ.f9tD4_GDDoaItI5XqGCN4PEMCfHo5kzi20xpDwyyX9Q';
  const response: any = await axios.get('http://localhost:3005/users', {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })

  return {
    props: {
      users: response.data.map((x: any ) => ({
          id: x.id,
          name : x.name,
          email: x.email
      }))
    }
  }
}

export default UserDetail