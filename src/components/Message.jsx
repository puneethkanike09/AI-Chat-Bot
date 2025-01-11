import PropTypes from "prop-types";

const Message = ({ text, sender }) => {
    const isBot = sender === "bot";

    return (
        <div
            className={`flex ${isBot ? "justify-start" : "justify-end"
                } mb-4`}
        >
            <div
                className={`max-w-xs px-4 py-2 rounded-lg shadow-md ${isBot
                    ? "bg-blue-900 text-white font-mono "
                    : "bg-gray-200 text-black font-mono "
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
