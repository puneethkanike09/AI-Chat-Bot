
import { useState } from "react";
import Chatbot from "./components/Chatbot";
import { AiOutlineRobot, AiOutlineClose } from "react-icons/ai";

const App = () => {

  const [isChatOpen, setIsChatOpen] = useState(false);
  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  return (

    <div>
      <button
        className="fixed bottom-5 z-10 right-5 bg-[#ab252c] hover:bg-red-600 text-white p-4 rounded-full shadow-lg focus:outline-none transition-all duration-500"
        onClick={toggleChat}
        aria-label={isChatOpen ? "Close Chat" : "Open Chat"}
      >
        {isChatOpen ? <AiOutlineClose size={24} /> : <AiOutlineRobot size={24} />}
      </button>

      <div>
        {isChatOpen && <Chatbot />}
      </div>
    </div>
  )
};

export default App;
