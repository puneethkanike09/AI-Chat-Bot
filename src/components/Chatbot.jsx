import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import Message from "./Message";
import InputBox from "./InputBox";


const Chatbot = ({ className = "chat-window", messages, setMessages }) => {
    const [isProcessing, setIsProcessing] = useState(false);
    const chatRef = useRef(null);

    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    useEffect(() => {
        const chat = chatRef.current;
        if (chat) {
            chat.scrollTop = chat.scrollHeight;
        }
    }, [messages]);

    const sendMessage = async (text) => {
        const newUserMessage = {
            id: crypto.randomUUID(),
            text,
            sender: "user",
        };

        const updatedMessages = [...messages, newUserMessage];
        setMessages(updatedMessages);
        setIsProcessing(true);

        try {
            const response = await fetch(`${backendUrl}/chat/?prompt=${encodeURIComponent(text)}`);
            if (!response.ok) {
                throw new Error("Failed to get response");
            }

            const data = await response.json();

            const botResponse = {
                id: crypto.randomUUID(),
                text: data.reply || "I'm still learning, but I'll improve!",
                sender: "bot",
            };

            setMessages([...updatedMessages, botResponse]);
        } catch (error) {
            console.error("Failed to send message:", error);

            const errorMessage = {
                id: crypto.randomUUID(),
                text: "Sorry, I'm having trouble processing your request right now.",
                sender: "bot",
            };

            setMessages([...updatedMessages, errorMessage]);
        } finally {
            setIsProcessing(false);
        }
    };

    const TypingIndicator = () => (
        <div className="flex justify-start mb-2">
            <div className="typing-indicator">
                <div className="typing-circle"></div>
                <div className="typing-circle"></div>
                <div className="typing-circle"></div>
            </div>
        </div>
    );


    return (
        <div className={`fixed bottom-16 right-10 w-[300px] h-[450px] sm:w-[400px] sm:h-[600px] bg-white  rounded-xl flex flex-col overflow-hidden ${className}`}>
            <div className="text-white bg-[#AF1614] p-4 flex items-center rounded-br-3xl ">
                <div className="flex items-center space-x-2">
                    <img className="w-16" src="../assets/images/images.jpg" alt="" />
                </div>
            </div>

            <div ref={chatRef} className="flex-grow overflow-y-auto p-4 space-y-2 custom-scrollbar">
                {messages.map((message) => (
                    <Message
                        key={message.id}
                        text={message.text}
                        sender={message.sender}
                    />
                ))}
                {isProcessing && <TypingIndicator />}
            </div>

            <div className="shadow-lg ">
                <InputBox onSendMessage={sendMessage} isDisabled={isProcessing} />
            </div>
        </div>
    );
};

Chatbot.propTypes = {
    className: PropTypes.string,
    messages: PropTypes.array.isRequired,
    setMessages: PropTypes.func.isRequired,
};

export default Chatbot;
