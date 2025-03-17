import React, { useEffect, useState } from "react";
import { Button, Typography, Box, Stack, Paper } from "@mui/material";
import useOpenAi from "../hooks/useOpenAi";
import useDeepgramSTT from "../hooks/useDeepgramSTT";
import useDeepgramTTS from "../hooks/useDeepgramTTS";

const Chat: React.FC = () => {
    const apiKey: string = process.env.REACT_APP_DEEPGRAM_API_KEY || "";
    const { askQuestion } = useOpenAi();
    const { transcript, startRecording, stopRecording } = useDeepgramSTT(apiKey);
    const { speakText } = useDeepgramTTS(apiKey);
    
    const [isRecording, setIsRecording] = useState(false);
    const [chatStarted, setChatStarted] = useState(false);
    const [isGreeting, setIsGreeting] = useState(true);
    const [chatHistory, setChatHistory] = useState<{ question: string; answer: string }[]>([]);

    // Start Chat Function (User must click first)
    const startChat = () => {
        setChatStarted(true);
        setTimeout(() => {
            const greeting = "Hello! How can I help you today?";
            speakText(greeting);
            setChatHistory((prev) => [...prev, { question: "System: ", answer: greeting }]);
            setIsGreeting(false);
            setTimeout(startListening, 2000); // Start listening after greeting
        }, 3000);
    };

    // Function to start listening for the user's question
    const startListening = () => {
        setIsRecording(true);
        startRecording();
    };

    // Function to stop recording, ask OpenAI, and restart listening
    const handleStopListening = async () => {
        setIsRecording(false);
        stopRecording();

        // Wait to ensure transcript updates
        setTimeout(async () => {
            if (!transcript.trim()) {
                startListening(); // Restart if no input
                return;
            }

            const userQuestion = transcript;
            setChatHistory((prev) => [...prev, { question: `User: ${userQuestion}`, answer: "" }]);

            const response = await askQuestion(userQuestion);
            setChatHistory((prev) =>
                prev.map((entry) =>
                    entry.question === `User: ${userQuestion}` ? { ...entry, answer: response } : entry
                )
            );

            speakText(response);

            // Restart listening after AI finishes speaking
            setTimeout(startListening, 3000);
        }, 1000);
    };

    return (
        <Box sx={{ textAlign: "center", p: 4 }}>
            <Typography variant="h4">🎤 Voice Chat</Typography>

            {!chatStarted ? (
                <Button variant="contained" onClick={startChat}>
                    🚀 Start Chat
                </Button>
            ) : (
                <>
                    {/* Greeting Message */}
                    {isGreeting && (
                        <Typography variant="h6" sx={{ color: "purple", mt: 2 }}>
                            🗣 Initializing...
                        </Typography>
                    )}

                    {/* Recording Indicator */}
                    {!isGreeting && (
                        <Typography variant="h6" sx={{ mt: 2, color: isRecording ? "green" : "blue" }}>
                            {isRecording ? "🎙 Listening..." : "Ready to listen! Ask your question."}
                        </Typography>
                    )}

                    {/* Button to manually toggle listening */}
                    <Stack spacing={2} direction="row" justifyContent="center" sx={{ mt: 3 }}>
                        <Button
                            variant="contained"
                            color={isRecording ? "error" : "primary"}
                            onClick={isRecording ? handleStopListening : startListening}
                            disabled={isGreeting}
                        >
                            {isRecording ? "🛑 Stop Speaking" : "🎤 Speak"}
                        </Button>
                    </Stack>

                    {/* Display Chat History */}
                    <Box sx={{ mt: 4, maxHeight: "400px", overflowY: "auto" }}>
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
