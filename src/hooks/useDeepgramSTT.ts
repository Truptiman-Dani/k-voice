import { useState, useEffect, useRef } from "react";

const useDeepgramSTT = (apiKey: string) => {
    const [transcript, setTranscript] = useState<string>("");
    const socketRef = useRef<WebSocket | null>(null);
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);

    useEffect(() => {
        const connectWebSocket = () => {
            console.log("🔄 Connecting to Deepgram...");
            
            try {
                const socket = new WebSocket(`wss://api.deepgram.com/v1/listen`,
                    ["token", apiKey]
                );
        
                socket.onopen = () => {
                    console.log("✅ WebSocket connected!");
        
                    const configMessage = {
                        type: "start",
                        config: {
                            encoding: "linear16",
                            sample_rate: 16000,
                            model: "nova-2",
                            language: "en-US",
                            interim_results: true
                        }
                    };
        
                    socket.send(JSON.stringify(configMessage));
                };
        
                socket.onmessage = (event) => {
                    try {
                        const data = JSON.parse(event.data);
                        console.log("📜 Received Data:", data);
                
                        const newTranscript = data.channel?.alternatives[0]?.transcript;
                        const isFinal = data.is_final; // Deepgram marks final transcripts
                
                        if (newTranscript) {
                            setTranscript((prev) => (isFinal ? prev + " " + newTranscript : prev));
                        }
                    } catch (error) {
                        console.error("❌ Error parsing message:", error);
                    }
                };
                
        
                socket.onclose = (event) => {
                    console.warn(`⚠️ WebSocket closed (Code: ${event.code}, Reason: ${event.reason})`);
                    if (event.code === 1006) {
                        console.error("❌ Possible network issue or API key problem.");
                    }
                };
        
                socket.onerror = (error) => {
                    console.error("❌ WebSocket Error:", error);
                };
        
                socketRef.current = socket;
            } catch (error) {
                console.error("❌ WebSocket connection failed:", error);
            }
        };
          
        connectWebSocket();
        return () => socketRef.current?.close();
    }, [apiKey]);

    const startRecording = async () => {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const mediaRecorder = new MediaRecorder(stream, { mimeType: "audio/webm" });
        mediaRecorderRef.current = mediaRecorder;

        mediaRecorder.ondataavailable = (event) => {
            console.log("🎤 Sending audio data:", event.data); // <-- Debug log
        
            if (socketRef.current?.readyState === WebSocket.OPEN) {
                socketRef.current.send(event.data);
            }
        };
        

        mediaRecorder.start(500); // Send audio every 500ms
    };

    const stopRecording = () => {
        mediaRecorderRef.current?.stop();
    };

    return { transcript, startRecording, stopRecording };
};

export default useDeepgramSTT;
