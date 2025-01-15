import { useState } from "react";
import Chatbot from "./components/Chatbot";
import { AiOutlineRobot, AiOutlineClose } from "react-icons/ai";

const App = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const toggleChat = () => {
    if (isChatOpen) {
      // Start closing animation
      setIsClosing(true);
      // Change icon immediately
      setIsChatOpen(false);
      // Remove chat window after animation completes
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
        className="fixed bottom-5 z-10 right-5 bg-[#ab252c]  text-white rounded-full focus:outline-none transition-all duration-500 border-[3px] border-white w-14 h-14 flex items-center justify-center"
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
          <Chatbot className={isClosing ? 'chat-window closing' : 'chat-window'} />
        )}
      </div>
    </div>
  );
};

export default App;