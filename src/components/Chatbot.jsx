import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import Message from "./Message";
import InputBox from "./InputBox";
import TypingIndicator from "./TypingIndicator";
import { FaChevronDown, FaTimes } from "react-icons/fa";

const Chatbot = ({ className = "chat-window", messages, setMessages, isProcessing, setIsProcessing, setIsChatOpen, setIsClosing }) => {
    const chatRef = useRef(null);
    const inputRef = useRef(null);
    const [isAtBottom, setIsAtBottom] = useState(true);
    const [isMobile, setIsMobile] = useState(false);

    const scrollToBottom = (behavior = 'smooth') => {
        if (chatRef.current) {
            chatRef.current.scrollTo({
                top: chatRef.current.scrollHeight,
                behavior
            });
        }
    };

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

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
        if (!chatRef.current) return;

        const lastMessage = messages[messages.length - 1];
        if (lastMessage?.sender === "bot") {
            const messageElements = chatRef.current.querySelectorAll('[data-sender]');
            if (messageElements.length > 0) {
                const lastElement = messageElements[messageElements.length - 1];
                if (lastElement.dataset.sender === "bot") {
                    lastElement.scrollIntoView({ block: "start", behavior: "smooth" });
                    inputRef.current?.focus();
                }
            }
        } else {
            scrollToBottom();
        }
    }, [messages]);

    // New effect to handle typing indicator visibility
    useEffect(() => {
        if (isProcessing) {
            scrollToBottom();
        }
    }, [isProcessing]);

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

    const closeChat = () => {
        setIsClosing(true);
        setIsChatOpen(false);
        setTimeout(() => setIsClosing(false), 500);
    };

    return (
        <div
            className={`fixed bottom-0 right-0 md:bottom-5 md:right-5 w-full h-full sm:w-[400px] sm:h-[550px] md:w-[600px] md:h-[550px] lg:w-[600px] lg:h-[550px] xl:w-[600px] xl:h-[550px] 2xl:w-[600px] 2xl:h-[550px] bg-secondary rounded-xl flex flex-col overflow-hidden ${className} ${isMobile ? 'mobile-chat' : ''}`}
        >
            <div className="text-white bg-primary p-4 flex items-center justify-between rounded-br-xl rounded-bl-xl">
                <div className="flex items-center space-x-2">
                    <img
                        className="w-16"
                        src="../assets/images/images.jpg"
                        alt="Chatbot Logo"
                    />
                </div>
                <button
                    onClick={closeChat}
                    className="text-white text-xl"
                >
                    <FaTimes />
                </button>
            </div>

            <div ref={chatRef} className="flex-grow overflow-y-auto p-4 space-y-2 custom-scrollbar">
                {messages.map((message) => (
                    <Message key={message.id} message={message} />
                ))}
                {isProcessing && <TypingIndicator onAppear={scrollToBottom} />}
            </div>

            {!isAtBottom && (
                <button
                    onClick={() => scrollToBottom()}
                    className="absolute bottom-24 right-6 p-2 bg-white text-primary rounded-full animate-pulse transition-all duration-500 z-50"
                >
                    <FaChevronDown />
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
    setIsChatOpen: PropTypes.func.isRequired,
    setIsClosing: PropTypes.func.isRequired,
};

export default Chatbot;