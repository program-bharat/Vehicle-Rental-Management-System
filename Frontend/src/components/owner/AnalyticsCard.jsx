const AnalyticsCard = ({ title, value }) => {
    return (
        <div className="bg-white shadow-md rounded-xl p-6 border">
            <h3 className="text-gray-500 text-sm mb-2">
                {title}
            </h3>

            <p className="text-3xl font-bold">
                {value}
            </p>
        </div>
    );
};

export default AnalyticsCard;