import { useState } from "react";

const VehicleApprovalCard = ({ vehicle, handleApprove }) => {
    const [showConfirm, setShowConfirm] = useState(false);
    return (
        <>
            <div className="border rounded-2xl overflow-hidden shadow-sm bg-white w-full max-w-[320px] mx-auto">
                <img
                    src={vehicle.image}
                    alt={vehicle.name}
                    className="w-full aspect-[4/3] object-cover"
                />
                <div className="p-5">
                    <h2 className="text-2xl font-bold mb-2">
                        {vehicle.name}
                    </h2>
                    <p className="mb-2">
                        {vehicle.brand} {vehicle.model}
                    </p>
                    <p className="mb-2">
                        Type:
                        <span className="font-semibold ml-2">
                            {vehicle.type}
                        </span>
                    </p>
                    <p className="mb-2">
                        Owner:
                        <span className="font-semibold ml-2">
                            {vehicle.ownerId?.name}
                        </span>
                    </p>
                    {/* <p className="mb-5">
                        {vehicle.ownerId?.email}
                    </p> */}
                    <button
                        onClick={() => setShowConfirm(true)}
                        className="bg-green-600 text-white px-5 py-3 rounded-xl cursor-pointer"
                    >
                        Approve Vehicle
                    </button>
                </div>
            </div>
            {/* Approve Vehicle POP-UP */}
            {
                showConfirm && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                        <div className="bg-white p-6 rounded-2xl w-[90%] max-w-md shadow-xl">
                            <h2 className="text-2xl font-bold mb-4">
                                Approve Vehicle
                            </h2>
                            <p className="text-gray-600 mb-6">
                                Are you sure you want to approve this vehicle?
                            </p>
                            <div className="flex justify-end gap-3">
                                <button
                                    onClick={() => setShowConfirm(false)}
                                    className="px-4 py-2 border rounded-lg cursor-pointer"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={() => {
                                        handleApprove(vehicle._id);
                                        setShowConfirm(false);
                                    }}
                                    className="bg-green-600 text-white px-4 py-2 rounded-lg cursor-pointer"
                                >
                                    Yes, Approve
                                </button>
                            </div>
                        </div>
                    </div>
                )
            }
        </>
    );
};

export default VehicleApprovalCard;