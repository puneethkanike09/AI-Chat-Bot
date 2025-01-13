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
    const sendSound = new Audio('/assets/sounds/send.mp3');
    const receiveSound = new Audio('/assets/sounds/receive.mp3');

    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSendMessage = async (userMessageText) => {
        const userMessage = {
            id: messages.length + 1,
            text: userMessageText,
            sender: "user",
        };

        setMessages([...messages, userMessage]);
        sendSound.play().catch((error) => console.log("Send sound error:", error));
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
            receiveSound.play().catch((error) => console.log("Receive sound error:", error));
        } catch (error) {
            console.log(error);
            const errorMessage = {
                id: messages.length + 2,
                text: "Sorry, I'm having trouble processing your request right now.",
                sender: "bot",
            };
            setMessages((prevMessages) => [...prevMessages, errorMessage]);
            receiveSound.play().catch((error) => console.log("Receive sound error:", error));
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <div className="fixed bottom-16 right-10 w-[300px] h-[450px] sm:w-[400px] sm:h-[600px] bg-white shadow-lg rounded-lg flex flex-col overflow-hidden">
            {/* Header */}
            <div className="text-[#ab252c] p-4 flex items-center shadow-lg">
                <div className="flex items-center space-x-2">
                    <AiOutlineRobot size={30} />
                    <span className="text-lg font-bold tracking-wide">Muliya</span>
                </div>
            </div>

            {/* Messages */}
            <div
                ref={chatContainerRef}
                className="flex-grow overflow-y-auto p-4 bg-gray-50 space-y-2"
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
