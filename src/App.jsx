import { useState, useEffect } from "react";
import Chatbot from "./components/Chatbot";
import HomeSkeleton from "./components/HomeSkeleton";
import { MdMessage } from "react-icons/md";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import EscalationPage from './pages/EscalationPage';

const App = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [messages, setMessages] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    const userId = localStorage.getItem('chat_user_id');
    if (userId) {
      const savedMessages = localStorage.getItem(`chat_messages_${userId}`);
      if (savedMessages) {
        setMessages(JSON.parse(savedMessages));
      }
    }
  }, []);

  useEffect(() => {
    const userId = localStorage.getItem('chat_user_id');
    if (userId) {
      localStorage.setItem(`chat_messages_${userId}`, JSON.stringify(messages));
    }
  }, [messages]);

  const openChat = () => {
    const existingUserId = localStorage.getItem("chat_user_id");
    if (!existingUserId) {
      const newUserId = crypto.randomUUID();
      localStorage.setItem("chat_user_id", newUserId);
    }

    if (messages.length === 0 || messages[0].text !== "Welcome to Muliya 🙏 How can I help you today?") {
      setMessages([
        { id: crypto.randomUUID(), text: "Welcome to Muliya 🙏 How can I help you today?", sender: "bot" },
        ...messages,
      ]);
    }

    setIsChatOpen(true);
    setIsClosing(false);
  };

  return (
    <Router>
      <Routes>
        <Route path="/agent/escalation/:id" element={<EscalationPage />} />
        {/* Add other routes as needed */}
      </Routes>
      <div>
        <HomeSkeleton />
        {!isChatOpen && (
          <>
            <button
              className={`chat-button fixed bottom-5 z-10 right-5 bg-primary text-secondary rounded-full focus:outline-none transition-all duration-500 flex items-center justify-center w-12 h-12 md:w-14 md:h-14 sm:w-14 sm:h-14`}
              onClick={openChat}
              aria-label="Open Chat"
            >
              <span className="chat-button-icon block">
                <MdMessage className="md:text-2xl sm:text-xl text-xl" />
              </span>
            </button>
          </>
        )}

        <div>
          {(isChatOpen || isClosing) && (
            <Chatbot
              className={isClosing ? "chat-window closing" : "chat-window"}
              messages={messages}
              setMessages={setMessages}
              isProcessing={isProcessing}
              setIsProcessing={setIsProcessing}
              setIsChatOpen={setIsChatOpen}
              setIsClosing={setIsClosing}
            />
          )}
        </div>
      </div>
    </Router>
  );
};

export default App;
