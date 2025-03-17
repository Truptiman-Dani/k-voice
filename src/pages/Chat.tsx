import React, { useState } from "react";
import { Button, Container, Typography, Box, Stack } from "@mui/material";
import useDeepgramSTT from "../hooks/useDeepgramSTT";
import useDeepgramTTS from "../hooks/useDeepgramTTS";
import Layout from "../components/Layout";
import axios from "axios";

const QuestionRecognitionComponent: React.FC = () => {
  const apiKey = "5d6f3d9ba4ac466173a8c9335c466bcf003a045f"; // Secure API Key
  const { transcript, startRecording, stopRecording } = useDeepgramSTT(apiKey);
  const { isSpeaking, speakText } = useDeepgramTTS(apiKey);
  const [isRecording, setIsRecording] = useState(false);
  const [answer, setAnswer] = useState("");

  // ✅ Hardcoded description
  const description = `The Eiffel Tower is a wrought-iron lattice tower in Paris, France. It was designed by Gustave Eiffel and completed in 1889. The tower stands 330 meters tall and is one of the most visited monuments in the world.`;

  // Function to process the transcript as a question
  const fetchAnswer = async (question: string) => {
    try {
      const response = await axios.post("/api/ask", { description, question });
      setAnswer(response.data.answer);
      speakText(response.data.answer); // Read the answer aloud
    } catch (error) {
      console.error("Error fetching answer:", error);
    }
  };

  const handleToggleRecording = () => {
    if (isRecording) {
      stopRecording();
      setIsRecording(false);
      if (transcript && transcript !== "🎤 Speak now...") {
        fetchAnswer(transcript); // Process the question when recording stops
      }
    } else {
      startRecording();
      setIsRecording(true);
    }
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
          <Typography variant="h3" fontWeight="bold" gutterBottom>
            Ask About the Eiffel Tower!
          </Typography>

          {/* Hardcoded Description */}
          <Box
            sx={{
              backgroundColor: "rgba(255, 255, 255, 0.2)",
              backdropFilter: "blur(10px)",
              borderRadius: "10px",
              padding: "16px",
              marginBottom: "16px",
              color: "white",
              textAlign: "left",
              fontSize: "1rem",
              lineHeight: "1.5",
            }}
          >
            <strong>Description:</strong> {description}
          </Box>

          {/* Transcript Box */}
          <Box
            sx={{
              backgroundColor: "rgba(255, 255, 255, 0.2)",
              backdropFilter: "blur(10px)",
              borderRadius: "10px",
              padding: "16px",
              minHeight: "100px",
              maxHeight: "200px",
              overflowY: "auto",
              color: "white",
              textAlign: "left",
              fontSize: "1.1rem",
              lineHeight: "1.5",
            }}
          >
            {transcript || "🎤 Speak now..."}
          </Box>

          {/* Answer Box */}
          {answer && (
            <Box
              sx={{
                backgroundColor: "rgba(255, 255, 255, 0.2)",
                backdropFilter: "blur(10px)",
                borderRadius: "10px",
                padding: "16px",
                marginTop: "16px",
                color: "white",
                textAlign: "left",
                fontSize: "1.1rem",
                lineHeight: "1.5",
              }}
            >
              <strong>Answer:</strong> {answer}
            </Box>
          )}

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
                "&:hover": { transform: "scale(1.05)" },
              }}
            >
              {isRecording ? "🛑 Stop Recording" : "🎙 Start Recording"}
            </Button>
          </Stack>
        </Container>
      </Box>
    </Layout>
  );
};

export default QuestionRecognitionComponent;
