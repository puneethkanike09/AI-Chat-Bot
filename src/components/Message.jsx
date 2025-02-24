import PropTypes from "prop-types";
import ReactMarkdown from "react-markdown";
// import remarkBreaks from "remark-breaks";
import { useState } from "react";
import { FaChevronDown, FaChevronUp, FaTimes } from "react-icons/fa";
import Modal from 'react-modal';




const Message = ({ message, onSendMessage }) => {
    const isBot = message.sender === "bot";
    const [expandedProducts, setExpandedProducts] = useState(false);
    const [expandedPromotions, setExpandedPromotions] = useState(false);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [modalImage, setModalImage] = useState("");
    const [failedImages, setFailedImages] = useState([]);

    const handleImageLoad = (src) => {
        setFailedImages((prev) => prev.filter((img) => img !== src));
    };

    const handleImageError = (src) => {
        setFailedImages((prev) => [...prev, src]);
    };

    const openModal = (src) => {
        if (!src || failedImages.includes(src)) {
            return;
        }
        setModalImage(src);
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
        setModalImage("");
    };

    const encodeImageUrl = (url) => {
        return encodeURI(url);
    };

    const renderers = {
        p: ({ children }) => <p className="mb-2">{children}</p>,
        strong: ({ children }) => (
            <strong className="font-bold">{children}</strong>
        ),
        img: ({ alt, src }) => {
            const encodedSrc = encodeImageUrl(src);
            if (failedImages.includes(encodedSrc)) {
                return null;
            }
            return (
                <img
                    src={encodedSrc}
                    alt={alt}
                    className="image1 max-w-[100px] h-auto my-2 rounded-lg border cursor-pointer md:max-w-[100px]"
                    onClick={() => openModal(encodedSrc)}
                    onError={() => handleImageError(encodedSrc)}
                />
            );
        },
        br: () => <br />,
        ol: ({ children }) => <ol className="list-decimal list-inside">{children}</ol>,
        li: ({ children }) => <li className="mb-1">{children}</li>,
    };

    return (
        <div className={`flex ${isBot ? "justify-start" : "justify-end"} mb-2`}>
            {isBot && (
                <img
                    src="https://muliya.in/wp-content/uploads/2020/01/Muliya-Jewels-Favicon.png"
                    alt="Muliya Icon"
                    className="w-6 h-6 rounded-full mr-1"
                />
            )}
            <div
                className={`px-5 py-3 max-w-[75%] text-sm ${isBot
                    ? "bg-stone-50 text-black rounded-br-3xl rounded-bl-3xl rounded-tr-3xl"
                    : "bg-stone-50 text-[#AF1614] rounded-bl-3xl rounded-tl-3xl rounded-br-3xl"
                    }`}
            >
                <ReactMarkdown breaks components={renderers}>
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
                                        style={{ backgroundImage: `url(${encodeImageUrl(product.photo)})` }}
                                    >
                                        <div className="absolute bottom-2 left-2 bg-black bg-opacity-50 p-2 rounded-md">
                                            <p className="text-white text-xs text-center">
                                                Weight: {product.ntWeight}g
                                            </p>
                                            <button
                                                onClick={() => onSendMessage(`Can you provide more details about the product "${product.name}" with weight ${product.ntWeight}g?`)}
                                                className="mt-2 border border-white-100 text-white px-2 py-1 rounded transition-colors duration-300 hover:bg-white hover:text-black"
                                            >
                                                More Details
                                            </button>
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

            {/* Modal for displaying images */}
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Image Modal"
                className="modal-content"
                overlayClassName="modal-overlay"
                ariaHideApp={false}
            >
                <button onClick={closeModal} className="close-button">
                    <FaTimes />
                </button>
                {modalImage ? (
                    <img
                        src={modalImage}
                        alt="Modal"
                        className="modal-image"
                        onLoad={() => handleImageLoad(modalImage)}
                        onError={() => handleImageError(modalImage)}
                    />
                ) : (
                    <div className="modal-placeholder">
                        {failedImages.includes(modalImage) ? "Failed to load image." : "Loading image..."}
                    </div>
                )}
            </Modal>
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
    onSendMessage: PropTypes.func.isRequired,
};

export default Message;
