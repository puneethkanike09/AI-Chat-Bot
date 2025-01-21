import PropTypes from "prop-types";

const Message = ({ text, sender }) => {
    const isBot = sender === "bot";

    return (
        <div
            className={`flex ${isBot ? "justify-start" : "justify-end"} mb-2 message ${isBot ? "message-bot" : "message-user"
                }`}
        >
            <div
                className={`px-5 py-3 max-w-[75%] text-sm  ${isBot
                    ? "bg-[#AF1614] text-[#f9eded] rounded-br-3xl rounded-bl-3xl rounded-tr-3xl   mb-2 "
                    : "bg-[#fbe5e5] text-[#AF1614] rounded-bl-3xl rounded-tl-3xl rounded-br-3xl mb-2"
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