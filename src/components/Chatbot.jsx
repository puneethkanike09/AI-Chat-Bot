import { useState, useEffect, useRef } from "react";
import { AiOutlineClose, AiOutlineRobot } from "react-icons/ai";
import Message from "./Message";
import InputBox from "./InputBox";

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { id: 1, text: "Hello! How can I assist you today?", sender: "bot" },
    ]);
    const chatContainerRef = useRef(null);

    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSendMessage = (newMessage) => {
        setMessages([
            ...messages,
            { id: messages.length + 1, text: newMessage, sender: "user" },
        ]);
    };

    return (
        <>

            <button
                onClick={() => setIsOpen(!isOpen)}
                className="fixed bottom-4 right-4 bg-gradient-to-r from-blue-600 to-blue-900 text-white p-4 rounded-full shadow-lg flex items-center justify-center transition-transform transform hover:scale-110 focus:outline-none z-50"
            >
                {isOpen ? <AiOutlineClose size={24} /> : <AiOutlineRobot size={24} />}
            </button>


            {isOpen && (
                <div className="fixed inset-0 bg-white flex flex-col z-50">

                    <div className="bg-gradient-to-r from-blue-600 to-blue-900 text-white p-6 flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            <AiOutlineRobot size={38} />
                            <span className="text-2xl font-semibold">Chatbot</span>
                        </div>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="text-white hover:text-gray-200 transition"
                        >
                            <AiOutlineClose size={30} />
                        </button>
                    </div>


                    <div
                        ref={chatContainerRef}
                        className="flex-grow overflow-y-auto p-4 bg-white"
                    >
                        {messages.map((message) => (
                            <Message
                                key={message.id}
                                text={message.text}
                                sender={message.sender}
                            />
                        ))}
                    </div>


                    <InputBox onSendMessage={handleSendMessage} />
                </div>
            )}
        </>
    );
};

export default Chatbot;
