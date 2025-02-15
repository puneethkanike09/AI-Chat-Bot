import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { funFacts, processingMessages } from "../data/typingData";

const TypingIndicator = ({ onAppear }) => {
    const [currentQuote, setCurrentQuote] = useState('');
    const [processingMessage, setProcessingMessage] = useState('');
    const [showProcessing, setShowProcessing] = useState(false);

    const getRandomFact = () => funFacts[Math.floor(Math.random() * funFacts.length)];
    const getRandomProcessingMessage = () => processingMessages[Math.floor(Math.random() * processingMessages.length)];

    useEffect(() => {
        setCurrentQuote(getRandomFact());
        setProcessingMessage(getRandomProcessingMessage());
        // Trigger scroll when component mounts
        onAppear?.();

        const processingInterval = setInterval(() => {
            setShowProcessing(true);

            setTimeout(() => {
                setShowProcessing(false);
                setCurrentQuote(getRandomFact());
                setProcessingMessage(getRandomProcessingMessage());
            }, 10000);
        }, 10000);

        return () => {
            clearInterval(processingInterval);
        };
    }, [onAppear]);

    return (
        <div className="flex flex-col items-start typing-indicator-container rounded-br-3xl rounded-bl-3xl rounded-tr-3xl">
            <div className="text-gray-500 text-sm italic">
                {showProcessing ? processingMessage : currentQuote}
            </div>
            <div className="px-2 py-2 rounded-full w-fit typing-indicator">
                <div className="typing-circle"></div>
                <div className="typing-circle"></div>
                <div className="typing-circle"></div>
            </div>
        </div>
    );
};

TypingIndicator.propTypes = {
    onAppear: PropTypes.func
};

TypingIndicator.defaultProps = {
    onAppear: () => { }
};

export default TypingIndicator;