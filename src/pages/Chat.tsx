import React, { useEffect, useState } from "react";
import { Typography, Box, Paper } from "@mui/material";
import useOpenAi from "../hooks/useOpenAi";
import useDeepgramSTT from "../hooks/useDeepgramSTT";
import useDeepgramTTS from "../hooks/useDeepgramTTS";

const Chat: React.FC = () => {
    const apiKey: string = process.env.REACT_APP_DEEPGRAM_API_KEY || "";
    const { askQuestion } = useOpenAi();
    const { transcript, startRecording, stopRecording, resetTranscript } = useDeepgramSTT(apiKey);
    const { speakText } = useDeepgramTTS(apiKey);
    
    const [chatStarted, setChatStarted] = useState(false);
    const [isGreeting, setIsGreeting] = useState(true);
    const [isRecording, setIsRecording] = useState(false);
    const [chatHistory, setChatHistory] = useState<{ question: string; answer: string }[]>([]);

    // Start Chat Function
    const startChat = () => {
        setChatStarted(true);
        setTimeout(() => {
            const greeting = "Hello! How can I help you today?";
            speakText(greeting, startListening);
            setChatHistory((prev) => [...prev, { question: "System:", answer: greeting }]);
            setIsGreeting(false);
        }, 500);
    };

    // Function to start listening
    const startListening = () => {
        console.log("🎙 Listening for user's question...");
        resetTranscript();
        setIsRecording(true);
        startRecording();
    };

    // Function to stop recording, ask OpenAI, and respond with TTS
    const handleStopListening = async () => {
        if (!isRecording) return;
        
        console.log("🛑 Stopping recording...");
        setIsRecording(false);
        stopRecording();  
    
        setTimeout(async () => {
            if (!transcript.trim()) {
                console.log("⚠️ No input detected, restarting listening...");
                resetTranscript();  // ✅ Make sure transcript resets
                startListening();
                return;
            }
    
            console.log("✅ Sending transcript to OpenAI:", transcript);
            const response = await askQuestion(transcript);
            console.log("🤖 OpenAI Response:", response);
            
            // Add response to chat history
            setChatHistory((prevChat) => [...prevChat, { question: transcript, answer: response }]);
    
            speakText(response, () => {
                console.log("🗣️ TTS finished, restarting STT...");
                setTimeout(() => {
                    resetTranscript();  // ✅ Reset transcript before restarting
                    startListening();   // ✅ Start STT again
                }, 500);
            });
        }, 500);
    };
    

    // Automatically process transcript updates
    useEffect(() => {
        if (!transcript || transcript.trim().length < 3) return; // Ignore empty/short transcripts
        console.log("🔎 Transcript updated:", transcript);
        handleStopListening();
    }, [transcript]);

    return (
        <Box sx={{ textAlign: "center", p: 4 }}>
            <Typography variant="h4">🎤 Voice Chat</Typography>

            {!chatStarted ? (
                <button onClick={startChat}>🚀 Start Chat</button>
            ) : (
                <>
                    {isGreeting && (
                        <Typography variant="h6" sx={{ color: "purple", mt: 2 }}>
                            🗣 Initializing...
                        </Typography>
                    )}

                    {!isGreeting && (
                        <Typography variant="h6" sx={{ mt: 2, color: isRecording ? "green" : "blue" }}>
                            {isRecording ? "🎙 Listening..." : "🤖 Processing Response..."}
                        </Typography>
                    )}

                    <Box sx={{ mt: 4, maxHeight: "800px", overflowY: "auto" }}>
                        {chatHistory.map((entry, index) => (
                            <Paper key={index} sx={{ p: 2, my: 1, textAlign: "left" }}>
                                <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                                    {entry.question}
                                </Typography>
                                {entry.answer && (
                                    <Typography variant="body1" sx={{ mt: 1 }}>
                                        {entry.answer}
                                    </Typography>
                                )}
                            </Paper>
                        ))}
                    </Box>
                </>
            )}
        </Box>
    );
};

export default Chat;
