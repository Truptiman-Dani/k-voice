import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Button, Box } from '@mui/material';

const Navbar: React.FC = () => {
  return (
    <AppBar position="sticky" sx={{ backgroundColor: 'black', paddingX: 2 }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        {/* Left: Company Logo */}
        <Box component={Link} to="/" sx={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
          <img src="./kreesalis_white_text.png" alt="Company Logo" style={{ height: 40, marginRight: 10 }} />
        </Box>

        {/* Right: Navigation Menu */}
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button color="inherit" component={Link} to="/" sx={{ textTransform: 'none', fontSize: 16 }}>
            Home
          </Button>
          <Button color="inherit" component={Link} to="/chat" sx={{ textTransform: 'none', fontSize: 16 }}>
            Chat
          </Button>
          <Button color="inherit" component={Link} to="/usecases" sx={{ textTransform: 'none', fontSize: 16 }}>
            Use Cases
          </Button>
          <Button color="inherit" component={Link} to="/documentation" sx={{ textTransform: 'none', fontSize: 16 }}>
            Documentation
          </Button>
          <Button color='primary' component={Link} to="/signin" sx={{ textTransform: 'none', fontSize: 16 }}>
            Sign In/Up
          </Button>

        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
