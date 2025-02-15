import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import Message from "./Message";
import InputBox from "./InputBox";
import { funFacts } from "../data/typingData";
import { processingMessages } from "../data/typingData";

const TypingIndicator = () => {
    const [currentQuote, setCurrentQuote] = useState('');
    const [processingMessage, setProcessingMessage] = useState('');
    const [showProcessing, setShowProcessing] = useState(false);

    const getRandomFact = () => funFacts[Math.floor(Math.random() * funFacts.length)];
    const getRandomProcessingMessage = () => processingMessages[Math.floor(Math.random() * processingMessages.length)];

    useEffect(() => {
        setCurrentQuote(getRandomFact());
        setProcessingMessage(getRandomProcessingMessage());

        const processingInterval = setInterval(() => {
            setShowProcessing(true);

            setTimeout(() => {
                setShowProcessing(false);
                setCurrentQuote(getRandomFact());
                setProcessingMessage(getRandomProcessingMessage());
            }, 10000);
        }, 10000);

        return () => {
            clearInterval(processingInterval);
        };
    }, []);

    return (
        <div className="flex flex-col items-start">
            <div className="text-gray-500 text-sm italic">
                {showProcessing ? processingMessage : currentQuote}
            </div>
            <div className=" px-2 py-2  rounded-full w-fit">
                <div className="typing-indicator">
                    <div className="typing-circle"></div>
                    <div className="typing-circle"></div>
                    <div className="typing-circle"></div>
                </div>
            </div>
        </div>
    );
};

const Chatbot = ({ className = "chat-window", messages, setMessages, isProcessing, setIsProcessing }) => {
    const chatRef = useRef(null);
    const inputRef = useRef(null);
    const [isAtBottom, setIsAtBottom] = useState(true);

    useEffect(() => {
        const chatContainer = chatRef.current;
        if (!chatContainer) return;

        const handleScroll = () => {
            const { scrollTop, scrollHeight, clientHeight } = chatContainer;
            const isBottom = scrollHeight - (scrollTop + clientHeight) < 50;
            setIsAtBottom(isBottom);
        };

        chatContainer.addEventListener('scroll', handleScroll);
        handleScroll(); // Initial check

        return () => chatContainer.removeEventListener('scroll', handleScroll);
    }, []);



    useEffect(() => {
        const chat = chatRef.current;
        if (chat) {
            const lastMessage = messages[messages.length - 1];
            if (lastMessage?.sender === "bot") {
                setTimeout(() => {
                    const messageElements = chat.querySelectorAll('[data-sender]');
                    if (messageElements.length > 0) {
                        const lastElement = messageElements[messageElements.length - 1];
                        if (lastElement.dataset.sender === "bot") {
                            lastElement.scrollIntoView({ block: "start", behavior: "smooth" });
                        }
                    }
                }, 0);
                inputRef.current?.focus();
            } else {
                chat.scrollTo({ top: chat.scrollHeight, behavior: "smooth" });
            }
            // Update isAtBottom after scroll
            const isBottom = chat.scrollHeight - (chat.scrollTop + chat.clientHeight) < 50;
            setIsAtBottom(isBottom);
        }
    }, [messages]);



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

            if (apiData.user_id) {
                localStorage.setItem('chat_user_id', apiData.user_id);
            }
            if (apiData.session_id) {
                sessionStorage.setItem('chat_session_id', apiData.session_id);
            }

            const cleanedText = cleanResponseText(apiData.response);
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
            const errorMessage = {
                id: crypto.randomUUID(),
                text: "Sorry, something went wrong.",
                sender: "bot",
            };
            setMessages((prev) => [...prev, errorMessage]);
        } finally {
            setIsProcessing(false);
            document.querySelector('input[type="text"]').focus();
        }
    };

    return (
        <div
            className={`fixed bottom-16 right-10 w-[300px] h-[450px] sm:w-[400px] sm:h-[550px] md:w-[400px] md:h-[550px] lg:w-[400px] lg:h-[550px] xl:w-[600px] xl:h-[550px] 2xl:w-[600px] 2xl:h-[550px] bg-white rounded-xl flex flex-col overflow-hidden ${className}`}
        >
            <div className="text-white bg-primary p-4 flex items-center rounded-br-xl rounded-bl-xl">
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

            {!isAtBottom && (
                <button
                    onClick={() => {
                        chatRef.current.scrollTo({
                            top: chatRef.current.scrollHeight,
                            behavior: 'smooth'
                        });
                    }}
                    className="absolute bottom-24 right-6 p-2 bg-primary text-white rounded-full shadow-lg hover:bg-primary-dark transition-colors z-50"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 14l-7 7m0 0l-7-7m7 7V3"
                        />
                    </svg>
                </button>
            )}


            <div className="shadow-lg">
                <InputBox inputRef={inputRef} onSendMessage={sendMessage} isDisabled={isProcessing} />
            </div>
        </div>
    );
};

Chatbot.propTypes = {
    className: PropTypes.string,
    messages: PropTypes.array.isRequired,
    setMessages: PropTypes.func.isRequired,
    isProcessing: PropTypes.bool.isRequired,
    setIsProcessing: PropTypes.func.isRequired,
};

export default Chatbot;
