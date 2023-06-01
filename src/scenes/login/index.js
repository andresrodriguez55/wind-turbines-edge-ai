import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Paper, Grid, Avatar, TextField, Button, Typography, Box } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';

import { setUser } from '../../utils/user';
import { frontendUrls } from '../../utils/urls';
import { backendUrls } from '../../utils/urls'; 
import API from '../../utils/api';

export default function Login() 
{
  const navigate = useNavigate();
  const [disableButton, setDisableButton] = useState(false);

  const handleSubmit = async (e, {isAnalyst = false}) => 
  {
    e.preventDefault();
    setDisableButton(true);

    const data = 
    {
      email: (isAnalyst) ? "demo" : document.getElementById('email').value,
      password: (isAnalyst) ? "demo" : document.getElementById('password').value,
    };

    try 
    {
      const response = await API.post(backendUrls.postLogin, 
        {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        }, data);
  
      setUser(response);
      navigate(frontendUrls.dashboard, { replace: false });
    } 
    catch (error) 
    {
      alert(error.message);
    }

    setDisableButton(false);
  };

  return (
    <div>
      <Grid>
        <Paper elevation={12} 
          sx=
          {{
              padding: '30px',
              height: '420px',
              width: '25%',
              margin: '100px auto',
          }}>
          <Grid align="center">
            <Avatar sx={{backgroundColor: '#1bbd7e'}}>
              <LockIcon />
            </Avatar>
            <h2>Login</h2>
          </Grid>

          <form onSubmit={(e) => handleSubmit(e, false)}>
            <TextField
              id="email"
              label="Email"
              placeholder="Enter email"
              variant="standard"
              sx={{marginBottom: '10px'}}
              fullWidth
              required
            />
            <TextField
              id="password"
              label="Password"
              placeholder="Enter password"
              type="password"
              variant="standard"
              sx={{marginBottom: '35px',}}
              fullWidth
              required
            />

            <Button type="submit" color="primary" variant="contained" disabled={disableButton} fullWidth>
              Sign in
            </Button>

            <Box sx={{ height: "35px" }}/>
            <Typography 
              display="inline"
              onClick={(e) => handleSubmit(e, {isAnalyst: true})}
              sx={{ 
                  top: '104px',
                  fontFamily: 'Roboto',
                  fontStyle: 'normal',
                  fontWeight: 'normal',
                  lineHeight: '24px',
                  fontSize: '16px',
                  letterSpacing: '0.18px',
                  color: '#FFFFFF',
                  margin: '16px 0px',
                  cursor:  'pointer' 
              }}>
              You do not have an account? Continue as analyst!
            </Typography>
          </form>
        </Paper>
      </Grid>
    </div>
  );
}