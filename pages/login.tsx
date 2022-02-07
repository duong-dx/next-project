import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import {Button} from "@mui/material";
export interface IInitialValue {
  email: string,
  password: string,
}

export default function StateTextFields() {
  const [value, setValue] = React.useState<IInitialValue>({
    email: '',
    password: '',
  });
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue({
      ...value,
      [event.target.name]: event.target.value,
    });
  };

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
        <Button onClick={() => {}} variant="outlined">Login</Button>
      </div>
    </div>
  );
}