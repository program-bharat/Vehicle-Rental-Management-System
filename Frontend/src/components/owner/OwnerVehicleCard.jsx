import { Link } from "react-router-dom";

const OwnerVehicleCard = ({ vehicle, handleDelete, handleToggleAvailability, }) => {
    return (
        <>
            <div className="bg-white border border-[#dcefe7] rounded-[24px] overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
                {/* IMAGE */}
                <div className="relative">
                    <img
                        src={
                            vehicle.image ||
                            "https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg"
                        }
                        alt={vehicle.name}
                        className="w-full aspect-[4/3] object-cover rounded-3xl"
                    />

                    <div className="absolute top-3 right-3">
                        <span
                            className={`text-xs font-medium px-3 py-1 rounded-full ${vehicle.availability
                                ? "bg-green-100 text-green-700"
                                : "bg-red-100 text-red-700"
                                }`}
                        >
                            {vehicle.availability
                                ? "Available"
                                : "Unavailable"}
                        </span>
                    </div>
                </div>

                {/* CONTENT */}
                <div className="p-4">

                    <div className="mb-4">
                        <h2 className="text-lg font-bold text-[#091413]">
                            {vehicle.name}
                        </h2>

                        <p className="text-sm text-gray-500">
                            {vehicle.brand} {vehicle.model}
                        </p>
                    </div>

                    {/* DETAILS */}
                    <div className="space-y-2 mb-4">

                        <div className="flex items-center justify-between bg-[#f6fbf8] border border-[#e5f3ed] rounded-xl px-3 py-2">
                            <span className="text-xs text-gray-500">
                                Vehicle Type
                            </span>

                            <span className="text-sm font-semibold text-[#091413] capitalize">
                                {vehicle.type}
                            </span>
                        </div>

                        <div className="flex items-center justify-between bg-[#f6fbf8] border border-[#e5f3ed] rounded-xl px-3 py-2">
                            <span className="text-xs text-gray-500">
                                Fuel
                            </span>

                            <span className="text-sm font-semibold text-[#091413]">
                                {vehicle.fuelType}
                            </span>
                        </div>

                        <div className="flex items-center justify-between bg-[#f6fbf8] border border-[#e5f3ed] rounded-xl px-3 py-2">
                            <span className="text-xs text-gray-500">
                                Transmission
                            </span>

                            <span className="text-sm font-semibold text-[#091413]">
                                {vehicle.transmission}
                            </span>
                        </div>

                        <div className="flex items-center justify-between bg-[#f6fbf8] border border-[#e5f3ed] rounded-xl px-3 py-2">
                            <span className="text-xs text-gray-500">
                                Price
                            </span>

                            <span className="text-sm font-bold text-[#285A48]">
                                ₹{vehicle.pricePerDay}/day
                            </span>
                        </div>

                        <div className="flex items-center justify-between bg-[#f6fbf8] border border-[#e5f3ed] rounded-xl px-3 py-2">
                            <span className="text-xs text-gray-500">
                                Status
                            </span>
                            <span
                                className={`text-sm font-semibold ${vehicle.availability
                                    ? "text-green-600"
                                    : "text-red-600"
                                    }`}
                            >
                                {vehicle.availability
                                    ? "Available"
                                    : "Unavailable"}
                            </span>
                        </div>
                    </div>

                    {/* ACTIONS */}
                    <div className="grid grid-cols-3 gap-2">
                        <Link
                            to={`/owner/dashboard/edit-vehicle/${vehicle._id}`}
                            className="bg-blue-600 hover:bg-blue-700 text-white text-center py-2 rounded-xl text-sm font-medium transition-all duration-300"
                        >
                            Edit
                        </Link>
                        <button
                            onClick={() => handleDelete(vehicle._id)}
                            className="bg-red-600 hover:bg-red-700 text-white py-2 rounded-xl text-sm font-medium transition-all duration-300 cursor-pointer"
                        >
                            Delete
                        </button>
                        <button
                            onClick={() => handleToggleAvailability(vehicle._id)}
                            className={`text-white py-2 rounded-xl text-sm font-medium transition-all duration-300 cursor-pointer ${vehicle.availability
                                ? "bg-red-600 hover:bg-red-700"
                                : "bg-green-600 hover:bg-green-700"
                                }`}
                        >
                            {vehicle.availability
                                ? "Disable"
                                : "Enable"}
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default OwnerVehicleCard;