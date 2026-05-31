import { Link } from "react-router-dom";

const VehicleCard = ({ vehicle }) => {
    return (
        <div className="bg-white rounded-3xl border border-[#D6EFE3] shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col h-full">
            <div className="overflow-hidden rounded-3xl">
                <img
                    src={
                        vehicle.image ||
                        "https://images.unsplash.com/photo-1603189617530-6d32306f57c5?w=600&auto=format&fit=crop&q=60"
                    }
                    alt={vehicle.name}
                    className="w-full aspect-[4/3] object-cover object-center transition-transform duration-300 hover:scale-110"
                />
            </div>
            <div className="p-4 sm:p-5 flex flex-col flex-1">
                <div className="flex items-start justify-between gap-3 mb-4">
                    <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-[#091413] leading-tight line-clamp-2">
                        {vehicle.name}
                    </h2>
                    <span className="bg-[#091413] text-white text-xs sm:text-sm px-3 py-1 rounded-full whitespace-nowrap">
                        ₹{vehicle.pricePerDay}/day
                    </span>
                </div>
                <div className="flex flex-wrap gap-2 mb-5">
                    <span className="bg-[#D6EFE3] text-[#285A48] text-xs sm:text-sm px-3 py-1 rounded-full">
                        {vehicle.type}
                    </span>
                    <span className="bg-[#D6EFE3] text-[#285A48] text-xs sm:text-sm px-3 py-1 rounded-full">
                        {vehicle.fuelType}
                    </span>
                    <span className="bg-[#D6EFE3] text-[#285A48] text-xs sm:text-sm px-3 py-1 rounded-full">
                        {vehicle.brand}
                    </span>
                </div>
                <Link
                    to={`/vehicle/${vehicle._id}`}
                    className="mt-auto block text-center bg-[#091413] text-white py-3 rounded-xl hover:bg-[#285A48] transition font-medium"
                >
                    View Details
                </Link>
            </div>
        </div>
    );
};

export default VehicleCard;