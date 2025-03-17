import React from 'react';
import { Button, Container, Typography, Box, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';

const Home: React.FC = () => {
    const navigate = useNavigate();

    const goToTalk = () => {
        navigate('/config');
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
                    color: 'white',
                    textAlign: 'center',
                    padding: 4,
                    position: 'relative',
                    overflow: 'hidden',
                }}
            >
                {/* Subtle Glow Effect */}
                <Box
                    sx={{
                        position: 'absolute',
                        width: '380px',
                        height: '300px',
                        background: 'radial-gradient(circle, rgba(255,255,255,0.3) 10%, rgba(255,255,255,0) 60%)',
                        borderRadius: '50%',
                        top: '20%',
                        left: '40%',
                        filter: 'blur(80px)',
                        opacity: 0.6,
                        zIndex: 0,
                    }}
                />

                <Container maxWidth="sm" sx={{ position: 'relative', zIndex: 1 }}>
                    <Typography
                        variant="h3"
                        fontWeight="bold"
                        gutterBottom
                        sx={{
                            textShadow: '0px 4px 10px rgba(0, 0, 0, 0.3)',
                            animation: 'fadeIn 1.5s ease-in-out',
                            marginTop: '-100px',
                        }}
                    >
                        Welcome to RAG Agent!
                    </Typography>
                    <Typography
                        variant="h6"
                        sx={{
                            opacity: 0.9,
                            maxWidth: '80%',
                            margin: '0 auto',
                            animation: 'fadeIn 2s ease-in-out',
                        }}
                        gutterBottom
                    >
                        Get ready to interact with your AI-powered assistant. Speak naturally and let AI assist you.
                    </Typography>
                    <Stack spacing={2} direction="row" justifyContent="center" sx={{ mt: 4 }}>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={goToTalk}
                            size="large"
                            sx={{
                                padding: '12px 24px',
                                fontSize: '1.1rem',
                                fontWeight: 'bold',
                                borderRadius: 2,
                                transition: '0.3s ease',
                                boxShadow: '0px 4px 12px rgba(0,0,0,0.2)',
                                '&:hover': {
                                    transform: 'scale(1.05)',
                                    boxShadow: '0px 6px 16px rgba(0,0,0,0.3)',
                                },
                            }}
                        >
                            Start a Conversation
                        </Button>
                    </Stack>
                </Container>
            </Box>
        </Layout>
    );
};

export default Home;
