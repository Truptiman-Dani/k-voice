import { useState, useEffect, useRef } from "react";

const useDeepgramSTT = (apiKey: string) => {
    const [transcript, setTranscript] = useState<string>("");
    const socketRef = useRef<WebSocket | null>(null);
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const pingIntervalRef = useRef<NodeJS.Timeout | null>(null);
    const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    const connectWebSocket = () => {
        console.log("🔄 Connecting to Deepgram...");

        if (socketRef.current?.readyState === WebSocket.OPEN) {
            console.warn("⚠️ WebSocket already open. Skipping reconnection.");
            return;
        }

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

                // 🔴 Send Keep-Alive Pings Every 25 Seconds
                pingIntervalRef.current = setInterval(() => {
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
                cleanupWebSocket();

                if (event.code !== 1000) {
                    console.log("🔄 Reconnecting WebSocket in 3 seconds...");
                    reconnectTimeoutRef.current = setTimeout(connectWebSocket, 2000);
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

    const cleanupWebSocket = () => {
        console.log("🛑 Cleaning up WebSocket...");
        if (pingIntervalRef.current) {
            clearInterval(pingIntervalRef.current);
            pingIntervalRef.current = null;
        }
        if (reconnectTimeoutRef.current) {
            clearTimeout(reconnectTimeoutRef.current);
            reconnectTimeoutRef.current = null;
        }
        socketRef.current?.close();
        socketRef.current = null;
    };

    useEffect(() => {
        connectWebSocket();

        return () => {
            cleanupWebSocket();
        };
    }, [apiKey]);

    const startRecording = async () => {
        setTranscript(""); // Reset transcript at the start of each recording

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
