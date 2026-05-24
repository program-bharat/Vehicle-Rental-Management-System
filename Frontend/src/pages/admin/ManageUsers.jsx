import { useEffect, useState } from "react";

import {
    getAllUsers,
    deleteUser,
    verifyUser,
    approveOwnerRequest,
    rejectOwnerRequest,
} from "../../api/adminAPI";

import UserCard from "../../components/admin/UserCard";

const ManageUsers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchUsers = async () => {
        try {
            const res = await getAllUsers();
            setUsers(res.data.data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchUsers();
    }, []);
    const handleDelete = async (id) => {
        try {
            await deleteUser(id);
            setUsers((prev) =>
                prev.filter((user) => user._id !== id)
            );
        } catch (error) {
            console.log(error);
        }
    };
    const handleVerify = async (id) => {
        try {
            await verifyUser(id);
            fetchUsers();
        } catch (error) {
            console.log(error);
        }
    };
    const handleApproveOwner = async (id) => {
        try {
            await approveOwnerRequest(id);
            fetchUsers();
        } catch (error) {
            console.log(error);
        }
    };

    const handleRejectOwner = async (id) => {
        try {
            await rejectOwnerRequest(id);
            fetchUsers();
        } catch (error) {
            console.log(error);
        }
    };
    const verifiedUsers = users.filter(
        (user) => user.isVerified
    ).length;
    const pendingUsers = users.filter(
        (user) => !user.isVerified
    ).length;
    const ownerRequests = users.filter(
        (user) => user.ownerRequestStatus === "pending"
    ).length;
    if (loading) {
        return (
            <>
                <div className="min-h-screen flex items-center justify-center">
                    <h1 className="text-3xl font-bold text-[#285A48]">
                        Loading Users...
                    </h1>
                </div>
            </>
        );
    }
    return (
        <>
            <div className="min-h-screen bg-[#f6fbf8] ">
                {/* USERS GRID */}
                <div className="bg-white rounded-[32px] border border-[#dcefe7] shadow-sm p-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
                        <div>
                            <h2 className="text-3xl font-bold text-[#091413] mb-2">
                                All Platform Users
                            </h2>
                            <p className="text-gray-500">
                                Manage verification, owner approvals and user accounts.
                            </p>
                        </div>
                        <div className="bg-[#f6fbf8] border border-[#dcefe7] rounded-2xl px-5 py-3">
                            <span className="text-[#285A48] font-semibold">
                                {users.length} Users Found
                            </span>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                        {users.map((user) => (
                            <UserCard
                                key={user._id}
                                user={user}
                                handleDelete={handleDelete}
                                handleVerify={handleVerify}
                                handleApproveOwner={handleApproveOwner}
                                handleRejectOwner={handleRejectOwner}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default ManageUsers;