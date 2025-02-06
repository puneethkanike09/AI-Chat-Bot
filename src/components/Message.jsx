import PropTypes from "prop-types";
import ReactMarkdown from "react-markdown";

const Message = ({ message }) => {
    const isBot = message.sender === "bot";

    return (
        <div
            className={`flex ${isBot ? "justify-start" : "justify-end"} mb-2`}
        >
            <div
                className={`px-5 py-3 max-w-[75%] text-sm ${isBot
                    ? "bg-stone-50 text-black rounded-br-3xl rounded-bl-3xl rounded-tr-3xl"
                    : "bg-stone-50 text-[#AF1614] rounded-bl-3xl rounded-tl-3xl rounded-br-3xl"
                    }`}
            >
                <ReactMarkdown
                    components={{
                        img: ({ node, alt, src, ...props }) => (
                            <img
                                alt={alt}
                                src={src}
                                className="max-w-full h-auto my-2 rounded-lg border"
                                {...props}
                            />
                        ),
                        p: ({ node, ...props }) => <p className="mb-2" {...props} />,
                        strong: ({ node, children, ...props }) => (
                            <div className="mt-8">
                                <strong {...props} className="block font-bold">
                                    {children}
                                </strong>
                            </div>
                        ),
                    }}
                >
                    {message.text}
                </ReactMarkdown>

                {/* Rest of the component remains the same */}
                {isBot && message.suggested_products && (
                    <div className="mt-4">
                        <h4 className="font-bold mb-2">Suggested Products</h4>
                        <div className="space-y-3">
                            {message.suggested_products.map((product) => (
                                <div
                                    key={product.id}
                                    className="border p-2 rounded-md flex flex-col"
                                >
                                    <div className="flex items-center gap-2">
                                        <img
                                            src={product.photo}
                                            alt={product.name}
                                            className="w-12 h-12 object-cover rounded"
                                        />
                                        <span className="font-semibold">{product.name}</span>
                                    </div>
                                    <p className="text-xs mt-1">
                                        Category: {product.group} | Weight: {product.gross_weight}g
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {isBot && message.promotions && (
                    <div className="mt-4">
                        <h4 className="font-bold mb-2">Promotions</h4>
                        <div className="space-y-3">
                            {message.promotions.map((promo) => (
                                <div
                                    key={promo.id}
                                    className="border p-2 rounded-md"
                                >
                                    <div className="font-semibold">{promo.title}</div>
                                    <p className="text-xs">{promo.description}</p>
                                    <p className="text-xs italic">Terms: {promo.terms}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

Message.propTypes = {
    message: PropTypes.shape({
        id: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
        sender: PropTypes.oneOf(["bot", "user"]).isRequired,
        suggested_products: PropTypes.array,
        promotions: PropTypes.array,
    }).isRequired,
};

export default Message;