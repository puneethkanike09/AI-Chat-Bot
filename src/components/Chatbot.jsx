import { useState } from 'react';

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState('');

    return (
        <div className="fixed bottom-4 right-4 z-50">
            {/* Chat Window */}
            {isOpen && (
                <div className="bg-white rounded-lg shadow-xl w-80 h-96 mb-4 flex flex-col">
                    {/* Header */}
                    <div className="bg-white rounded-t-lg p-4 border-b">
                        <div className="flex items-center gap-2">
                            <div className="bg-red-600 p-2 rounded">
                                <div className="text-white text-xl">Muliya</div>
                            </div>
                            <span className="text-red-600 font-semibold">Muliya</span>
                        </div>
                    </div>

                    {/* Chat Messages */}
                    <div className="flex-1 p-4 overflow-y-auto">
                        <div className="bg-red-600 text-white p-3 rounded-lg max-w-[80%] inline-block">
                            Hello! How can I assist you today?
                        </div>
                    </div>

                    {/* Input Area */}
                    <div className="p-4 border-t">
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                placeholder="Type your message..."
                                className="flex-1 p-2 border rounded-md focus:outline-none focus:border-red-600"
                            />
                            <button
                                className="bg-red-600 text-white p-2 rounded-md hover:bg-red-700 transition-colors"
                            >
                                ➤
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Floating Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="bg-red-600 text-white w-12 h-12 rounded-full shadow-lg flex items-center justify-center hover:bg-red-700 transition-colors"
            >
                {isOpen ? '✕' : '💬'}
            </button>
        </div>
    );
};

export default Chatbot;