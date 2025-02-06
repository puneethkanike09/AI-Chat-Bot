import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import Message from "./Message";
import InputBox from "./InputBox";

// Simulate an API call that returns the response object after a delay.
const simulateApiResponse = (userText) => {
    // In a real application, you’d use fetch/axios here.
    return new Promise((resolve) => {
        setTimeout(() => {
            // Sample API response (could be dynamically generated based on userText)
            resolve({
                response:
                    "<think>\nOkay, the user asked, \"Today gold price.\" I need to respond with the current rate. ...\n</think>\n\nHello! Today's gold rate is ₹7905.0 per gram. How can I assist you with our beautiful jewelry collection today?\n\nHere are two stunning pieces you might love:\n\n1. **18KT 38GM ROSEGOLD NECKLACE**\n   - Category: Necklace Stone\n   - Weight: 37.43g\n   - Price: ₹0.00\n   - Image: [Rose Gold Necklace](https://sourcecatalogmuliya.s3.amazonaws.com/muliya_167671084452207382111129.JPG)\n   - A elegant rose gold necklace with a delicate design, perfect for everyday wear.\n\n2. **20GM ROSE GOLD CHAIN**\n   - Category: Chains\n   - Weight: 21.53g\n   - Price: ₹0.00\n   - Image: [Rose Gold Chain](https://sourcecatalogmuliya.s3.amazonaws.com/muliya_1657701753419141480135.JPG)\n   - A sleek and stylish rose gold chain, ideal for gifting or self-use.\n\nWe also have a special offer for first-time buyers: zero making charges on gold jewelry and a free gold coin on purchases above ₹100,000!\n\nWould you like to explore more or visit our store?",
                user_id: "user_38",
                session_id: "f2b026f4-4582-4269-9dcc-d0de6de4789a",
                suggested_products: [
                    {
                        id: 5686,
                        name: "18KT 38GM ROSEGOLD NECKLACE",
                        branch: "belthangady",
                        group: "NECKLACE STONE",
                        gross_weight: "37.43",
                        net_weight: "33.43",
                        stone_weight: "4",
                        stone_type: "white",
                        calculated_price: 0,
                        photo:
                            "https://sourcecatalogmuliya.s3.amazonaws.com/muliya_167671084452207382111129.JPG",
                        hd_photo:
                            "https://sourcecatalogmuliya.s3.amazonaws.com/muliya_167671084452207382111129.JPG",
                        tags:
                            "18 Kt, Ladies, Bombay, Rose Gold, Handmade, Machine Made, Solid, Occassional Wear, White AD, Stone, Necklace, Chokar, Adjustable Ring, U Necklace, Neck Jewels, Broad Necklace",
                    },
                    {
                        id: 6986,
                        name: "20GM ROSE GOLD CHAIN",
                        branch: "puttur",
                        group: "CHAINS",
                        gross_weight: "21.53",
                        net_weight: "21.53",
                        stone_weight: "0",
                        stone_type: "-",
                        calculated_price: 0,
                        photo:
                            "https://sourcecatalogmuliya.s3.amazonaws.com/muliya_1657701753419141480135.JPG",
                        hd_photo:
                            "https://sourcecatalogmuliya.s3.amazonaws.com/muliya_1657701753419141480135.JPG",
                        tags:
                            "22 Kt, Gents, Ladies, Kids, Bombay, Casting, Machine Made, Solid, Occassional Wear, Chain, Plain , Rhodium Colour, Neck Jewels, Light Weight, Fancy Chain",
                    },
                ],
                relevant_promotions: [
                    {
                        id: "FIRSTTIME",
                        title: "First-Time Buyer Special",
                        description:
                            "Zero making charges on gold jewelry for first-time customers. Free gold coin on purchases above ₹100,000.",
                        validity: "Ongoing",
                        terms: "Valid ID proof required for first-time verification",
                        type: "regular",
                    },
                    {
                        id: "GOLDCLUB",
                        title: "Gold Club Member Benefits",
                        description:
                            "Exclusive 10% discount on making charges, free jewelry insurance for 1 year, priority customer service",
                        validity: "Annual membership benefits",
                        terms: "Available for Gold Club members only. Annual membership fee applies.",
                        type: "membership",
                    },
                ],
            });
        }, 2000); // simulate 2 seconds delay
    });
};

const Chatbot = ({ className = "chat-window", messages, setMessages }) => {
    const [isProcessing, setIsProcessing] = useState(false);
    const chatRef = useRef(null);

    // Auto-scroll the chat view when messages change.
    useEffect(() => {
        const chat = chatRef.current;
        if (chat) {
            chat.scrollTop = chat.scrollHeight;
        }
    }, [messages]);

    // Remove content inside <think>...</think>
    // Chatbot.jsx
    const cleanResponseText = (text) => {
        // Remove think block
        let cleaned = text.replace(/<think>[\s\S]*?<\/think>/, "");

        // Convert "Image: [text](url)" to "![text](url)"
        cleaned = cleaned.replace(
            /Image: \[(.*?)\]\((.*?)\)/g,
            "![$1]($2)"
        );

        return cleaned.trim();
    };

    const sendMessage = async (text) => {
        // Append the user's message.
        const newUserMessage = {
            id: crypto.randomUUID(),
            text,
            sender: "user",
        };
        setMessages((prev) => [...prev, newUserMessage]);
        setIsProcessing(true);

        try {
            // Simulate API call
            const apiData = await simulateApiResponse(text);

            // Process the API response: remove <think> block.
            const cleanedText = cleanResponseText(apiData.response);

            // Create bot message object including extra data.
            const newBotMessage = {
                id: crypto.randomUUID(),
                text: cleanedText,
                sender: "bot",
                suggested_products: apiData.suggested_products,
                promotions: apiData.relevant_promotions,
            };

            setMessages((prev) => [...prev, newBotMessage]);
        } catch (error) {
            console.error("API Error:", error);
            // Optionally add an error message from the bot.
            const errorMessage = {
                id: crypto.randomUUID(),
                text: "Sorry, something went wrong.",
                sender: "bot",
            };
            setMessages((prev) => [...prev, errorMessage]);
        } finally {
            setIsProcessing(false);
        }
    };

    // A simple typing indicator component.
    const TypingIndicator = () => (
        <div className="flex justify-start mb-2">
            <div className="typing-indicator">
                <div className="typing-circle"></div>
                <div className="typing-circle"></div>
                <div className="typing-circle"></div>
            </div>
        </div>
    );

    return (
        <div
            className={`fixed bottom-16 right-10 w-[300px] h-[450px] sm:w-[400px] sm:h-[600px] bg-white rounded-xl flex flex-col overflow-hidden ${className}`}
        >
            <div className="text-white bg-[#AF1614] p-4 flex items-center rounded-br-xl rounded-bl-xl">
                <div className="flex items-center space-x-2">
                    <img
                        className="w-16"
                        src="../assets/images/images.jpg"
                        alt="Chatbot Logo"
                    />
                </div>
            </div>

            <div ref={chatRef} className="flex-grow overflow-y-auto p-4 space-y-2 custom-scrollbar">
                {messages.map((message) => (
                    <Message key={message.id} message={message} />
                ))}
                {isProcessing && <TypingIndicator />}
            </div>

            <div className="shadow-lg">
                <InputBox onSendMessage={sendMessage} isDisabled={isProcessing} />
            </div>
        </div>
    );
};

Chatbot.propTypes = {
    className: PropTypes.string,
    messages: PropTypes.array.isRequired,
    setMessages: PropTypes.func.isRequired,
};

export default Chatbot;
