import { useState } from "react";
const UserCard = ({ user, handleDelete, handleVerify, handleMakeOwner, }) => {
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [showVerifyConfirm, setShowVerifyConfirm] = useState(false);
    const [showOwnerConfirm, setShowOwnerConfirm] = useState(false);

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
                    {
                        user.role === "user" && (
                            <button
                                onClick={() => setShowOwnerConfirm(true)}
                                className="bg-blue-600 text-white px-4 py-2 rounded-lg cursor-pointer"
                            >
                                Make Owner
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
            {/* Make Owner POP-UP */}
            {
                showOwnerConfirm && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                        <div className="bg-white p-6 rounded-2xl w-[90%] max-w-md shadow-xl">

                            <h2 className="text-2xl font-bold mb-4">
                                Make Owner
                            </h2>

                            <p className="text-gray-600 mb-6">
                                Are you sure you want to promote this user to owner?
                            </p>

                            <div className="flex justify-end gap-3">
                                <button
                                    onClick={() => setShowOwnerConfirm(false)}
                                    className="px-4 py-2 border rounded-lg cursor-pointer"
                                >
                                    Cancel
                                </button>

                                <button
                                    onClick={() => {
                                        handleMakeOwner(user._id);
                                        setShowOwnerConfirm(false);
                                    }}
                                    className="bg-blue-600 text-white px-4 py-2 rounded-lg cursor-pointer"
                                >
                                    Yes, Make Owner
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