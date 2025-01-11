import { useState, useEffect, useRef } from "react";
import { AiOutlineClose, AiOutlineRobot } from "react-icons/ai";
import { BiChat } from "react-icons/bi";
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
        setMessages([...messages, { id: messages.length + 1, text: newMessage, sender: "user" }]);
    };

    return (
        <>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="fixed bottom-4 right-4 bg-blue-950 text-white p-4 rounded-full shadow-lg flex items-center justify-center transition-all duration-500  hover:bg-blue-900"
            >
                <BiChat size={24} />
            </button>
            {isOpen && (
                <div
                    className="fixed bottom-16 right-4 w-80 h-96 bg-white shadow-lg rounded-lg flex flex-col"
                    style={{ zIndex: 1000 }}
                >
                    <div className="bg-blue-950 text-white p-3 flex items-center justify-between rounded-t-lg">
                        <div className="flex items-center space-x-2">
                            <AiOutlineRobot size={24} className="text-white" />
                            <span className="text-lg font-semibold font-mono ">Chatbot</span>
                        </div>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="text-white hover:text-gray-200"
                        >
                            <AiOutlineClose size={20} className="hover:scale-[1.1] transition-all duration-300" />
                        </button>
                    </div>
                    <div
                        ref={chatContainerRef}
                        className="flex-grow overflow-y-auto p-3 bg-gray-50"
                    >
                        {messages.map((message) => (
                            <Message key={message.id} text={message.text} sender={message.sender} />
                        ))}
                    </div>
                    <InputBox onSendMessage={handleSendMessage} />
                </div>
            )}
        </>
    );
};

export default Chatbot;
