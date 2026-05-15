import { Link } from "react-router-dom";

const VehicleCard = ({ vehicle }) => {
    return (
        <>
            <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition duration-300 border flex flex-col h-full">
                <img
                    src={
                        vehicle.image ||
                        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnn2KTxLPv8e0YHdurBrSGLupzf18QMYrmAA&s"
                    }
                    alt={vehicle.name}
                    className="w-full h-52 object-cover"
                />
                <div className="p-5 flex flex-col flex-1">
                    <div className="flex justify-between items-center gap-3 mb-3">

                        <h2 className="text-2xl font-bold text-gray-900 leading-tight flex-1 line-clamp-2">
                            {vehicle.name}
                        </h2>

                        <span className="bg-black text-white text-sm px-3 py-1 rounded-full whitespace-nowrap self-start">
                            ₹{vehicle.pricePerDay}/day
                        </span>

                    </div>
                    <div className="flex flex-wrap gap-2 mb-4 flex-1 content-end">
                        <span className="bg-gray-100 text-sm px-3 py-1 rounded-full">
                            {vehicle.type}
                        </span>
                        <span className="bg-gray-100 text-sm px-3 py-1 rounded-full">
                            {vehicle.fuelType}
                        </span>
                        <span className="bg-gray-100 text-sm px-3 py-1 rounded-full">
                            {vehicle.brand}
                        </span>
                    </div>
                    <Link
                        to={`/vehicle/${vehicle._id}`}
                        className="block text-center bg-black text-white py-3 rounded-xl hover:bg-gray-800 transition mt-auto"
                    >
                        View Details
                    </Link>
                </div>
            </div>
        </>
    );
};

export default VehicleCard;