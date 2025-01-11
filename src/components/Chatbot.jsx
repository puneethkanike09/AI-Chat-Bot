import { useState, useEffect, useRef } from "react";
import { AiOutlineClose, AiOutlineRobot } from "react-icons/ai";
import Message from "./Message";
import InputBox from "./InputBox";

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { id: 1, text: "Hello! How can I assist you today?", sender: "bot", file: "/assets/images/download.png" },
    ]);
    const chatContainerRef = useRef(null);

    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSendMessage = (newMessage) => {
        if (newMessage.file) {
            if (newMessage.file.type.startsWith('audio/')) {
                const reader = new FileReader();
                reader.onload = () => {
                    setMessages([
                        ...messages,
                        {
                            id: messages.length + 1,
                            text: newMessage.text || "",
                            file: reader.result,
                            sender: "user",
                            type: 'audio',
                        },
                    ]);
                };
                reader.readAsDataURL(newMessage.file);
            } else if (newMessage.file.type.startsWith('image/')) {
                const reader = new FileReader();
                reader.onload = () => {
                    setMessages([
                        ...messages,
                        {
                            id: messages.length + 1,
                            text: newMessage.text || "",
                            file: reader.result,
                            sender: "user",
                            type: 'image',
                        },
                    ]);
                };
                reader.readAsDataURL(newMessage.file);
            } else {
                setMessages([
                    ...messages,
                    { id: messages.length + 1, text: newMessage.text, sender: "user" },
                ]);
            }
        } else {
            setMessages([
                ...messages,
                { id: messages.length + 1, text: newMessage.text, sender: "user" },
            ]);
        }
    };

    return (
        <>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="fixed bottom-4 right-4 bg-[#ab252c] text-white p-4 rounded-full shadow-lg flex items-center justify-center transition-transform transform hover:scale-110 focus:outline-none z-50"
            >
                {isOpen ? <AiOutlineClose size={24} /> : <AiOutlineRobot size={24} />}
            </button>

            {isOpen && (
                <div className="fixed inset-0 flex flex-col z-50 animate-fade-in-down">
                    <div className="text-[#ab252c] p-5 pl-6 md:pl-44 pr-6 md:pr-44 flex items-center justify-between shadow-lg">
                        <div className="flex items-center space-x-4">
                            <AiOutlineRobot size={38} />
                            <span className="text-2xl font-bold tracking-wide">Muliya</span>
                        </div>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="text-[#ab252c] hover:text-gray-300 transition transform hover:scale-110"
                        >
                            <AiOutlineClose size={30} />
                        </button>
                    </div>

                    <div
                        ref={chatContainerRef}
                        className="flex-grow overflow-y-auto p-6 bg-white shadow-inner rounded-lg space-y-4"
                    >
                        {messages.map((message) => (
                            <Message
                                key={message.id}
                                text={message.text}
                                sender={message.sender}
                                file={message.file}
                                type={message.type}
                            />
                        ))}
                    </div>

                    <div className="bg-gradient-to-r from-gray-50 to-gray-100 shadow-md">
                        <InputBox onSendMessage={handleSendMessage} />
                    </div>
                </div>
            )}
        </>
    );
};

export default Chatbot;