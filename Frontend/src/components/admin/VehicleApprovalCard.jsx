import { useState } from "react";

const VehicleApprovalCard = ({ vehicle, handleApprove }) => {
    const [showConfirm, setShowConfirm] = useState(false);
    return (
        <>
            <div className="bg-white border border-[#dcefe7] rounded-[28px] overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 w-full">
                <div className="relative">
                    <img
                        src={vehicle.image}
                        alt={vehicle.name}
                        className="w-full aspect-[4/3] object-cover"
                    />
                    <div className="absolute top-4 right-4">
                        <span className="bg-yellow-100 text-yellow-700 text-xs font-semibold px-3 py-1 rounded-full">
                            Pending Approval
                        </span>
                    </div>
                </div>
                <div className="p-6 flex flex-col h-full">
                    <div className="mb-5">
                        <h2 className="text-2xl font-bold text-[#091413] mb-2">
                            {vehicle.name}
                        </h2>
                        <p className="text-gray-500">
                            {vehicle.brand} {vehicle.model}
                        </p>
                    </div>
                    <div className="space-y-3 mb-6">
                        <div className="flex items-center justify-between bg-[#f6fbf8] border border-[#e5f3ed] rounded-2xl px-4 py-3">
                            <span className="text-gray-500 text-sm">
                                Vehicle Type
                            </span>
                            <span className="font-semibold text-[#091413] capitalize">
                                {vehicle.type}
                            </span>
                        </div>
                        <div className="flex items-center justify-between bg-[#f6fbf8] border border-[#e5f3ed] rounded-2xl px-4 py-3">
                            <span className="text-gray-500 text-sm">
                                Owner
                            </span>
                            <span className="font-semibold text-[#091413]">
                                {vehicle.ownerId?.name}
                            </span>
                        </div>

                    </div>
                    <button
                        onClick={() => setShowConfirm(true)}
                        className=" bg-[#091413] hover:bg-[#285A48] text-white px-5 py-3 rounded-2xl transition-all duration-300 cursor-pointer font-semibold"
                    >
                        Approve Vehicle
                    </button>
                </div>
            </div>
            {/* Approve Vehicle POP-UP */}
            {showConfirm && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
                    <div className="bg-white border border-[#dcefe7] rounded-[30px] w-full max-w-md shadow-xl p-7">
                        <h2 className="text-3xl font-bold text-[#091413] mb-3">
                            Approve Vehicle
                        </h2>
                        <p className="text-gray-500 leading-relaxed mb-8">
                            Are you sure you want to approve this vehicle listing?
                        </p>
                        <div className="flex items-center justify-end gap-3">
                            <button
                                onClick={() => setShowConfirm(false)}
                                className="px-5 py-3 rounded-2xl border border-[#dcefe7] text-[#091413] hover:bg-[#f6fbf8] transition-all duration-300 cursor-pointer"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => {
                                    handleApprove(vehicle._id);
                                    setShowConfirm(false);
                                }}
                                className="bg-[#285A48] hover:bg-[#091413] text-white px-5 py-3 rounded-2xl transition-all duration-300 cursor-pointer"
                            >
                                Yes, Approve
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default VehicleApprovalCard;