import PropTypes from "prop-types";

const Message = ({ text, sender }) => {
    const isBot = sender === "bot";

    return (
        <div
            className={`flex ${isBot ? "justify-start" : "justify-end"} mb-2 message ${isBot ? "message-bot" : "message-user"
                }`}
        >
            <div
                className={`px-4 py-2 max-w-[75%] text-sm  ${isBot
                    ? "bg-[#ab252c] text-[#ffffff] rounded-br-3xl rounded-tl-3xl rounded-tr-3xl  border-2 border-[#ab252c] "
                    : "bg-gray-200 text-gray-900 rounded-bl-3xl rounded-tl-3xl rounded-tr-3xl"
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