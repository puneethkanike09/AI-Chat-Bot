import PropTypes from "prop-types";
import { format } from "date-fns";
import { FaUser, FaPhone, FaMapMarkerAlt, FaQuestionCircle, FaClock, FaTag, FaChartLine, FaMoneyBillWave, FaShoppingCart } from "react-icons/fa";

const EscalationDetails = ({ escalationData }) => {
    const formatDate = (dateString) => {
        return format(new Date(dateString), "MMM dd, yyyy 'at' hh:mm a");
    };

    const parseInsights = (insightsText) => {
        const lines = insightsText.split('\n').filter(line => line.trim() && line.includes('•'));
        return lines.map(line => {
            const [key, value] = line.split(':').map(str => str.trim());
            return {
                key: key.replace('•', '').trim(),
                value: value
            };
        });
    };

    const getInsightIcon = (key) => {
        switch (key.toLowerCase()) {
            case 'interests':
                return <FaChartLine className="text-blue-500" />;
            case 'price sensitivity':
                return <FaMoneyBillWave className="text-green-500" />;
            case 'purchase readiness':
                return <FaShoppingCart className="text-purple-500" />;
            default:
                return <FaTag className="text-gray-500" />;
        }
    };

    const getInsightColor = (key, value) => {
        switch (key.toLowerCase()) {
            case 'price sensitivity':
                return value === 'high' ? 'text-red-600' : value === 'medium' ? 'text-yellow-600' : 'text-green-600';
            case 'purchase readiness':
                return value === 'considering' ? 'text-yellow-600' : value === 'ready' ? 'text-green-600' : 'text-blue-600';
            default:
                return 'text-gray-900';
        }
    };

    const insights = parseInsights(escalationData.behavior_insights);

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
                {/* Header */}
                <div className="bg-white shadow-lg rounded-t-xl p-6 border-b-4 border-primary">
                    <div className="flex justify-between items-center">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">Escalation Details</h1>
                            <p className="text-sm text-gray-500 mt-1">ID: {escalationData.escalation_id}</p>
                        </div>
                        <div className="flex items-center">
                            <span className={`px-4 py-2 rounded-full text-sm font-semibold ${
                                escalationData.status === "pending" 
                                    ? "bg-yellow-100 text-yellow-800" 
                                    : "bg-green-100 text-green-800"
                            }`}>
                                {escalationData.status.charAt(0).toUpperCase() + escalationData.status.slice(1)}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="mt-6 grid grid-cols-1 gap-6">
                    {/* Behavior Insights Section - Now at the top */}
                    <div className="bg-white shadow-lg rounded-xl p-6 border-l-4 border-blue-500">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                                <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                                    Priority Insights
                                </span>
                                Customer Behavior Analysis
                            </h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {insights.map((insight, index) => (
                                <div 
                                    key={index}
                                    className="bg-gray-50 rounded-xl p-4 hover:shadow-md transition-all duration-300 border border-gray-100"
                                >
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="p-2.5 bg-white rounded-lg shadow-sm">
                                            {getInsightIcon(insight.key)}
                                        </div>
                                        <h3 className="font-medium text-gray-600">
                                            {insight.key}
                                        </h3>
                                    </div>
                                    <div className={`text-lg font-semibold ${getInsightColor(insight.key, insight.value)} ml-12`}>
                                        {insight.value}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Two Column Layout for Customer Info and Query Details */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Customer Information */}
                        <div className="bg-white shadow-lg rounded-xl p-6">
                            <h2 className="text-xl font-semibold text-gray-900 mb-4">Customer Information</h2>
                            <div className="space-y-4">
                                <div className="flex items-center">
                                    <FaUser className="text-primary w-5 h-5 mr-3" />
                                    <div>
                                        <p className="text-sm text-gray-500">Name</p>
                                        <p className="font-medium">{escalationData.customer.name}</p>
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    <FaPhone className="text-primary w-5 h-5 mr-3" />
                                    <div>
                                        <p className="text-sm text-gray-500">Phone</p>
                                        <p className="font-medium">{escalationData.customer.phone}</p>
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    <FaMapMarkerAlt className="text-primary w-5 h-5 mr-3" />
                                    <div>
                                        <p className="text-sm text-gray-500">Location</p>
                                        <p className="font-medium">{escalationData.customer.address}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Query Details */}
                        <div className="bg-white shadow-lg rounded-xl p-6">
                            <h2 className="text-xl font-semibold text-gray-900 mb-4">Query Details</h2>
                            <div className="space-y-4">
                                <div className="flex items-start">
                                    <FaQuestionCircle className="text-primary w-5 h-5 mr-3 mt-1" />
                                    <div>
                                        <p className="text-sm text-gray-500">Customer Query</p>
                                        <p className="font-medium">{escalationData.query}</p>
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <FaTag className="text-primary w-5 h-5 mr-3 mt-1" />
                                    <div>
                                        <p className="text-sm text-gray-500">Reason for Escalation</p>
                                        <p className="font-medium">{escalationData.reason}</p>
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <FaClock className="text-primary w-5 h-5 mr-3 mt-1" />
                                    <div>
                                        <p className="text-sm text-gray-500">Created At</p>
                                        <p className="font-medium">{formatDate(escalationData.created_at)}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Products */}
                    <div className="bg-white shadow-lg rounded-xl p-6">
                        <h2 className="text-xl font-semibold text-gray-900 mb-4">Suggested Products</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {escalationData.products.map((product) => (
                                <div key={product.id} className="bg-gray-50 rounded-lg p-4 hover:shadow-md transition-shadow">
                                    <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200 mb-4">
                                        <img
                                            src={product.photo}
                                            alt={product.name}
                                            className="h-48 w-full object-cover object-center"
                                            onError={(e) => {
                                                e.target.src = 'https://via.placeholder.com/300x300?text=No+Image';
                                            }}
                                        />
                                    </div>
                                    <h3 className="text-lg font-medium text-gray-900">{product.name}</h3>
                                    <div className="mt-2 space-y-1">
                                        <p className="text-sm text-gray-500">ID: {product.id}</p>
                                        <p className="text-sm text-gray-500">Net Weight: {product.ntWeight}g</p>
                                        <p className="text-sm text-gray-500">Gross Weight: {product.grWeight}g</p>
                                    </div>
                                    <div className="mt-3">
                                        <p className="text-xs text-gray-500">Tags:</p>
                                        <div className="mt-1 flex flex-wrap gap-1">
                                            {product.Tags.split(", ").map((tag, index) => (
                                                <span
                                                    key={index}
                                                    className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Conversation History */}
                    <div className="bg-white shadow-lg rounded-xl p-6">
                        <h2 className="text-xl font-semibold text-gray-900 mb-4">Conversation History</h2>
                        <div className="bg-gray-50 rounded-lg p-4">
                            <pre className="whitespace-pre-wrap text-sm text-gray-600 font-mono">
                                {escalationData.conversation_history}
                            </pre>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

EscalationDetails.propTypes = {
    escalationData: PropTypes.shape({
        escalation_id: PropTypes.string.isRequired,
        status: PropTypes.string.isRequired,
        created_at: PropTypes.string.isRequired,
        customer: PropTypes.shape({
            name: PropTypes.string.isRequired,
            phone: PropTypes.string.isRequired,
            address: PropTypes.string.isRequired,
        }).isRequired,
        query: PropTypes.string.isRequired,
        reason: PropTypes.string.isRequired,
        conversation_history: PropTypes.string.isRequired,
        products: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.string.isRequired,
                name: PropTypes.string.isRequired,
                photo: PropTypes.string.isRequired,
                grWeight: PropTypes.number.isRequired,
                ntWeight: PropTypes.number.isRequired,
                Tags: PropTypes.string.isRequired,
            })
        ).isRequired,
        behavior_insights: PropTypes.string.isRequired,
    }).isRequired,
};

export default EscalationDetails; 