import { useState } from "react";
import PropTypes from "prop-types";
import { IoSend } from "react-icons/io5";

const InputBox = ({ onSendMessage, isDisabled }) => {
    const [input, setInput] = useState("");
    const maxLength = 100;

    const handleSend = (e) => {
        e.preventDefault();
        if (input.trim()) {
            onSendMessage(input);
            setInput("");
        }
    };

    const handleChange = (e) => {
        if (e.target.value.length <= maxLength) {
            setInput(e.target.value);
        }
    };

    return (
        <form
            onSubmit={handleSend}
            className="flex items-center gap-3 px-4 py-3 bg-[#ab252c]"
        >
            <input
                type="text"
                className="bg-[#ab252c] flex-grow border-1 border-[#ab252c] rounded-md px-4 py-2 text-sm md:text-sm text-white focus:outline-none focus:ring-1 focus:ring-[#ab252c] placeholder-white"
                value={input}
                onChange={handleChange}
                disabled={isDisabled}
                placeholder="Type your question..."
                maxLength={maxLength}
            />
            <span className="text-white text-sm">
                {input.length}/{maxLength}
            </span>
            <button
                type="submit"
                className={`flex items-center justify-center px-4 py-2 text-white text-base rounded-md transition-all duration-300 ${isDisabled
                    ? "bg-[#ab252c] cursor-not-allowed"
                    : "bg-[#ab252c]"
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
