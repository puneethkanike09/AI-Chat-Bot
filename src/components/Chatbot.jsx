import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import Message from "./Message";
import InputBox from "./InputBox";

const Chatbot = ({ className = "chat-window", messages, setMessages }) => {
    const [isProcessing, setIsProcessing] = useState(false);
    const chatRef = useRef(null);

    // Auto-scroll the chat view when messages change.
    useEffect(() => {
        const chat = chatRef.current;
        if (chat) {
            chat.scrollTop = chat.scrollHeight;
        }
    }, [messages]);

    // Remove content inside <think>...</think> and adjust image markdown formatting.
    const cleanResponseText = (text) => {
        let cleaned = text.replace(/<think>[\s\S]*?<\/think>/, "");
        cleaned = cleaned.replace(/Image: \[(.*?)\]\((.*?)\)/g, "![$1]($2)");
        return cleaned.trim();
    };

    const sendMessage = async (text) => {
        const userId = localStorage.getItem('chat_user_id');
        const sessionId = sessionStorage.getItem('chat_session_id');

        setMessages((prev) => [...prev, { id: crypto.randomUUID(), text, sender: "user" }]);
        setIsProcessing(true);

        try {
            const response = await fetch("https://muliyachat.underdev.link/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: text, user_id: userId, session_id: sessionId }),
            });

            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.statusText}`);
            }

            const apiData = await response.json();

            // Store the user ID and session ID if they are returned from the backend
            if (apiData.user_id) {
                localStorage.setItem('chat_user_id', apiData.user_id);
            }
            if (apiData.session_id) {
                sessionStorage.setItem('chat_session_id', apiData.session_id);
            }

            // Process the API response: remove <think> block.
            const cleanedText = cleanResponseText(apiData.response);

            // Create bot message object including extra data.
            const newBotMessage = {
                id: crypto.randomUUID(),
                text: cleanedText,
                sender: "bot",
                suggested_products: apiData.suggested_products,
                promotions: apiData.relevant_promotions,
            };

            setMessages((prev) => [...prev, newBotMessage]);
        } catch (error) {
            console.error("API Error:", error);
            // Optionally add an error message from the bot.
            const errorMessage = {
                id: crypto.randomUUID(),
                text: "Sorry, something went wrong.",
                sender: "bot",
            };
            setMessages((prev) => [...prev, errorMessage]);
        } finally {
            setIsProcessing(false);
        }
    };


    // A simple typing indicator component.
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
        <div
            className={`fixed bottom-16 right-10 w-[300px] h-[450px] sm:w-[700px] sm:h-[600px] bg-white rounded-xl flex flex-col overflow-hidden ${className}`}
        >
            <div className="text-white bg-[#AF1614] p-4 flex items-center rounded-br-xl rounded-bl-xl">
                <div className="flex items-center space-x-2">
                    <img
                        className="w-16"
                        src="../assets/images/images.jpg"
                        alt="Chatbot Logo"
                    />
                </div>
            </div>

            <div ref={chatRef} className="flex-grow overflow-y-auto p-4 space-y-2 custom-scrollbar">
                {messages.map((message) => (
                    <Message key={message.id} message={message} />
                ))}
                {isProcessing && <TypingIndicator />}
            </div>

            <div className="shadow-lg">
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
