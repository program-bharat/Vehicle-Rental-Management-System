import { Link } from "react-router-dom";

const VehicleCard = ({ vehicle }) => {
    return (
        <>
            <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition duration-300 border border-[#D6EFE3] flex flex-col h-full">
                <img
                    src={
                        vehicle.image ||
                        "https://images.unsplash.com/photo-1603189617530-6d32306f57c5?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGJtd3xlbnwwfHwwfHx8MA%3D%3D"
                    }
                    alt={vehicle.name}
                    className="w-full h-52 object-cover"
                />
                <div className="p-5 flex flex-col flex-1">
                    <div className="flex justify-between items-center gap-3 mb-3">
                        <h2 className="text-2xl font-bold text-[#091413] leading-tight flex-1 line-clamp-2">
                            {vehicle.name}
                        </h2>
                        <span className="bg-[#091413] text-white text-sm px-3 py-1 rounded-full whitespace-nowrap self-start">
                            ₹{vehicle.pricePerDay}/day
                        </span>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-4 flex-1 content-end">
                        <span className="bg-[#D6EFE3] text-[#285A48] text-sm px-3 py-1 rounded-full">
                            {vehicle.type}
                        </span>
                        <span className="bg-[#D6EFE3] text-[#285A48] text-sm px-3 py-1 rounded-full">
                            {vehicle.fuelType}
                        </span>
                        <span className="bg-[#D6EFE3] text-[#285A48] text-sm px-3 py-1 rounded-full">
                            {vehicle.brand}
                        </span>
                    </div>
                    <Link
                        to={`/vehicle/${vehicle._id}`}
                        className="block text-center bg-[#091413] text-white py-3 rounded-xl hover:bg-[#285A48] transition mt-auto"
                    >
                        View Details
                    </Link>
                </div>
            </div>
        </>
    );
};

export default VehicleCard;