import React, {useCallback, useEffect, useState} from 'react';
import Link from "next/link";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import {AdminLayout} from "@/components/layout";
import {IUser} from "@/models/user";
import authAPI from "@/api-client/auth-api";


const TestUserDetail: React.FC<any>  = (props) => {
  const [users, setUsers] = useState<IUser[]>()

  useEffect(() => {
    handleGetUser()

  }, [])

  const handleGetUser = async () => {
    try {
      const response = await authAPI.getUsers()

      setUsers(response.data);
    } catch ({message}) {
      console.log(message)
    }
  }

  const renderUser = useCallback(() => {
    return users && users.map(user => {
      return (
        <div key={user?.id}>
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Avatar src={'@/assets/images/1608636809_1.jpg'} />
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
  }, [users])
  return (
    <AdminLayout>
      <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
        {renderUser()}
      </List>
    </AdminLayout>
  )
}

export default TestUserDetail