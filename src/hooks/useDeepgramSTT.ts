import { useState, useEffect, useRef } from "react";

const useDeepgramSTT = (apiKey: string) => {
    const [transcript, setTranscript] = useState<string>("");
    const socketRef = useRef<WebSocket | null>(null);
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);

    useEffect(() => {
        let pingInterval: NodeJS.Timeout;
    
        const connectWebSocket = () => {
            console.log("🔄 Connecting to Deepgram...");
            
            try {
                const socket = new WebSocket(`wss://api.deepgram.com/v1/listen`, ["token", apiKey]);
    
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
    
                    // 🔴 Send Keep-Alive Messages Every 10 Seconds
                    pingInterval = setInterval(() => {
                        if (socket.readyState === WebSocket.OPEN) {
                            socket.send(JSON.stringify({ type: "keep-alive" }));
                            console.log("🔄 Sent Keep-Alive Ping");
                        }
                    }, 10000);
                };
    
                socket.onmessage = (event) => {
                    try {
                        const data = JSON.parse(event.data);
                        console.log("📜 Received Data:", data);
                
                        const newTranscript = data.channel?.alternatives[0]?.transcript;
                        const isFinal = data.is_final;
    
                        if (newTranscript) {
                            setTranscript((prev) => (isFinal ? prev + " " + newTranscript : prev));
                        }
                    } catch (error) {
                        console.error("❌ Error parsing message:", error);
                    }
                };
    
                socket.onclose = (event) => {
                    console.warn(`⚠️ WebSocket closed (Code: ${event.code}, Reason: ${event.reason})`);
                    clearInterval(pingInterval); // Stop keep-alive pings
    
                    if (event.code === 1006 || event.code === 1000) {
                        console.log("🔄 Reconnecting WebSocket...");
                        setTimeout(connectWebSocket, 2000); // Reconnect after 2 seconds
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
    
        return () => {
            console.log("🛑 Cleaning up WebSocket...");
            clearInterval(pingInterval);
            socketRef.current?.close();
        };
    }, [apiKey]);
    
    
    const startRecording = async () => {
        setTranscript(""); // Reset transcript at the start of each recording (Fix)

        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const mediaRecorder = new MediaRecorder(stream, { mimeType: "audio/webm" });
        mediaRecorderRef.current = mediaRecorder;

        mediaRecorder.ondataavailable = (event) => {
            console.log("🎤 Sending audio data:", event.data);
        
            if (socketRef.current?.readyState === WebSocket.OPEN) {
                socketRef.current.send(event.data);
            }
        };

        mediaRecorder.start(500); // Send audio every 500ms
    };

    const stopRecording = () => {
        mediaRecorderRef.current?.stop();
    };

    const resetTranscript = () => {
        setTranscript(""); // Clears previous transcript
    };

    return { transcript, startRecording, stopRecording, resetTranscript };
};

export default useDeepgramSTT;
