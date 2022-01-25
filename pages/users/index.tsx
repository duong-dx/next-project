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
import ImageIcon from '@mui/icons-material/Image';

export interface UserListProps {
  users: any[]
}
const UserDetail: React.FC<any>  = (props: UserListProps) => {
  const renderUser = useCallback(() => {
    return props.users && props.users.map(user => {
      return (
        <div key={user?.id}>
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <ImageIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={user?.name} secondary={user?.email} />
          </ListItem>
          <div>
            <Link href={`/users/${user?.id}`}>
              <a> go to detail</a>
            </Link>
          </div>
        </div>
      )
    })
  }, [props.users])
  return (
    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      {renderUser()}
    </List>
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