import PropTypes from "prop-types";
import ReactMarkdown from "react-markdown";
import { useRef } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const Message = ({ message }) => {
    const isBot = message.sender === "bot";
    const productsRef = useRef(null);

    const handleImageLoad = () => {
        // Handle image load if needed
    };

    const handleScroll = (direction) => {
        if (productsRef.current) {
            const scrollAmount = 172; // Adjust this value based on your design
            productsRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth',
            });
        }
    };

    const renderers = {
        p: ({ children }) => <p className="mb-2">{children}</p>,
        strong: ({ children }) => (
            <strong className="block font-bold mt-8">{children}</strong>
        ),
        img: ({ alt, src }) => (
            <a href={src} target="_blank" rel="noopener noreferrer">
                <img
                    src={src}
                    alt={alt}
                    className="max-w-xs h-auto my-2 rounded-lg border cursor-pointer"
                    style={{ width: '100px', height: 'auto' }}
                    onLoad={handleImageLoad}
                />
            </a>
        ),
        a: ({ href, children }) => {
            if (href.startsWith("https://")) {
                return (
                    <a href={href} target="_blank" rel="noopener noreferrer">
                        <img
                            src={href}
                            alt={children}
                            className="max-w-xs h-auto my-2 rounded-lg border cursor-pointer"
                            style={{ width: '100px', height: 'auto' }}
                            onLoad={handleImageLoad}
                        />
                    </a>
                );
            }
            return <a href={href}>{children}</a>;
        },
    };

    return (
        <div className={`flex ${isBot ? "justify-start" : "justify-end"} mb-2`} data-sender={message.sender}>
            <div
                className={`px-5 py-3 max-w-[75%] text-sm ${isBot
                    ? "bg-white text-black rounded-br-3xl rounded-bl-3xl rounded-tr-3xl"
                    : "bg-white text-black rounded-bl-3xl rounded-tl-3xl rounded-br-3xl"
                    }`}
            >
                <ReactMarkdown components={renderers}>
                    {message.text}
                </ReactMarkdown>

                {isBot && message.suggested_products?.length > 0 && (
                    <div className="mt-4 relative">
                        <div className="flex items-center justify-between cursor-pointer">
                            <h4 className="font-bold mb-2">Suggested Products</h4>
                        </div>
                        <div className="relative">
                            <button
                                className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white/40 hover:bg-white/60 p-2 rounded-full transition-all duration-300 shadow-md z-10"
                                onClick={() => handleScroll('left')}
                            >
                                <FaChevronLeft />
                            </button>
                            <div
                                ref={productsRef}
                                className="flex space-x-3 overflow-x-auto custom-scrollbar transition-max-height duration-300 ease-in-out"
                            >
                                {message.suggested_products.map((product) => (
                                    <div
                                        key={product.id}
                                        className="relative min-w-[160px] h-[200px] rounded-md overflow-hidden bg-cover bg-center"
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
                            <button
                                className="absolute right-0 top-1/2 transform -translate-y-1/2  bg-white/40 transition-all duration-300 hover:bg-white/60 p-2 rounded-full shadow-md z-10"
                                onClick={() => handleScroll('right')}
                            >
                                <FaChevronRight />
                            </button>
                        </div>
                    </div>
                )}

                {isBot && message.promotions?.length > 0 && (
                    <div className="mt-4">
                        <h4 className="font-bold mb-2">Promotions</h4>
                        <div className="space-y-3 transition-max-height duration-300 ease-in-out">
                            {message.promotions.map((promo) => (
                                <div key={promo.id} className="p-2 rounded-md bg-secondary">
                                    <div className="font-semibold">{promo.title}</div>
                                    <p className="text-xs">{promo.description}</p>
                                    <p className="text-xs italic">Terms: {promo.terms}</p>
                                    <p className="text-xs">Validity: {promo.validity}</p>
                                    <p className="text-xs">Type: {promo.type}</p>
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
