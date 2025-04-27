import React from 'react';
import { AppBar, Toolbar, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '@asgardeo/auth-react';
import { useUser } from '../context/UserContext';

export default function Navbar() {
  const navigate = useNavigate();
  const { state, signIn, signOut } = useAuthContext();
  const { user } = useUser();

  const isLoggedIn = state?.isAuthenticated;

  return (
    <AppBar position="static" color="primary">
      <Toolbar sx={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
        <Box>
          <Button color="inherit" onClick={() => navigate('/')}>
            Home
          </Button>
          <Button color="inherit" onClick={() => navigate('/blogs')}>
            Blogs
          </Button> {/* ✅ Always visible */}
        </Box>

        <Box>
          {isLoggedIn ? (
            <>
              <Button color="inherit" onClick={() => navigate('/profile')}>
                Profile
              </Button>
              <Button color="inherit" onClick={() => navigate('/dashboard')}>
                Dashboard
              </Button>
              <Button color="inherit" onClick={() => navigate('/manage-players')}>
                Manage Players
              </Button>
              <Button color="inherit" onClick={() => navigate('/admin/spins')}>
                Spin History
              </Button>
              <Button color="inherit" onClick={signOut}>
                Logout
              </Button>
            </>
          ) : (
            <Button
              color="inherit"
              onClick={() => {
                try {
                  signIn();
                } catch (err) {
                  console.error('Sign-in error:', err);
                }
              }}
            >
              Login
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
