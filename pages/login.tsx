import * as React from 'react';
import TextField from '@mui/material/TextField';
import {Button, Alert, Stack} from "@mui/material";
import {LoginPayload} from "@/models/auth";
import authAPI from "@/api-client/auth-api";
import {useRouter} from "next/router";
import {useEffect} from "react";
import Cookies from "cookies";

export default function StateTextFields() {
  const [value, setValue] = React.useState<LoginPayload>({
    email: '',
    password: '',
  });

  const router = useRouter()

  const [loginStatus, setLoginStatus] = React.useState<boolean>(false)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue({
      ...value,
      [event.target.name]: event.target.value,
    });
  };

  const handleLogin = async () => {
    try {
      await authAPI.login(value)

      return router.push('/users')
    } catch (e) {
      setLoginStatus(true)
    }
  }

  return (
    <div style={{
      width: 600,
      borderRadius: 50,
      margin: "auto",
      padding: 100
    }}>
      <h2 style={{
        textAlign: 'center'
      }}>Login Form</h2>
      {
        loginStatus && <Stack sx={{ width: '100%' }} spacing={2}>
          <Alert severity="error">Login fail</Alert>
        </Stack>
      }
        <div>
          <TextField
            style={{
              width: '100%',
              margin: 20,
            }}
            id="outlined-name"
            label="Email"
            name="email"
            value={value.email}
            onChange={handleChange}
          />
        </div>
        <TextField
          style={{
            width: '100%',
            margin: 20,
          }}
          id="outlined-uncontrolled"
          label="Password"
          name="password"
          type='password'
          value={value.password}
          onChange={handleChange}
        />
      <div
        style={{
          width: '100%',
          margin: 20,
          display: 'flex',
          justifyContent: 'center'
        }}>
        <Button onClick={handleLogin} variant="outlined">Login</Button>
      </div>
    </div>
  );
}