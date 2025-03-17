// src/pages/UseCases.tsx
import React from 'react';
import { Button, Typography, Container, Paper, Box, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { Business, HealthAndSafety, School, AttachMoney } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';

const UseCases: React.FC = () => {
  const navigate = useNavigate();

  const goToDemo = () => {
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
          background: 'linear-gradient(135deg, #6D5BBA 30%, #8D58BF 90%)',
          padding: 3,
        }}
      >
        <Container maxWidth="sm">
          <Paper elevation={6} sx={{ padding: 4, borderRadius: 3, textAlign: 'center' }}>
            <Typography variant="h4" fontWeight="bold" gutterBottom>
              Product Use Cases
            </Typography>
            <Typography variant="body1" color="textSecondary" gutterBottom>
              This product can be applied in various industries to improve efficiency and customer experience.
            </Typography>

            <List>
              <ListItem>
                <ListItemIcon><Business color="primary" /></ListItemIcon>
                <ListItemText primary="Customer Support" />
              </ListItem>
              <ListItem>
                <ListItemIcon><HealthAndSafety color="secondary" /></ListItemIcon>
                <ListItemText primary="Healthcare" />
              </ListItem>
              <ListItem>
                <ListItemIcon><School color="primary" /></ListItemIcon>
                <ListItemText primary="Education" />
              </ListItem>
              <ListItem>
                <ListItemIcon><AttachMoney color="success" /></ListItemIcon>
                <ListItemText primary="Finance" />
              </ListItem>
            </List>

            <Button 
              variant="contained" 
              color="primary" 
              fullWidth 
              sx={{ mt: 3 }}
              onClick={goToDemo}
            >
              Try a Demo
            </Button>
          </Paper>
        </Container>
      </Box>
    </Layout>
  );
};

export default UseCases;
