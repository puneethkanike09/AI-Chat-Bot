import { useState, useEffect, useRef } from "react";
// import { AiOutlineRobot } from "react-icons/ai";
import Message from "./Message";
import InputBox from "./InputBox";


const Chatbot = () => {
    const [messages, setMessages] = useState([
        { id: 1, text: "Hello! How can I assist you today?", sender: "bot" },
    ]);
    const [isProcessing, setIsProcessing] = useState(false);
    const chatContainerRef = useRef(null);
    const sendSoundRef = useRef(null);
    const receiveSoundRef = useRef(null);

    const backendUrl = import.meta.env.VITE_BACKEND_URL;


    useEffect(() => {

        sendSoundRef.current = new Audio('/assets/sounds/send.mp3');
        receiveSoundRef.current = new Audio('/assets/sounds/receive.mp3');


        const preloadAudio = async () => {
            try {
                sendSoundRef.current.load();
                receiveSoundRef.current.load();


                sendSoundRef.current.volume = 0.5;
                receiveSoundRef.current.volume = 0.5;


                await Promise.all([
                    sendSoundRef.current.play().then(() => sendSoundRef.current.pause()),
                    receiveSoundRef.current.play().then(() => receiveSoundRef.current.pause())
                ]);


                sendSoundRef.current.currentTime = 0;
                receiveSoundRef.current.currentTime = 0;
            } catch (error) {
                console.log("Audio preload error:", error);
            }
        };

        preloadAudio();


        return () => {
            if (sendSoundRef.current) {
                sendSoundRef.current.pause();
                sendSoundRef.current = null;
            }
            if (receiveSoundRef.current) {
                receiveSoundRef.current.pause();
                receiveSoundRef.current = null;
            }
        };
    }, []);


    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [messages]);


    const playSound = async (soundRef) => {
        try {
            if (soundRef.current) {
                soundRef.current.currentTime = 0; // Reset to start
                await soundRef.current.play();
            }
        } catch (error) {
            console.log("Sound playback error:", error);
        }
    };

    const handleSendMessage = async (userMessageText) => {
        const userMessage = {
            id: crypto.randomUUID(),
            text: userMessageText,
            sender: "user",
        };

        setMessages(prev => [...prev, userMessage]);
        await playSound(sendSoundRef);
        setIsProcessing(true);

        try {

            const response = await fetch(`${backendUrl}/chat/?prompt=${encodeURIComponent(userMessageText)}`);

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();

            const botMessage = {
                id: crypto.randomUUID(),
                text: data.reply || "I'm still learning, but I'll improve!",
                sender: "bot",
            };

            setMessages(prev => [...prev, botMessage]);
            await playSound(receiveSoundRef);
        } catch (error) {
            console.error("Chat error:", error);
            const errorMessage = {
                id: crypto.randomUUID(),
                text: "Sorry, I'm having trouble processing your request right now.",
                sender: "bot",
            };
            setMessages(prev => [...prev, errorMessage]);
            await playSound(receiveSoundRef);
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <div className="fixed bottom-16 right-10 w-[300px] h-[450px] sm:w-[400px] sm:h-[600px] bg-white shadow-lg rounded-lg flex flex-col overflow-hidden border-[#ab252c] animate-fade-in">
            {/* Header */}
            <div className="text-white bg-[#ab252c] p-4 flex items-center shadow-lg">
                <div className="flex items-center space-x-2">
                    {/* <img className="w-16 " src="../../public/assets/images/images.jpg" alt="" /> */}
                    {/* <AiOutlineRobot size={30} /> */}
                    {/* <span className="text-lg font-bold tracking-wide">Muliya</span> */}
                    <img className="w-16 " src="../assets/images/images.jpg" alt="" />
                </div>
            </div>

            {/* Messages */}
            <div
                ref={chatContainerRef}
                className="flex-grow overflow-y-auto p-4 bg-white space-y-2 custom-scrollbar"
            >
                {messages.map((message) => (
                    <Message
                        key={message.id}
                        text={message.text}
                        sender={message.sender}
                    />
                ))}
            </div>

            {/* Input Box */}
            <div className="bg-gradient-to-r from-gray-50 to-gray-100 shadow-md">
                <InputBox onSendMessage={handleSendMessage} isDisabled={isProcessing} />
            </div>
        </div>
    );
};

export default Chatbot;