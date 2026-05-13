import { Link, Outlet } from "react-router-dom";

const OwnerDashboard = () => {
    return (
        <>
            <div className="max-w-7xl mx-auto">
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-4xl font-bold">
                        Owner Dashboard
                    </h1>
                </div>

                {/* NAVIGATION */}
                <div className="flex flex-wrap gap-4 mb-10">
                    <Link
                        to="/owner/dashboard/my-vehicles"
                        className="bg-black text-white px-5 py-3 rounded-xl"
                    >
                        My Vehicles
                    </Link>

                    <Link
                        to="/owner/dashboard/add-vehicle"
                        className="bg-black text-white px-5 py-3 rounded-xl"
                    >
                        Add Vehicle
                    </Link>

                    <Link
                        to="/owner/dashboard/booking-requests"
                        className="bg-black text-white px-5 py-3 rounded-xl"
                    >
                        Booking Requests
                    </Link>

                </div>
                {/* CHILD ROUTES */}
                <Outlet />
            </div>
        </>
    );
};

export default OwnerDashboard;