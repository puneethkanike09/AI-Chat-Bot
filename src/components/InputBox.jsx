import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { IoSend } from "react-icons/io5";

const InputBox = ({ onSendMessage, isDisabled, inputRef, shouldFocus }) => {
    const [input, setInput] = useState("");
    const maxLength = 200;

    useEffect(() => {
        if (!isDisabled && shouldFocus && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isDisabled, shouldFocus, inputRef]);

    const handleSend = (e) => {
        e.preventDefault();
        if (input.trim()) {
            onSendMessage(input);
            setInput("");
        }
    };

    const handleInput = (e) => {
        const value = e.target.value;
        if (value.length <= maxLength) {
            setInput(value);
        }
    };

    return (
        <div className="flex flex-col w-full">
            <form
                onSubmit={handleSend}
                className="flex items-center gap-3 px-4 py-3 rounded-tl-xl rounded-tr-xl bg-primary"
            >
                <div className="flex-grow relative">
                    <input
                        ref={inputRef}
                        type="text"
                        className="w-full bg-primary px-4 pr-16 py-2 text-sm text-secondary focus:outline-none focus:ring-1 focus:ring-primary placeholder-white"
                        value={input}
                        onChange={handleInput}
                        disabled={isDisabled}
                        placeholder="Type your query..."
                        maxLength={maxLength}
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-secondary/80 bg-primary px-1">
                        {input.length}/{maxLength}
                    </div>
                </div>
                <button
                    type="submit"
                    className="flex items-center justify-center px-4 py-2 text-secondary text-base rounded-md transition-all duration-300 bg-primary"
                    disabled={isDisabled}
                >
                    <IoSend size={20} />
                </button>
            </form>
        </div>
    );
};

InputBox.propTypes = {
    onSendMessage: PropTypes.func.isRequired,
    isDisabled: PropTypes.bool.isRequired,
    inputRef: PropTypes.object.isRequired,
    shouldFocus: PropTypes.bool,
};

InputBox.defaultProps = {
    shouldFocus: false,
};

export default InputBox;