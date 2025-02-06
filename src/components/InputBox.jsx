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

    const handleInput = (e) => {
        const value = e.target.value;
        if (value.length <= maxLength) {
            setInput(value);
        }
    };

    return (
        <div className="flex flex-col w-full">
            <form
                onSubmit={handleSend}
                className="flex items-center gap-3 px-4 py-3 rounded-tl-xl rounded-tr-xl bg-[#ab252c]"
            >
                <div className="flex-grow relative">
                    <input
                        type="text"
                        className="w-full bg-[#ab252c] px-4 pr-16 py-2 text-sm text-[#f9eded] focus:outline-none focus:ring-1 focus:ring-[#ab252c] placeholder-white"
                        value={input}
                        onChange={handleInput}
                        disabled={isDisabled}
                        placeholder="Type your text..."
                        maxLength={maxLength}
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#f9eded]/80 bg-[#ab252c] px-1">
                        {input.length}/{maxLength}
                    </div>
                </div>
                <button
                    type="submit"
                    className={`flex items-center justify-center px-4 py-2 text-[#f9eded] text-base rounded-md transition-all duration-300 ${isDisabled ? "bg-[#ab252c] cursor-not-allowed" : "bg-[#ab252c]"
                        }`}
                    disabled={isDisabled}
                >
                    <IoSend size={20} />
                </button>
            </form>
        </div>
    );
};

InputBox.propTypes = {
    onSendMessage: PropTypes.func.isRequired,
    isDisabled: PropTypes.bool.isRequired,
};

export default InputBox;
