import { Button } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logoNoBackground from '../images/devlink-logo/png/logo-no-background.png';

export default function PrimarySearchAppBar() {
  const navigate = useNavigate();

  const goHome = () => {
    navigate('/home');
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <img onClick={goHome} src={logoNoBackground} className=' w-32 cursor-pointer mr-4'/>
          <Box sx={{ flexGrow: 1 }} />
          <Button color="inherit" onClick={() => navigate("/login")}>
              Login
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
