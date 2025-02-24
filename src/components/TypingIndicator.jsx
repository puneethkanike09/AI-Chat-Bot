
import { useState, useEffect } from 'react';
import { facts } from '../data/typingData';
import { waitingMessages } from '../data/typingData';

const TypingIndicator = () => {
    const [currentMessage, setCurrentMessage] = useState('');
    const [showFact, setShowFact] = useState(true);
    const [isTransitioning, setIsTransitioning] = useState(false);


    const shuffle = (array) => {
        return array[Math.floor(Math.random() * array.length)];
    };

    useEffect(() => {
        setCurrentMessage(shuffle(facts));

        const interval = setInterval(() => {
            setIsTransitioning(true);

            setTimeout(() => {
                const nextMessages = showFact ? waitingMessages : facts;
                setCurrentMessage(shuffle(nextMessages));
                setShowFact(!showFact);
                setIsTransitioning(false);
            }, 300);
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flex flex-col space-y-2">
            {/* Message container with dynamic height */}
            <div className="max-w-md">
                <div
                    className={`text-sm text-gray-600 transition-all duration-300 ease-in-out ${isTransitioning
                        ? 'opacity-0 transform -translate-y-2'
                        : 'opacity-100 transform translate-y-0'
                        }`}
                >
                    {currentMessage}
                </div>
            </div>

            {/* Typing indicator */}
            <div className="flex">
                <img
                    src="https://muliya.in/wp-content/uploads/2020/01/Muliya-Jewels-Favicon.png"
                    alt="Muliya Icon"
                    className="w-6 h-6 rounded-full mr-1"
                />
                <div className="inline-flex items-center space-x-1 p-2 text-sm bg-white rounded-br-3xl rounded-bl-3xl rounded-tr-3xl w-fit">
                    <div className="w-2 h-2 bg-primary rounded-full bounce-1"></div>
                    <div className="w-2 h-2 bg-primary rounded-full bounce-2"></div>
                    <div className="w-2 h-2 bg-primary rounded-full bounce-3"></div>
                </div>
            </div>
        </div>
    );
};

export default TypingIndicator;