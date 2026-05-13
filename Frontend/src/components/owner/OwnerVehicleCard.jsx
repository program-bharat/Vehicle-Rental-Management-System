import { Link } from "react-router-dom";

const OwnerVehicleCard = ({
    vehicle,
    handleDelete,
    handleToggleAvailability,
}) => {

    return (
        <>
            <div className="border rounded-2xl overflow-hidden shadow bg-white">

                {/* IMAGE */}
                <img
                    src={
                        vehicle.image ||
                        "https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg"
                    }
                    alt={vehicle.name}
                    className="w-full h-52 object-cover"
                />

                {/* CONTENT */}
                <div className="p-5">

                    {/* TOP */}
                    <div className="flex items-center justify-between mb-4">

                        <h2 className="text-2xl font-bold">
                            {vehicle.name}
                        </h2>

                        <span className="bg-black text-white px-3 py-1 rounded-full text-sm">
                            ₹{vehicle.pricePerDay}/day
                        </span>

                    </div>

                    {/* DETAILS */}
                    <div className="space-y-2 mb-5">

                        <p>
                            <span className="font-semibold">
                                Brand:
                            </span>{" "}
                            {vehicle.brand}
                        </p>

                        <p>
                            <span className="font-semibold">
                                Model:
                            </span>{" "}
                            {vehicle.model}
                        </p>

                        <p>
                            <span className="font-semibold">
                                Type:
                            </span>{" "}
                            {vehicle.type}
                        </p>

                        <p>
                            <span className="font-semibold">
                                Fuel:
                            </span>{" "}
                            {vehicle.fuelType}
                        </p>

                        <p>
                            <span className="font-semibold">
                                Transmission:
                            </span>{" "}
                            {vehicle.transmission}
                        </p>

                        <p>
                            <span className="font-semibold">
                                Availability:
                            </span>{" "}

                            <span
                                className={
                                    vehicle.availability
                                        ? "text-green-600 font-semibold"
                                        : "text-red-600 font-semibold"
                                }
                            >
                                {
                                    vehicle.availability
                                        ? "Available"
                                        : "Unavailable"
                                }
                            </span>
                        </p>

                    </div>

                    {/* ACTIONS */}
                    <div className="flex flex-wrap gap-3">

                        <Link
                            to={`/owner/dashboard/edit-vehicle/${vehicle._id}`}
                            className="bg-blue-600 text-white px-4 py-2 rounded-xl cursor-pointer"
                        >
                            Edit
                        </Link>

                        <button
                            onClick={() => handleDelete(vehicle._id)}
                            className="bg-red-600 text-white px-4 py-2 rounded-xl cursor-pointer"
                        >
                            Delete
                        </button>

                        <button
                            onClick={() => handleToggleAvailability(vehicle._id)}
                            className="bg-gray-800 text-white px-4 py-2 rounded-xl cursor-pointer"
                        >
                            {
                                vehicle.availability
                                    ? "Disable"
                                    : "Enable"
                            }
                        </button>

                    </div>

                </div>

            </div>
        </>
    );
};

export default OwnerVehicleCard;