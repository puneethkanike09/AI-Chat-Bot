import { useState } from "react";
import Chatbot from "./components/Chatbot";
import { AiOutlineRobot, AiOutlineClose } from "react-icons/ai";

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
        className="fixed bottom-5 z-10 right-5 bg-[#ab252c] text-white rounded-full focus:outline-none transition-all duration-500 border-[3px] border-white w-14 h-14 flex items-center justify-center"
        onClick={toggleChat}
        aria-label={isChatOpen ? "Close Chat" : "Open Chat"}
      >
        <span
          className={`block transform transition-transform duration-500 ${isChatOpen ? "rotate-90" : "rotate-0"
            }`}
        >
          {isChatOpen ? (
            <AiOutlineClose size={20} />
          ) : (
            <AiOutlineRobot size={24} />
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
