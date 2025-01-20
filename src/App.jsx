import { useState } from "react";
import Chatbot from "./components/Chatbot";
import { AiOutlineClose } from "react-icons/ai";
import { MdMessage } from "react-icons/md";

const App = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello! How can I assist you today?", sender: "bot" },
  ]);

  const toggleChat = () => {
    if (isChatOpen) {
      setIsClosing(true);
      setIsChatOpen(false);
      setTimeout(() => {
        setIsClosing(false);
      }, 500);
    } else {
      setIsChatOpen(true);
      setIsClosing(false);
    }
  };

  return (
    <div>
      <button
        className={`chat-button fixed bottom-5 z-10 right-5 bg-[#ab252c] text-white rounded-full focus:outline-none transition-all duration-500  w-14 h-14 flex items-center justify-center ${isChatOpen ? 'opened' : ''}`}
        onClick={toggleChat}
        aria-label={isChatOpen ? "Close Chat" : "Open Chat"}
      >
        <span
          className={`chat-button-icon block ${isChatOpen ? "open" : "closed"}`}
        >
          {isChatOpen ? (
            <AiOutlineClose size={20} />
          ) : (
            <MdMessage size={24} />
          )}
        </span>
      </button>

      <div>
        {(isChatOpen || isClosing) && (
          <Chatbot
            className={isClosing ? "chat-window closing" : "chat-window"}
            messages={messages}
            setMessages={setMessages}
          />
        )}
      </div>
    </div>
  );
};

export default App;
