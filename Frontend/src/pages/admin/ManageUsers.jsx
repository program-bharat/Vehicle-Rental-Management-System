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
    if (loading) {
        return (
            <h1 className="text-3xl font-bold text-center">
                Loading Users...
            </h1>
        );
    }
    return (
        <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {
                    users.map((user) => (
                        <UserCard
                            key={user._id}
                            user={user}
                            handleDelete={handleDelete}
                            handleVerify={handleVerify}
                            handleApproveOwner={handleApproveOwner}
                            handleRejectOwner={handleRejectOwner}
                        />
                    ))
                }
            </div>
        </>
    );
};

export default ManageUsers;