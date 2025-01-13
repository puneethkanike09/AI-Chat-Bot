import { useState } from "react";
import { AiOutlineRobot, AiOutlineClose } from "react-icons/ai";
import Chatbot from "./components/Chatbot";

const App = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  return (
    <div className="relative">
      {/* Chatbot Toggle Button */}
      <button
        className="fixed bottom-5 z-10 right-5 bg-[#ab252c] hover:bg-red-600 text-white p-4 rounded-full shadow-lg focus:outline-none transition-all duration-500"
        onClick={toggleChat}
        aria-label={isChatOpen ? "Close Chat" : "Open Chat"}
      >
        {isChatOpen ? <AiOutlineClose size={24} /> : <AiOutlineRobot size={24} />}
      </button>

      {/* Chatbot Component */}
      <div
        className={`fixed bottom-16 right-5 transition-all duration-500 ${isChatOpen ? "opacity-100 scale-100" : "opacity-0 scale-0"
          }`}
        style={{ visibility: isChatOpen ? "visible" : "hidden" }}
      >
        {isChatOpen && <Chatbot />}
      </div>
    </div>
  );
};

export default App;
