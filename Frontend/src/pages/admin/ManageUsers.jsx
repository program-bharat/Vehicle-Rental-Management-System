import { useEffect, useState } from "react";

import {
    getAllUsers,
    deleteUser,
    verifyUser,
    makeOwner,
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
    const handleMakeOwner = async (id) => {
        try {
            await makeOwner(id);
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
            <div className="grid grid-cols-1 md:grid-cols-3 sm:grid-cols-2 gap-6">
                {
                    users.map((user) => (
                        <UserCard
                            key={user._id}
                            user={user}
                            handleDelete={handleDelete}
                            handleVerify={handleVerify}
                            handleMakeOwner={handleMakeOwner}
                        />
                    ))
                }
            </div>
        </>
    );
};

export default ManageUsers;