import React, { useState } from 'react';
import { Button, TextField, Typography, Container, Paper, Box, Divider } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';

const SignIn: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignIn = () => {
    console.log('Signing in:', { email, password });
    navigate('/talk');
  };

  return (
    <Layout>
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #4A00E0 30%, #8E2DE2 90%)',
          padding: 3,
        }}
      >
        <Container maxWidth="sm">
          <Paper
            elevation={8}
            sx={{
              padding: 5,
              borderRadius: 4,
              textAlign: 'center',
              background: 'rgba(255, 255, 255, 0.9)', 
              backdropFilter: 'blur(10px)',
            }}
          >
            {/* Sign In Header */}
            <Typography variant="h4" fontWeight="bold" gutterBottom color="primary">
              Welcome Back!
            </Typography>
            <Typography variant="body1" color="textSecondary" sx={{ mb: 2 }}>
              Sign in to continue using <strong>RAG Agent</strong>.
            </Typography>

            {/* Sign In Form */}
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{ borderRadius: 1, backgroundColor: 'white' }}
            />
            <TextField
              label="Password"
              variant="outlined"
              type="password"
              fullWidth
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={{ borderRadius: 1, backgroundColor: 'white' }}
            />
            <Button
              variant="contained"
              color="primary"
              fullWidth
              sx={{
                mt: 2,
                py: 1.5,
                fontSize: '1rem',
                fontWeight: 'bold',
                borderRadius: 2,
                boxShadow: '0px 4px 12px rgba(0,0,0,0.2)',
              }}
              onClick={handleSignIn}
            >
              Sign In
            </Button>

            {/* Divider */}
            <Divider sx={{ my: 3, opacity: 0.6 }} />

            {/* Sign Up Section */}
            <Typography variant="body2" color="textSecondary">
              Don't have an account?
            </Typography>
            <Button
              variant="outlined"
              color="secondary"
              fullWidth
              sx={{
                mt: 1.5,
                py: 1.2,
                fontWeight: 'bold',
                borderRadius: 2,
                borderColor: '#8E2DE2',
                color: '#8E2DE2',
                '&:hover': {
                  backgroundColor: '#8E2DE2',
                  color: 'white',
                },
              }}
              onClick={() => navigate('/signup')}
            >
              Create an Account
            </Button>
          </Paper>
        </Container>
      </Box>
    </Layout>
  );
};

export default SignIn;
