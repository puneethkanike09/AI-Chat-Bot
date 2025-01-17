import PropTypes from "prop-types";

const Message = ({ text, sender }) => {
    const isBot = sender === "bot";

    return (
        <div
            className={`flex ${isBot ? "justify-start" : "justify-end"} mb-2 message ${isBot ? "message-bot" : "message-user"
                }`}
        >
            <div
                className={`px-4 py-2 max-w-[75%] text-sm rounded-lg shadow-md transition-all duration-300 hover:scale-[1.02] ${isBot
                    ? "bg-[#ab252c] text-white hover:shadow-[#ab252c]/20"
                    : "bg-gray-200 text-gray-900 hover:shadow-gray-400/20"
                    }`}
            >
                {text}
            </div>
        </div>
    );
};

Message.propTypes = {
    text: PropTypes.string.isRequired,
    sender: PropTypes.oneOf(["bot", "user"]).isRequired,
};

export default Message;