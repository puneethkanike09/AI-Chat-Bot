import PropTypes from "prop-types";

const Message = ({ text, sender }) => {
    const isBot = sender === "bot";

    return (
        <div
            className={`flex ${isBot ? "justify-start" : "justify-end"} mb-4 ml-4 mr-4`}
        >
            <div
                className={`px-4 py-3 max-w-[90%] lg:max-w-[75%] text-sm lg:text-lg rounded-lg shadow-md ${isBot
                    ? "bg-gradient-to-r from-blue-600 to-blue-800 text-white"
                    : "bg-gray-200 text-gray-900"
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
