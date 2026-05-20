import { useState } from "react";
const UserCard = ({ user, handleDelete, handleVerify, handleApproveOwner, handleRejectOwner, }) => {
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [showVerifyConfirm, setShowVerifyConfirm] = useState(false);
    const [showApproveOwnerConfirm, setShowApproveOwnerConfirm] = useState(false);
    const [showRejectOwnerConfirm, setShowRejectOwnerConfirm] = useState(false);

    const loggedInUser = JSON.parse(localStorage.getItem("user"));
    const isCurrentAdmin = loggedInUser?.id === user._id;
    return (
        <>
            <div className="border rounded-2xl p-5 shadow-sm flex flex-col h-full">
                <div className="space-y-2 mb-5 flex-1">
                    <h2 className="text-2xl font-bold">
                        {user.name}
                    </h2>
                    <p className="text-gray-600">
                        {user.email}
                    </p>
                    <p>
                        Role:
                        <span className="font-semibold ml-2">
                            {user.role}
                        </span>
                    </p>
                    <p>
                        Verified:
                        <span className="font-semibold ml-2">
                            {user.isVerified ? "Yes" : "No"}
                        </span>
                    </p>
                </div>
                <div className="flex flex-col gap-3 mt-auto">
                    <div className="flex justify-between">
                        {
                            user.ownerRequestStatus === "pending" && (
                                <>
                                    <button
                                        onClick={() => setShowApproveOwnerConfirm(true)}
                                        className="w-[150px] md:w-[168px] lg:w-[170px] bg-blue-600 text-white px-4 py-2 rounded-lg cursor-pointer"
                                    >
                                        Approve Owner
                                    </button>
                                    <button
                                        onClick={() => setShowRejectOwnerConfirm(true)}
                                        className="w-[150px] md:w-[168px] lg:w-[170px] bg-red-500 text-white px-4 py-2 rounded-lg cursor-pointer"
                                    >
                                        Reject Request
                                    </button>
                                </>
                            )
                        }
                    </div>
                    {
                        !user.isVerified && (
                            <button
                                onClick={() => setShowVerifyConfirm(true)}
                                className="bg-green-600 text-white px-4 py-2 rounded-lg cursor-pointer"
                            >
                                Verify User
                            </button>
                        )
                    }
                    <button
                        disabled={isCurrentAdmin}
                        onClick={() => setShowDeleteConfirm(true)}
                        className={`px-4 py-2 rounded-lg text-white
                            ${isCurrentAdmin
                                ? "bg-gray-400 cursor-not-allowed"
                                : "bg-red-600 cursor-pointer"
                            }`}
                    >
                        {isCurrentAdmin ? "Cannot Delete Yourself" : "Delete User"}
                    </button>
                </div>
            </div>
            {/* Verify User POP-UP */}
            {
                showVerifyConfirm && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                        <div className="bg-white p-6 rounded-2xl w-[90%] max-w-md shadow-xl">

                            <h2 className="text-2xl font-bold mb-4">
                                Verify User
                            </h2>

                            <p className="text-gray-600 mb-6">
                                Are you sure you want to verify this user?
                            </p>

                            <div className="flex justify-end gap-3">
                                <button
                                    onClick={() => setShowVerifyConfirm(false)}
                                    className="px-4 py-2 border rounded-lg cursor-pointer"
                                >
                                    Cancel
                                </button>

                                <button
                                    onClick={() => {
                                        handleVerify(user._id);
                                        setShowVerifyConfirm(false);
                                    }}
                                    className="bg-green-600 text-white px-4 py-2 rounded-lg cursor-pointer"
                                >
                                    Yes, Verify
                                </button>
                            </div>

                        </div>
                    </div>
                )
            }
            {/* Approve Owner POP-UP */}
            {
                showApproveOwnerConfirm && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                        <div className="bg-white p-6 rounded-2xl w-[90%] max-w-md shadow-xl">
                            <h2 className="text-2xl font-bold mb-4">
                                Approve Owner Request
                            </h2>
                            <p className="text-gray-600 mb-6">
                                Are you sure you want to make this user an owner?
                            </p>
                            <div className="flex justify-end gap-3">
                                <button
                                    onClick={() => setShowApproveOwnerConfirm(false)}
                                    className="px-4 py-2 border rounded-lg cursor-pointer"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={() => {
                                        handleApproveOwner(user._id);
                                        setShowApproveOwnerConfirm(false);
                                    }}
                                    className="bg-blue-600 text-white px-4 py-2 rounded-lg cursor-pointer"
                                >
                                    Yes, Approve
                                </button>
                            </div>
                        </div>
                    </div>
                )
            }
            {/* Reject Owner Request POP-UP */}
            {
                showRejectOwnerConfirm && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                        <div className="bg-white p-6 rounded-2xl w-[90%] max-w-md shadow-xl">
                            <h2 className="text-2xl font-bold mb-4">
                                Reject Owner Request
                            </h2>
                            <p className="text-gray-600 mb-6">
                                Are you sure you want to reject this owner request?
                            </p>
                            <div className="flex justify-end gap-3">
                                <button
                                    onClick={() => setShowRejectOwnerConfirm(false)}
                                    className="px-4 py-2 border rounded-lg cursor-pointer"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={() => {
                                        handleRejectOwner(user._id);
                                        setShowRejectOwnerConfirm(false);
                                    }}
                                    className="bg-red-500 text-white px-4 py-2 rounded-lg cursor-pointer"
                                >
                                    Yes, Reject
                                </button>
                            </div>
                        </div>
                    </div>
                )
            }
            {/* Delete User POP-UP */}
            {
                showDeleteConfirm && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                        <div className="bg-white p-6 rounded-2xl w-[90%] max-w-md shadow-xl">
                            <h2 className="text-2xl font-bold mb-4">
                                Confirm Delete
                            </h2>
                            <p className="text-gray-600 mb-6">
                                Are you sure you want to delete this user?
                            </p>
                            <div className="flex justify-end gap-3">
                                <button
                                    onClick={() => setShowDeleteConfirm(false)}
                                    className="px-4 py-2 rounded-lg border cursor-pointer"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={() => {
                                        handleDelete(user._id);
                                        setShowDeleteConfirm(false);
                                    }}
                                    className="bg-red-600 text-white px-4 py-2 rounded-lg cursor-pointer"
                                >
                                    Yes, Delete
                                </button>
                            </div>
                        </div>
                    </div>
                )
            }
        </>
    );
};

export default UserCard;