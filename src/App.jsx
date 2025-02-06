import { useState, useEffect } from "react";
import Chatbot from "./components/Chatbot";
import { AiOutlineClose } from "react-icons/ai";
import { MdMessage } from "react-icons/md";

const App = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [messages, setMessages] = useState([]); // Start with empty messages

  useEffect(() => {
    // Clear session on page refresh
    sessionStorage.removeItem("chat_user_id");
  }, []);

  const toggleChat = () => {
    if (isChatOpen) {
      // Closing the chat
      setIsClosing(true);
      setIsChatOpen(false);
      setTimeout(() => {
        setIsClosing(false);
      }, 500);
    } else {
      // Open chat only if no session exists
      let existingUserId = sessionStorage.getItem("chat_user_id");
      if (!existingUserId) {
        const newUserId = crypto.randomUUID();
        sessionStorage.setItem("chat_user_id", newUserId);
        setMessages([
          { id: 1, text: "Hello! How can I assist you today?", sender: "bot" },
        ]);
      }
      setIsChatOpen(true);
      setIsClosing(false);
    }
  };

  return (
    <div>
      <button
        className={`chat-button fixed bottom-5 z-10 right-5 bg-[#ab252c] text-[#f9eded] rounded-full border-[2.5px] border-white focus:outline-none transition-all duration-500 w-14 h-14 flex items-center justify-center ${isChatOpen ? "opened" : ""
          }`}
        onClick={toggleChat}
        aria-label={isChatOpen ? "Close Chat" : "Open Chat"}
      >
        <span
          className={`chat-button-icon block ${isChatOpen ? "open" : "closed"
            }`}
        >
          {isChatOpen ? <AiOutlineClose size={20} /> : <MdMessage size={24} />}
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
