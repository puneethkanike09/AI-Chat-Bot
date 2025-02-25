

const HomeSkeleton = () => {
    return (
        <div className="flex flex-col items-center justify-start min-h-screen bg-gray-100 p-4">
            <div className="w-full max-w-7xl">
                {/* Header Skeleton */}
                <div className="h-16 bg-white rounded-lg shadow animate-pulse mb-6 w-full"></div>

                {/* Hero Section Skeleton */}
                <div className="h-[500px] bg-white rounded-lg shadow animate-pulse mb-8 w-full"></div>

                {/* Category Section Skeleton */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 w-full">
                    {Array.from({ length: 4 }).map((_, index) => (
                        <div key={index} className="h-48 bg-white rounded-lg shadow animate-pulse"></div>
                    ))}
                </div>

                {/* Featured Products Section Skeleton */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 w-full">
                    {Array.from({ length: 8 }).map((_, index) => (
                        <div key={index} className="h-64 bg-white rounded-lg shadow animate-pulse"></div>
                    ))}
                </div>

                {/* Testimonials or Reviews Section Skeleton */}
                <div className="h-48 bg-white rounded-lg shadow animate-pulse mb-8 w-full"></div>

                {/* Footer Skeleton */}
                <div className="h-32 bg-white rounded-lg shadow animate-pulse w-full"></div>
            </div>
        </div>
    );
};

export default HomeSkeleton;
