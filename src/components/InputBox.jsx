import { useState } from "react";
import PropTypes from "prop-types";
import { IoSend } from "react-icons/io5";

const InputBox = ({ onSendMessage, isDisabled }) => {
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
            className="flex items-center gap-3 px-4 py-3 bg-gray-100 border-t border-gray-300 shadow-md"
        >
            {/* Input field */}
            <input
                type="text"
                className="flex-grow border border-gray-300 rounded-md px-4 py-2 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-[#ab252c] placeholder-gray-500"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={isDisabled}
                placeholder="Type your message..."
            />
            {/* Send button */}
            <button
                type="submit"
                className={`flex items-center justify-center px-4 py-2 text-white text-base rounded-md transition-all duration-300 ${isDisabled
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-[#ab252c] hover:bg-red-600"
                    }`}
                disabled={isDisabled}
            >
                <IoSend size={20} />
            </button>



        </form>
    );
};

InputBox.propTypes = {
    onSendMessage: PropTypes.func.isRequired,
    isDisabled: PropTypes.bool.isRequired,
};

export default InputBox;
