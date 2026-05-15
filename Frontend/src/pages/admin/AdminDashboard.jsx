import { Link, Outlet } from "react-router-dom";

const AdminDashboard = () => {
    return (
        <>
            <div className="max-w-7xl mx-auto">
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-4xl font-bold">
                        Admin Dashboard
                    </h1>
                </div>
                <div className="flex flex-wrap gap-4 mb-10">
                    <Link
                        to="/admin/dashboard/users"
                        className="bg-black text-white px-5 py-3 rounded-xl"
                    >
                        Manage Users
                    </Link>
                    <Link
                        to="/admin/dashboard/vehicles"
                        className="bg-black text-white px-5 py-3 rounded-xl"
                    >
                        Approve Vehicles
                    </Link>
                </div>
                <Outlet />
            </div>
        </>
    );
};

export default AdminDashboard;