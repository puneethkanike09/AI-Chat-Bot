import PropTypes from "prop-types";

const Message = ({ text, sender }) => {
    const isBot = sender === "bot";

    return (
        <div
            className={`flex ${isBot ? "justify-start" : "justify-end"
                } mb-4 ml-5 mr-5`}
        >
            <div
                className={`px-6 py-4 rounded-lg text-xl shadow-md ${isBot
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
