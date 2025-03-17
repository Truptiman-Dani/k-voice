import React, { useState, useEffect } from 'react';
import {
    Button,
    MenuItem,
    Select,
    FormControl,
    Typography,
    Container,
    Paper,
    Box,
    Switch,
    Divider,
} from '@mui/material';
import Layout from '../components/Layout';
import { useNavigate } from 'react-router-dom';

const Config: React.FC = () => {
    const [language, setLanguage] = useState<string>('English');
    const [voice, setVoice] = useState<string>('Male');
    const [microphone, setMicrophone] = useState<string>('Default');
    const [speaker, setSpeaker] = useState<string>('Default');
    const [microphones, setMicrophones] = useState<string[]>([]);
    const [speakers, setSpeakers] = useState<string[]>([]);
    const [micMuted, setMicMuted] = useState<boolean>(false);
    const navigate = useNavigate();

    useEffect(() => {
        const getAudioDevices = async () => {
            try {
                await navigator.mediaDevices.getUserMedia({ audio: true });
                const devices = await navigator.mediaDevices.enumerateDevices();

                const micList = devices
                    .filter(d => d.kind === 'audioinput')
                    .map(d => d.label || `Microphone ${microphones.length + 1}`);

                const speakerList = devices
                    .filter(d => d.kind === 'audiooutput')
                    .map(d => d.label || `Speaker ${speakers.length + 1}`);

                setMicrophones([...micList]);
                setSpeakers([...speakerList]);
            } catch (error) {
                console.error('Error fetching audio devices:', error);
            }
        };

        getAudioDevices();
    }, []);

    const handleSaveConfig = () => {
        console.log('Config saved:', { language, voice, microphone, speaker, micMuted });
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
                        elevation={10}
                        sx={{
                            padding: 4,
                            borderRadius: 4,
                            textAlign: 'center',
                            background: 'rgba(255, 255, 255, 0.15)',
                            backdropFilter: 'blur(12px)',
                            boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.2)',
                            color: 'white',
                        }}
                    >
                        <Typography variant="h4" fontWeight="bold" gutterBottom>
                            Setup Configuration
                        </Typography>
                        <Typography variant="body1" sx={{ opacity: 0.8, marginBottom: 1 }}>
                            Customize your experience before starting.
                        </Typography>

                        {/* Audio Settings */}
                        <Box sx={{ textAlign: 'left' }}>
                            <Typography variant="h6" fontWeight="bold" sx={{}}>
                                Audio Settings
                            </Typography>
                            <Divider sx={{ backgroundColor: 'white', opacity: 0.3,mb:1}} />

                            <Typography>Microphone</Typography>
                            <FormControl fullWidth margin="normal">
                                <Select
                                    sx={{color: 'white',}}
                                    value={microphone}
                                    onChange={(e) => setMicrophone(e.target.value)}
                                >
                                    {microphones.length > 0 ? (
                                        microphones.map((mic, index) => (
                                            <MenuItem key={index} value={mic}>
                                                {mic}
                                            </MenuItem>
                                        ))
                                    ) : (
                                        <MenuItem disabled>No microphones found</MenuItem>
                                    )}
                                </Select>
                            </FormControl>

                            <Typography sx={{ mt: 2}}>Speaker</Typography>
                            <FormControl fullWidth margin="normal">
                                <Select
                                    sx={{color: 'white',}}
                                    value={speaker}
                                    onChange={(e) => setSpeaker(e.target.value)}
                                >
                                    {speakers.length > 0 ? (
                                        speakers.map((spk, index) => (
                                            <MenuItem key={index} value={spk}>
                                                {spk}
                                            </MenuItem>
                                        ))
                                    ) : (
                                        <MenuItem disabled>No speakers found</MenuItem>
                                    )}
                                </Select>
                            </FormControl>
                        </Box>

                        {/* Language & Voice Selection */}
                        <Box sx={{ textAlign: 'left' }}>
                            <Typography variant="h6" fontWeight="bold" sx={{}}>
                                Language & Voice
                            </Typography>
                            <Divider sx={{ backgroundColor: 'white', opacity: 0.3, mb: 1 }} />

                            <Typography sx={{}}>Language</Typography>
                            <FormControl fullWidth margin="normal">
                                <Select
                                    sx={{color: 'white',}}
                                    value={language}
                                    onChange={(e) => setLanguage(e.target.value)}
                                >
                                    <MenuItem value="English">English</MenuItem>
                                    <MenuItem value="Spanish">Spanish</MenuItem>
                                    <MenuItem value="French">French</MenuItem>
                                </Select>
                            </FormControl>

                            <Typography sx={{ mt: 2 }}>Voice</Typography>
                            <FormControl fullWidth margin="normal">
                                <Select
                                    sx={{color: 'white',}}
                                    value={voice}
                                    onChange={(e) => setVoice(e.target.value)}
                                >
                                    <MenuItem value="Male">Male</MenuItem>
                                    <MenuItem value="Female">Female</MenuItem>
                                    <MenuItem value="Neutral">Neutral</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>

                        {/* Mic Mute Option */}
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: '#fff' }}>
                            <Typography variant="body1">Join with mic muted</Typography>
                            <Switch checked={micMuted} onChange={() => setMicMuted(!micMuted)} />
                        </Box>

                        {/* Save Configuration Button */}
                        <Button
                            variant="contained"
                            fullWidth
                            sx={{
                                mt: 3,
                                backgroundColor: '#FF6B6B',
                                color: '#fff',
                                fontWeight: 'bold',
                                borderRadius: 3,
                                boxShadow: '0px 5px 15px rgba(255, 107, 107, 0.3)',
                                '&:hover': { backgroundColor: '#E63946' },
                            }}
                            onClick={handleSaveConfig}
                        >
                            Start
                        </Button>
                    </Paper>
                </Container>
            </Box>
        </Layout>
    );
};

export default Config;
