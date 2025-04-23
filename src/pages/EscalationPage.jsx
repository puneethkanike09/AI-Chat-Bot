import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import EscalationDetails from '../components/EscalationDetails';

const EscalationPage = () => {
    const { id } = useParams();
    const [escalationData, setEscalationData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchEscalationData = async () => {
            try {
                const response = await fetch(`https://chatbot.muliya.in/agent/escalation/${id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch escalation data');
                }
                const data = await response.json();
                setEscalationData(data);
            } catch (err) {
                setError(err.message);
                console.error('Error fetching data:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchEscalationData();
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="bg-white p-8 rounded-lg shadow-lg">
                    <h2 className="text-2xl font-bold text-red-600 mb-4">Error</h2>
                    <p className="text-gray-600">{error}</p>
                    <button 
                        onClick={() => window.location.reload()}
                        className="mt-4 px-4 py-2 bg-primary text-white rounded-md hover:bg-opacity-90 transition-colors"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    return <EscalationDetails escalationData={escalationData} />;
};

export default EscalationPage; 