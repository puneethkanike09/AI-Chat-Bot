import PropTypes from "prop-types";
import ReactMarkdown from "react-markdown";
import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const Message = ({ message }) => {
    const isBot = message.sender === "bot";
    const [imageLoaded, setImageLoaded] = useState(false);
    const [expandedProducts, setExpandedProducts] = useState(false);
    const [expandedPromotions, setExpandedPromotions] = useState(true);

    const handleImageLoad = () => {
        setImageLoaded(true);
    };

    const renderers = {
        p: ({ children }) => <p className="mb-2">{children}</p>,
        strong: ({ children }) => (
            <strong className="block font-bold mt-8">{children}</strong>
        ),
        img: ({ alt, src }) => (
            <img
                src={src}
                alt={alt}
                className="max-w-xs h-auto my-2 rounded-lg border"
                onLoad={handleImageLoad}
            />
        ),
        a: ({ href, children }) => {
            if (href.startsWith("https://")) {
                return (
                    <a href={href} target="_blank" rel="noopener noreferrer">
                        <img
                            src={href}
                            alt={children}
                            className="max-w-xs h-auto my-2 rounded-lg border"
                            onLoad={handleImageLoad}
                        />
                    </a>
                );
            }
            return <a href={href}>{children}</a>;
        },
    };

    return (
        <div className={`flex ${isBot ? "justify-start" : "justify-end"} mb-2`}>
            <div
                className={`px-5 py-3 max-w-[75%] text-sm ${isBot
                    ? "bg-stone-50 text-black rounded-br-3xl rounded-bl-3xl rounded-tr-3xl"
                    : "bg-stone-50 text-[#AF1614] rounded-bl-3xl rounded-tl-3xl rounded-br-3xl"
                    }`}
            >
                <ReactMarkdown components={renderers}>
                    {message.text}
                </ReactMarkdown>

                {isBot && message.suggested_products?.length > 0 && (
                    <div className="mt-4">
                        <div
                            className="flex items-center justify-between cursor-pointer"
                            onClick={() => setExpandedProducts(!expandedProducts)}
                        >
                            <h4 className="font-bold mb-2">Suggested Products</h4>
                            {expandedProducts ? <FaChevronUp /> : <FaChevronDown />}
                        </div>
                        {expandedProducts && (
                            <div className="flex space-x-3 overflow-x-auto custom-scrollbar transition-max-height duration-300 ease-in-out">
                                {message.suggested_products.map((product) => (
                                    <div
                                        key={product.id}
                                        className="relative min-w-[150px] h-[200px] rounded-md overflow-hidden bg-cover bg-center"
                                        style={{ backgroundImage: `url(${product.photo})` }}
                                    >
                                        <div className="absolute bottom-2 left-2 bg-black bg-opacity-70 p-2 rounded-md">
                                            <p className="text-white text-xs text-center">
                                                Weight: {product.ntWeight}g
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {isBot && message.promotions?.length > 0 && (
                    <div className="mt-4">
                        <div
                            className="flex items-center justify-between cursor-pointer"
                            onClick={() => setExpandedPromotions(!expandedPromotions)}
                        >
                            <h4 className="font-bold mb-2">Promotions</h4>
                            {expandedPromotions ? <FaChevronUp /> : <FaChevronDown />}
                        </div>
                        {expandedPromotions && (
                            <div className="space-y-3 transition-max-height duration-300 ease-in-out">
                                {message.promotions.map((promo) => (
                                    <div key={promo.id} className="p-2 rounded-md bg-[#f9eded]">
                                        <div className="font-semibold">{promo.title}</div>
                                        <p className="text-xs">{promo.description}</p>
                                        <p className="text-xs italic">Terms: {promo.terms}</p>
                                        <p className="text-xs">Validity: {promo.validity}</p>
                                        <p className="text-xs">Type: {promo.type}</p>
                                    </div>
                                ))}
                            </div>
                        )}
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
