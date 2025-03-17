import React, { useState } from "react";
import { Button, Container, Typography, Box, Stack } from "@mui/material";
import useDeepgramSTT from "../hooks/useDeepgramSTT";
import useDeepgramTTS from "../hooks/useDeepgramTTS";
import Layout from "../components/Layout";

const SpeechRecognitionComponent: React.FC = () => {
  const apiKey = "5d6f3d9ba4ac466173a8c9335c466bcf003a045f"; // ✅ Secure API Key
  const { transcript, startRecording, stopRecording } = useDeepgramSTT(apiKey);
  const { isSpeaking, speakText } = useDeepgramTTS(apiKey);
  const [isRecording, setIsRecording] = useState(false);

  const handleToggleRecording = () => {
    if (isRecording) stopRecording();
    else startRecording();
    setIsRecording(!isRecording);
  };

  return (
    <Layout>
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #4A00E0 30%, #8E2DE2 90%)",
        color: "white",
        textAlign: "center",
        padding: 4,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Glowing Effect */}
      <Box
        sx={{
          position: "absolute",
          width: "380px",
          height: "300px",
          background: "radial-gradient(circle, rgba(255,255,255,0.3) 10%, rgba(255,255,255,0) 60%)",
          borderRadius: "50%",
          top: "20%",
          left: "40%",
          filter: "blur(80px)",
          opacity: 0.6,
          zIndex: 0,
        }}
      />

      <Container maxWidth="sm" sx={{ position: "relative", zIndex: 1 }}>
        <Typography
          variant="h3"
          fontWeight="bold"
          gutterBottom
          sx={{
            textShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
            animation: "fadeIn 1.5s ease-in-out",
            marginTop: "-50px",
          }}
        >
          Speak and Transcribe!
        </Typography>

        <Typography
          variant="h6"
          sx={{
            opacity: 0.9,
            maxWidth: "80%",
            margin: "0 auto",
            animation: "fadeIn 2s ease-in-out",
          }}
          gutterBottom
        >
          Speak naturally and see the live transcript below.
        </Typography>

        {/* Transcript Box */}
        <Box
          sx={{
            backgroundColor: "rgba(255, 255, 255, 0.2)",
            backdropFilter: "blur(10px)",
            borderRadius: "10px",
            padding: "16px",
            minHeight: "150px",
            maxHeight: "250px",
            overflowY: "auto",
            boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.2)",
            border: "1px solid rgba(255, 255, 255, 0.3)",
            color: "white",
            textAlign: "left",
            fontSize: "1.1rem",
            lineHeight: "1.5",
          }}
        >
          {transcript || "🎤 Speak now..."}
        </Box>

        {/* Start/Stop Button */}
        <Stack spacing={2} direction="row" justifyContent="center" sx={{ mt: 4 }}>
          <Button
            variant="contained"
            color={isRecording ? "error" : "primary"}
            onClick={handleToggleRecording}
            size="large"
            sx={{
              padding: "12px 24px",
              fontSize: "1.1rem",
              fontWeight: "bold",
              borderRadius: 2,
              transition: "0.3s ease",
              boxShadow: "0px 4px 12px rgba(0,0,0,0.2)",
              "&:hover": {
                transform: "scale(1.05)",
                boxShadow: "0px 6px 16px rgba(0,0,0,0.3)",
              },
            }}
          >
            {isRecording ? "🛑 Stop Recording" : "🎙 Start Recording"}
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              if (transcript && transcript !== "🎤 Speak now...") {
                speakText(transcript);
              }
            }}
            disabled={!transcript || isSpeaking || transcript === "🎤 Speak now..."} // ✅ Prevents empty speech
            size="large"
          >
            {isSpeaking ? "🔊 Speaking..." : "🔊 Speak Text"}
          </Button>
        </Stack>
      </Container>
    </Box>
    </Layout>
  );
};

export default SpeechRecognitionComponent;
