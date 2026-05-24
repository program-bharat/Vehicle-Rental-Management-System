import { useState } from "react";

const UserCard = ({
    user,
    handleDelete,
    handleVerify,
    handleApproveOwner,
    handleRejectOwner,
}) => {
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [showVerifyConfirm, setShowVerifyConfirm] = useState(false);
    const [showApproveOwnerConfirm, setShowApproveOwnerConfirm] = useState(false);
    const [showRejectOwnerConfirm, setShowRejectOwnerConfirm] = useState(false);

    const loggedInUser = JSON.parse(localStorage.getItem("user"));
    const isCurrentAdmin = loggedInUser?.id === user._id;

    return (
        <>
            <div className="bg-white border border-[#dcefe7] rounded-[28px] p-6 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col h-full">
                <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 md:w-14 md:h-14 rounded-2xl bg-[#091413] text-white flex items-center justify-center text-xl font-bold">
                            {user.name.charAt(0)}
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-[#091413]">
                                {user.name}
                            </h2>
                            <p className="text-gray-500 text-sm break-all">
                                {user.email}
                            </p>
                        </div>
                    </div>
                    <span className={`text-xs font-semibold px-3 py-1 rounded-full ${user.isVerified
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}>
                        {user.isVerified ? "Verified" : "Pending"}
                    </span>
                </div>
                <div className="space-y-3 mb-6">
                    <div className="bg-[#f6fbf8] border border-[#e5f3ed] rounded-2xl px-4 py-3 flex items-center justify-between">
                        <span className="text-gray-500 ">
                            Role
                        </span>
                        <span className="font-semibold  text-[#091413] capitalize">
                            {user.role}
                        </span>
                    </div>
                    <div className="bg-[#f6fbf8] border border-[#e5f3ed] rounded-2xl px-4 py-3 flex items-center justify-between">
                        <span className="text-gray-500 text-sm">
                            Owner Request
                        </span>
                        <span className={`font-semibold capitalize ${user.ownerRequestStatus === "pending"
                                ? "text-yellow-600"
                                : user.ownerRequestStatus === "approved"
                                    ? "text-green-600"
                                    : "text-gray-500"
                            }`}>
                            {user.ownerRequestStatus || "none"}
                        </span>
                    </div>
                </div>
                <div className="flex flex-col gap-3 mt-auto">
                    {user.ownerRequestStatus === "pending" && (
                        <div className="grid grid-cols-2 gap-3">
                            <button
                                onClick={() => setShowApproveOwnerConfirm(true)}
                                className="bg-[#285A48] hover:bg-[#091413] text-white px-4 py-3 rounded-2xl transition-all duration-300 cursor-pointer font-medium"
                            >
                                Approve
                            </button>
                            <button
                                onClick={() => setShowRejectOwnerConfirm(true)}
                                className="bg-red-500 hover:bg-red-600 text-white px-4 py-3 rounded-2xl transition-all duration-300 cursor-pointer font-medium"
                            >
                                Reject
                            </button>
                        </div>
                    )}
                    {!user.isVerified && (
                        <button
                            onClick={() => setShowVerifyConfirm(true)}
                            className="bg-[#091413] hover:bg-[#285A48] text-white px-4 py-3 rounded-2xl transition-all duration-300 cursor-pointer font-medium"
                        >
                            Verify User
                        </button>
                    )}
                    <button
                        disabled={isCurrentAdmin}
                        onClick={() => setShowDeleteConfirm(true)}
                        className={`px-4 py-3 rounded-2xl text-white transition-all duration-300 ${isCurrentAdmin
                                ? "bg-gray-400 cursor-not-allowed"
                                : "bg-red-600 hover:bg-red-700 cursor-pointer"
                            }`}
                    >
                        {isCurrentAdmin
                            ? "Cannot Delete Yourself"
                            : "Delete User"}
                    </button>
                </div>
            </div>

            {/* Verify User POP-UP */}
            {showVerifyConfirm && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
                    <div className="bg-white border border-[#dcefe7] rounded-[30px] w-full max-w-md shadow-xl p-7">
                        <h2 className="text-3xl font-bold text-[#091413] mb-3">
                            Verify User
                        </h2>
                        <p className="text-gray-500 mb-8">
                            Are you sure you want to verify this user?
                        </p>
                        <div className="flex justify-end gap-3">
                            <button
                                onClick={() => setShowVerifyConfirm(false)}
                                className="px-5 py-3 border border-[#dcefe7] rounded-2xl hover:bg-[#f6fbf8] transition-all duration-300 cursor-pointer"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => {
                                    handleVerify(user._id);
                                    setShowVerifyConfirm(false);
                                }}
                                className="bg-[#285A48] hover:bg-[#091413] text-white px-5 py-3 rounded-2xl transition-all duration-300 cursor-pointer"
                            >
                                Yes, Verify
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Approve Owner POP-UP */}
            {showApproveOwnerConfirm && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
                    <div className="bg-white border border-[#dcefe7] rounded-[30px] w-full max-w-md shadow-xl p-7">
                        <h2 className="text-3xl font-bold text-[#091413] mb-3">
                            Approve Owner Request
                        </h2>
                        <p className="text-gray-500 mb-8">
                            Are you sure you want to make this user an owner?
                        </p>
                        <div className="flex justify-end gap-3">
                            <button
                                onClick={() => setShowApproveOwnerConfirm(false)}
                                className="px-5 py-3 border border-[#dcefe7] rounded-2xl hover:bg-[#f6fbf8] transition-all duration-300 cursor-pointer"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => {
                                    handleApproveOwner(user._id);
                                    setShowApproveOwnerConfirm(false);
                                }}
                                className="bg-[#285A48] hover:bg-[#091413] text-white px-5 py-3 rounded-2xl transition-all duration-300 cursor-pointer"
                            >
                                Yes, Approve
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Reject Owner POP-UP */}
            {showRejectOwnerConfirm && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
                    <div className="bg-white border border-[#dcefe7] rounded-[30px] w-full max-w-md shadow-xl p-7">
                        <h2 className="text-3xl font-bold text-[#091413] mb-3">
                            Reject Owner Request
                        </h2>
                        <p className="text-gray-500 mb-8">
                            Are you sure you want to reject this owner request?
                        </p>
                        <div className="flex justify-end gap-3">
                            <button
                                onClick={() => setShowRejectOwnerConfirm(false)}
                                className="px-5 py-3 border border-[#dcefe7] rounded-2xl hover:bg-[#f6fbf8] transition-all duration-300 cursor-pointer"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => {
                                    handleRejectOwner(user._id);
                                    setShowRejectOwnerConfirm(false);
                                }}
                                className="bg-red-500 hover:bg-red-600 text-white px-5 py-3 rounded-2xl transition-all duration-300 cursor-pointer"
                            >
                                Yes, Reject
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Delete User POP-UP */}

            {showDeleteConfirm && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
                    <div className="bg-white border border-[#dcefe7] rounded-[30px] w-full max-w-md shadow-xl p-7">
                        <h2 className="text-3xl font-bold text-[#091413] mb-3">
                            Confirm Delete
                        </h2>
                        <p className="text-gray-500 mb-8">
                            Are you sure you want to delete this user?
                        </p>
                        <div className="flex justify-end gap-3">
                            <button
                                onClick={() => setShowDeleteConfirm(false)}
                                className="px-5 py-3 border border-[#dcefe7] rounded-2xl hover:bg-[#f6fbf8] transition-all duration-300 cursor-pointer"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => {
                                    handleDelete(user._id);
                                    setShowDeleteConfirm(false);
                                }}
                                className="bg-red-600 hover:bg-red-700 text-white px-5 py-3 rounded-2xl transition-all duration-300 cursor-pointer"
                            >
                                Yes, Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default UserCard;