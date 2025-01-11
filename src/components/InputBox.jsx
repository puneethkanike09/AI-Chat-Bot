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
            className="flex items-center justify-center bg-white p-4 border-t space-x-4"
        >
            <input
                type="text"
                className="w-3/4 lg:w-2/3 border rounded-full px-6 py-4 text-lg focus:outline-none  font-mono"
                placeholder="Type your message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                style={{ wordBreak: "break-word" }}
            />
            <button
                type="submit"
                className="p-5 bg-blue-white text-blue-950 rounded-full  transition-all duration-500 flex items-center justify-center"
            >
                <IoSend size={28} />
            </button>
        </form>
    );
};

InputBox.propTypes = {
    onSendMessage: PropTypes.func.isRequired,
};

export default InputBox;
