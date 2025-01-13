import PropTypes from "prop-types";

const Message = ({ text, sender }) => {
    const isBot = sender === "bot";

    return (
        <div
            className={`flex ${isBot ? "justify-start" : "justify-end"} mb-2 animate-${isBot ? "slide-in-left" : "slide-in-right"
                }`}
        >
            <div
                className={`px-4 py-2 max-w-[75%] text-sm rounded-lg shadow-md ${isBot ? "bg-[#ab252c] text-white" : "bg-gray-200 text-gray-900"
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
