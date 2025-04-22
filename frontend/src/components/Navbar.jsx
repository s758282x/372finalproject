import React from 'react';
import { AppBar, Toolbar, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <AppBar position="static" color="primary">
      <Toolbar sx={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
        <Box>
          <Button color="inherit" onClick={() => navigate('/')}>
            Home
          </Button>
        </Box>
        <Box>
          <Button color="inherit" onClick={() => navigate('/login')}>
            Login
          </Button>
          <Button color="inherit" onClick={() => navigate('/dashboard')}>
            Dashboard
          </Button>
          <Button color="inherit" onClick={() => navigate('/manage-players')}>
            Manage Players
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
