import { useState } from "react";
import PropTypes from "prop-types";

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
            className="flex items-center bg-gray-100 p-3 border-t rounded-b-lg"
        >
            <input
                type="text"
                className="flex-grow border rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-950"
                placeholder="Type your message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                style={{ wordBreak: "break-word" }}
            />
            <button
                type="submit"
                className="ml-2 font-bold font-mono bg-blue-950 text-white px-4 py-2 rounded-full text-sm hover:bg-blue-900"
            >
                Send
            </button>
        </form>
    );
};

InputBox.propTypes = {
    onSendMessage: PropTypes.func.isRequired,
};

export default InputBox;
