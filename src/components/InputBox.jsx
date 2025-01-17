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
            className="flex items-center gap-3 px-4 py-3 bg-[#ab252c] shadow-md"
        >
            <input
                type="text"
                className="bg-[#ab252c] flex-grow border-1 border-[#ab252c] rounded-md px-4 py-2 text-sm md:text-sm text-white focus:outline-none focus:ring-1 focus:ring-[#ab252c] placeholder-white"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={isDisabled}
                placeholder="Type your question..."
            />
            <button
                type="submit"
                className={`flex items-center justify-center px-4 py-2 text-white text-base rounded-md transition-all duration-300 ${isDisabled
                    ? "bg-[#ab252c] cursor-not-allowed"
                    : "bg-[#ab252c] "
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