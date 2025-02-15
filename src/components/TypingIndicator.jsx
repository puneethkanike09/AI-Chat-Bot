const TypingIndicator = () => {
    return (
        <div className="inline-flex items-center space-x-1 p-2 text-sm bg-white rounded-br-3xl rounded-bl-3xl rounded-tr-3xl">
            <div className="w-2 h-2 bg-primary rounded-full bounce-1"></div>
            <div className="w-2 h-2 bg-primary rounded-full bounce-2"></div>
            <div className="w-2 h-2 bg-primary rounded-full bounce-3"></div>
        </div>


    );
};

export default TypingIndicator;