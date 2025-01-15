// Chatbot.jsx
import { useState, useEffect, useRef } from "react";
import Message from "./Message";
import InputBox from "./InputBox";

// Create a messages store outside the component to persist messages
const messageStore = [
    { id: 1, text: "Hello! How can I assist you today?", sender: "bot" },
];

const Chatbot = ({ className = 'chat-window' }) => {

    const [messages, setMessages] = useState(messageStore);
    const [isProcessing, setIsProcessing] = useState(false);
    const chatContainerRef = useRef(null);
    const sendSoundRef = useRef(null);
    const receiveSoundRef = useRef(null);

    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    useEffect(() => {
        sendSoundRef.current = new Audio('/assets/sounds/send.mp3');
        receiveSoundRef.current = new Audio('/assets/sounds/receive.mp3');

        const preloadAudio = async () => {
            try {
                sendSoundRef.current.load();
                receiveSoundRef.current.load();
                sendSoundRef.current.volume = 0.5;
                receiveSoundRef.current.volume = 0.5;

                await Promise.all([
                    sendSoundRef.current.play().then(() => sendSoundRef.current.pause()),
                    receiveSoundRef.current.play().then(() => receiveSoundRef.current.pause())
                ]);

                sendSoundRef.current.currentTime = 0;
                receiveSoundRef.current.currentTime = 0;
            } catch (error) {
                console.log("Audio preload error:", error);
            }
        };

        preloadAudio();

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

    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [messages]);

    const playSound = async (soundRef) => {
        try {
            if (soundRef.current) {
                soundRef.current.currentTime = 0;
                await soundRef.current.play();
            }
        } catch (error) {
            console.log("Sound playback error:", error);
        }
    };

    const handleSendMessage = async (userMessageText) => {
        const userMessage = {
            id: crypto.randomUUID(),
            text: userMessageText,
            sender: "user",
        };

        const updatedMessages = [...messages, userMessage];
        setMessages(updatedMessages);
        messageStore.push(userMessage); // Update the message store

        await playSound(sendSoundRef);
        setIsProcessing(true);

        try {
            const response = await fetch(`${backendUrl}/chat/?prompt=${encodeURIComponent(userMessageText)}`);

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();

            const botMessage = {
                id: crypto.randomUUID(),
                text: data.reply || "I'm still learning, but I'll improve!",
                sender: "bot",
            };

            const finalMessages = [...updatedMessages, botMessage];
            setMessages(finalMessages);
            messageStore.push(botMessage); // Update the message store
            await playSound(receiveSoundRef);
        } catch (error) {
            console.error("Chat error:", error);
            const errorMessage = {
                id: crypto.randomUUID(),
                text: "Sorry, I'm having trouble processing your request right now.",
                sender: "bot",
            };
            const finalMessages = [...updatedMessages, errorMessage];
            setMessages(finalMessages);
            messageStore.push(errorMessage); // Update the message store
            await playSound(receiveSoundRef);
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <div className={`fixed bottom-16 right-10 w-[300px] h-[450px] sm:w-[400px] sm:h-[600px] bg-white shadow-lg rounded-lg flex flex-col overflow-hidden border-[#ab252c] ${className}`}>
            <div className="text-white bg-[#ab252c] p-4 flex items-center shadow-lg">
                <div className="flex items-center space-x-2">
                    <img className="w-16" src="../assets/images/images.jpg" alt="" />
                </div>
            </div>

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

            <div className="bg-gradient-to-r from-gray-50 to-gray-100 shadow-md">
                <InputBox onSendMessage={handleSendMessage} isDisabled={isProcessing} />
            </div>
        </div>
    );
};

export default Chatbot;