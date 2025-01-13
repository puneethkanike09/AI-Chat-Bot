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
            className="flex items-center justify-center gap-4 px-8 md:px-[180px] pb-8 md:pb-16 bg-white p-6 rounded-lg shadow-lg"
        >
            <input
                type="text"
                className="w-full border-2 border-[#ab252c] rounded-lg px-4 py-3 text-sm md:text-lg focus:outline-none focus:ring-1 focus:ring-[#ab252c] focus:border-[#ab252c] placeholder:text-[#ab252c]"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={isDisabled}
                placeholder="Type your message..."
            />
            <button
                type="submit"
                className={`p-4 bg-[#ab252c] text-white rounded-lg flex items-center justify-center transition-all duration-500 transform  ${isDisabled ? "opacity-50 cursor-not-allowed" : "hover:bg-red-600"}`}
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
