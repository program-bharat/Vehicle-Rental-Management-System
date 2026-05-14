import { Link, Outlet, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { getOwnerAnalytics } from "../../api/userAPI";
import AnalyticsCard from "../../components/owner/AnalyticsCard.jsx";

const OwnerDashboard = () => {
    const location = useLocation();
    const isDashboardHome = location.pathname === "/owner/dashboard";
    const [analytics, setAnalytics] = useState({
        totalVehicles: 0,
        totalBookings: 0,
        totalRevenue: 0,
    });
    useEffect(() => {
        const fetchAnalytics = async () => {
            try {
                const res = await getOwnerAnalytics();
                setAnalytics(res.data.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchAnalytics();
    }, []);
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
                        to="/owner/dashboard"
                        className="bg-black text-white px-5 py-3 rounded-xl"
                    >
                        Analytics
                    </Link>
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
                {
                    isDashboardHome && (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                            <AnalyticsCard
                                title="Total Vehicles"
                                value={analytics.totalVehicles}
                            />

                            <AnalyticsCard
                                title="Total Bookings"
                                value={analytics.totalBookings}
                            />

                            <AnalyticsCard
                                title="Total Revenue"
                                value={`₹${analytics.totalRevenue}`}
                            />

                        </div>
                    )
                }
                {/* CHILD ROUTES */}
                <Outlet />
            </div>
        </>
    );
};

export default OwnerDashboard;