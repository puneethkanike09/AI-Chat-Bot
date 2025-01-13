import { useState, useEffect, useRef } from "react";
import { AiOutlineRobot } from "react-icons/ai";
import Message from "./Message";
import InputBox from "./InputBox";
import axios from "axios";

const Chatbot = () => {
    const [messages, setMessages] = useState([
        { id: 1, text: "Hello! How can I assist you today?", sender: "bot" },
    ]);
    const [isProcessing, setIsProcessing] = useState(false);
    const chatContainerRef = useRef(null);
    const sendSoundRef = useRef(null);
    const receiveSoundRef = useRef(null);

    // Initialize and preload audio
    useEffect(() => {
        // Create audio elements
        sendSoundRef.current = new Audio('/assets/sounds/send.mp3');
        receiveSoundRef.current = new Audio('/assets/sounds/receive.mp3');

        // Preload audio files
        const preloadAudio = async () => {
            try {
                sendSoundRef.current.load();
                receiveSoundRef.current.load();

                // Set volume to ensure quick playback
                sendSoundRef.current.volume = 0.5;
                receiveSoundRef.current.volume = 0.5;

                // Optional: Pre-buffer the audio
                await Promise.all([
                    sendSoundRef.current.play().then(() => sendSoundRef.current.pause()),
                    receiveSoundRef.current.play().then(() => receiveSoundRef.current.pause())
                ]);

                // Reset time after prebuffering
                sendSoundRef.current.currentTime = 0;
                receiveSoundRef.current.currentTime = 0;
            } catch (error) {
                console.log("Audio preload error:", error);
            }
        };

        preloadAudio();

        // Cleanup
        return () => {
            if (sendSoundRef.current) {
                sendSoundRef.current.pause();
                sendSoundRef.current = null;
            }
            if (receiveSoundRef.current) {
                receiveSoundRef.current.pause();
                receiveSoundRef.current = null;
            }
        };
    }, []);

    // Scroll to bottom effect
    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [messages]);

    // Function to play sound with better error handling
    const playSound = async (soundRef) => {
        try {
            if (soundRef.current) {
                soundRef.current.currentTime = 0; // Reset to start
                await soundRef.current.play();
            }
        } catch (error) {
            console.log("Sound playback error:", error);
        }
    };

    const handleSendMessage = async (userMessageText) => {
        const userMessage = {
            id: messages.length + 1,
            text: userMessageText,
            sender: "user",
        };

        setMessages([...messages, userMessage]);
        await playSound(sendSoundRef);
        setIsProcessing(true);

        try {
            const response = await axios.post("http://localhost:8080/chat", {
                prompt: userMessageText,
            });

            const botMessage = {
                id: messages.length + 2,
                text: response.data.reply || "I'm still learning, but I'll improve!",
                sender: "bot",
            };

            setMessages((prevMessages) => [...prevMessages, botMessage]);
            await playSound(receiveSoundRef);
        } catch (error) {
            console.log(error);
            const errorMessage = {
                id: messages.length + 2,
                text: "Sorry, I'm having trouble processing your request right now.",
                sender: "bot",
            };
            setMessages((prevMessages) => [...prevMessages, errorMessage]);
            await playSound(receiveSoundRef);
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <div className="fixed bottom-16 right-10 w-[300px] h-[450px] sm:w-[400px] sm:h-[600px] bg-white shadow-lg rounded-lg flex flex-col overflow-hidden  border-[#ab252c] ">
            {/* Header */}
            <div className="text-white bg-[#ab252c] p-4 flex items-center shadow-lg">
                <div className="flex items-center space-x-2">
                    <AiOutlineRobot size={30} />
                    <span className="text-lg font-bold tracking-wide">Muliya</span>
                </div>
            </div>

            {/* Messages */}
            {/* Messages */}
            <div
                ref={chatContainerRef}
                className="flex-grow overflow-y-auto p-4 bg-white space-y-2 custom-scrollbar"
            >
                {messages.map((message) => (
                    <Message
                        key={message.id}
                        text={message.text}
                        sender={message.sender}
                    />
                ))}
            </div>

            {/* Input Box */}
            <div className="bg-gradient-to-r from-gray-50 to-gray-100 shadow-md">
                <InputBox onSendMessage={handleSendMessage} isDisabled={isProcessing} />
            </div>
        </div>
    );
};

export default Chatbot;