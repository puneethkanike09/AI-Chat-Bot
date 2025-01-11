import PropTypes from "prop-types";

const Message = ({ text, sender, file }) => {
    const isBot = sender === "bot";

    return (
        <div
            className={`flex ${isBot ? "justify-start" : "justify-end"} mb-4 ml-1 md:ml-40 mr-1 md:mr-40`}
        >
            <div
                className={`px-4 py-3 max-w-[90%] lg:max-w-[75%] text-sm lg:text-lg rounded-lg shadow-md ${isBot
                    ? "bg-blue-900 text-white"
                    : "bg-gray-200 text-blue-950"
                    }`}
            >
                {text && <p>{text}</p>}
                {file && (
                    <img
                        src={file}
                        alt="Uploaded"
                        className={`mt-2 rounded-lg ${isBot ? "max-w-[200px]" : "max-w-[200px]"}`}
                    />
                )}
            </div>
        </div>
    );
};

Message.propTypes = {
    text: PropTypes.string,
    sender: PropTypes.oneOf(["bot", "user"]).isRequired,
    file: PropTypes.string,
};

export default Message;
