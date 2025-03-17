// src/pages/Documentation.tsx
import React from 'react';
import { Button, Typography, Container, Paper, Box, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { CloudDownload, Api, Code, GitHub } from '@mui/icons-material';
import Layout from '../components/Layout';

const Documentation: React.FC = () => {
  const githubUrl = 'https://github.com/your-repo-link'; // Replace with actual GitHub link

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
              Documentation
            </Typography>
            <Typography variant="body1" color="textSecondary" gutterBottom>
              Follow these steps to integrate the RAG Agent into your system:
            </Typography>

            <List>
              <ListItem>
                <ListItemIcon><CloudDownload color="primary" /></ListItemIcon>
                <ListItemText primary="Step 1: Install dependencies" />
              </ListItem>
              <ListItem>
                <ListItemIcon><Api color="secondary" /></ListItemIcon>
                <ListItemText primary="Step 2: Set up APIs (OpenAI & Deepgram)" />
              </ListItem>
              <ListItem>
                <ListItemIcon><Code color="primary" /></ListItemIcon>
                <ListItemText primary="Step 3: Implement the RAG Agent" />
              </ListItem>
            </List>

            <Typography variant="body2" color="textSecondary" sx={{ mt: 2 }}>
              For more details, check out our full documentation on GitHub.
            </Typography>

            <Button 
              variant="contained" 
              color="primary" 
              fullWidth 
              sx={{ mt: 3 }}
              startIcon={<GitHub />}
              href={githubUrl} 
              target="_blank"
            >
              View on GitHub
            </Button>
          </Paper>
        </Container>
      </Box>
    </Layout>
  );
};

export default Documentation;
