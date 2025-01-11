import { useState } from "react";
import PropTypes from "prop-types";
import { IoSend } from "react-icons/io5";

const InputBox = ({ onSendMessage }) => {
    const [input, setInput] = useState("");

    const handleSend = (e) => {
        e.preventDefault();
        if (input.trim()) {
            onSendMessage(input);
            setInput("");
        }
    };

    return (
        <form
            onSubmit={handleSend}
            className="flex items-center justify-center bg-white p-4 space-x-3 sm:space-x-4"
        >
            <input
                type="text"
                className="w-full sm:w-3/4 lg:w-2/3 border border-gray-300 rounded-full px-4 sm:px-6 py-2 sm:py-4 text-sm sm:text-base lg:text-xl focus:outline-none placeholder-gray-400"
                placeholder="Type your message here..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                style={{
                    wordBreak: "break-word",
                }}
            />
            <button
                type="submit"
                className="p-3 sm:p-4 bg-gradient-to-r from-blue-600 to-blue-900 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition-all duration-500 hover:scale-105"
            >
                <IoSend size={24} />
            </button>
        </form>
    );
};

InputBox.propTypes = {
    onSendMessage: PropTypes.func.isRequired,
};

export default InputBox;
