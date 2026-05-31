import { Link, Outlet, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { CarFront, CalendarCheck, IndianRupee, Clock3, ArrowRight, Plus, BadgeCheck, Wallet, } from "lucide-react";
import { getOwnerAnalytics } from "../../api/userAPI";

const OwnerDashboard = () => {
    const location = useLocation();
    const owner = JSON.parse(localStorage.getItem("user"));
    const [analytics, setAnalytics] = useState({
        totalVehicles: 0,
        totalBookings: 0,
        totalRevenue: 0,
    });
    const [loading, setLoading] = useState(true);
    const currentDate = new Date().toLocaleDateString("en-IN", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
    });
    useEffect(() => {

        const fetchAnalytics = async () => {
            try {
                const res = await getOwnerAnalytics();
                setAnalytics(res.data.data);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };
        fetchAnalytics();
    }, []);
    if (loading) {
        return (
            <>
                <div className="min-h-screen flex items-center justify-center bg-[#f6fbf8]">
                    <h1 className="text-3xl font-bold text-[#285A48]">
                        Loading Dashboard...
                    </h1>
                </div>
            </>
        );
    }
    return (
        <>
            <div className="bg-gray-50 min-h-screen">
                {/* HERO SECTION */}
                <div className="bg-[#091413] rounded-3xl overflow-hidden mb-8">
                    <div className="p-8 lg:p-10 flex flex-col xl:flex-row xl:items-center xl:justify-between gap-10">
                        {/* LEFT */}
                        <div className="max-w-3xl">
                            <p className="text-[#B0E4CC] text-sm tracking-wide uppercase mb-4">
                                Owner Business Center
                            </p>
                            <h1 className="text-4xl lg:text-5xl font-bold text-white leading-tight mb-5">
                                Welcome back,
                                <span className="text-[#B0E4CC]">
                                    {" "}{owner?.name || "Owner"}
                                </span>
                            </h1>
                            <p className="text-gray-300 text-base leading-relaxed max-w-2xl">
                                Manage your rental business, monitor vehicle
                                performance, handle booking requests and
                                track your earnings from one professional dashboard.
                            </p>
                        </div>

                        {/* RIGHT CARD */}
                        <div className="bg-[#285A48] border border-[#408A71] rounded-3xl p-6 w-full max-w-sm">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-16 h-16 rounded-2xl bg-[#408A71] flex items-center justify-center text-2xl font-bold text-white">
                                    {owner?.name?.charAt(0)}
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold text-white">
                                        Owner
                                    </h3>
                                    <p className="text-[#B0E4CC] text-sm">
                                        Vehicle Rental Business
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 text-[#B0E4CC] text-sm mb-5">
                                <Clock3 size={16} />
                                {currentDate}
                            </div>
                            <div className="bg-[#408A71] rounded-2xl p-4">
                                <p className="text-sm text-[#B0E4CC] mb-2">
                                    Current Earnings
                                </p>
                                <h2 className="text-3xl font-bold text-white">
                                    ₹{analytics.totalRevenue}
                                </h2>
                            </div>
                        </div>
                    </div>
                </div>
                <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">
                        {/* TOTAL VEHICLES */}
                        <div className="bg-white rounded-[28px] p-6 border border-[#dcefe7] shadow-sm hover:-translate-y-1 transition-all duration-300">
                            <div className="flex items-center justify-between mb-8">
                                <div className="w-14 h-14 rounded-2xl bg-[#B0E4CC] flex items-center justify-center">
                                    <CarFront className="text-[#091413]" />
                                </div>
                                <span className="text-sm text-gray-500">
                                    Vehicles
                                </span>
                            </div>
                            <h2 className="text-4xl font-bold text-[#091413] mb-2">
                                {analytics.totalVehicles}
                            </h2>
                            <p className="text-sm text-[#408A71]">
                                Active listed vehicles
                            </p>
                        </div>

                        {/* BOOKINGS */}
                        <div className="bg-white rounded-[28px] p-6 border border-[#dcefe7] shadow-sm hover:-translate-y-1 transition-all duration-300">
                            <div className="flex items-center justify-between mb-8">
                                <div className="w-14 h-14 rounded-2xl bg-[#e7f5ef] flex items-center justify-center">
                                    <CalendarCheck className="text-[#285A48]" />
                                </div>
                                <span className="text-sm text-gray-500">
                                    Bookings
                                </span>
                            </div>

                            <h2 className="text-4xl font-bold text-[#091413] mb-2">
                                {analytics.totalBookings}
                            </h2>
                            <p className="text-sm text-[#408A71]">
                                Total booking requests
                            </p>
                        </div>

                        {/* REVENUE */}
                        <div className="bg-[#285A48] rounded-[28px] p-6 border border-[#408A71] shadow-sm hover:-translate-y-1 transition-all duration-300">
                            <div className="flex items-center justify-between mb-8">
                                <div className="w-14 h-14 rounded-2xl bg-[#408A71] flex items-center justify-center">
                                    <IndianRupee className="text-white" />
                                </div>
                                <span className="text-sm text-[#B0E4CC]">
                                    Revenue
                                </span>
                            </div>
                            <h2 className="text-4xl font-bold text-white mb-2">
                                ₹{analytics.totalRevenue}
                            </h2>
                            <p className="text-sm text-[#B0E4CC]">
                                Approved booking earnings
                            </p>
                        </div>

                        {/* PENDING */}
                        <div className="bg-white rounded-[28px] p-6 border border-[#dcefe7] shadow-sm hover:-translate-y-1 transition-all duration-300">
                            <div className="flex items-center justify-between mb-8">
                                <div className="w-14 h-14 rounded-2xl bg-yellow-100 flex items-center justify-center">
                                    <BadgeCheck className="text-yellow-700" />
                                </div>

                                <span className="text-sm text-gray-500">
                                    Requests
                                </span>
                            </div>
                            <h2 className="text-4xl font-bold text-[#091413] mb-2">
                                {analytics.pendingBookings}
                            </h2>
                            <p className="text-sm text-yellow-600">
                                Pending booking approvals
                            </p>
                        </div>
                    </div>

                    {/* QUICK ACTIONS */}
                    <div className="mb-10">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-3xl font-bold text-[#091413]">
                                Quick Actions
                            </h2>
                            <div className="hidden md:flex items-center gap-2 text-[#285A48] font-medium">
                                Owner Controls
                                <ArrowRight size={18} />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

                            {/* ADD VEHICLE */}
                            <Link
                                to="/owner/dashboard/add-vehicle"
                                className="group bg-[#091413] rounded-[30px] p-7 text-white hover:-translate-y-1 transition-all duration-300"
                            >
                                <div className="w-14 h-14 rounded-2xl bg-[#285A48] flex items-center justify-center mb-6">
                                    <Plus />
                                </div>
                                <h3 className="text-2xl font-semibold mb-3">
                                    Add Vehicle
                                </h3>
                                <p className="text-[#B0E4CC] text-sm leading-relaxed mb-6">
                                    Add and publish a new rental vehicle.
                                </p>
                                <div className="flex items-center gap-2 text-sm text-[#B0E4CC]">
                                    Open Panel
                                    <ArrowRight size={16} />
                                </div>
                            </Link>

                            {/* MANAGE VEHICLES */}
                            <Link
                                to="/owner/dashboard/my-vehicles"
                                className="group bg-[#285A48] rounded-[30px] p-7 text-white hover:-translate-y-1 transition-all duration-300"
                            >
                                <div className="w-14 h-14 rounded-2xl bg-[#408A71] flex items-center justify-center mb-6">
                                    <CarFront />
                                </div>
                                <h3 className="text-2xl font-semibold mb-3">
                                    My Vehicles
                                </h3>
                                <p className="text-[#B0E4CC] text-sm leading-relaxed mb-6">
                                    Manage listed vehicles and availability.
                                </p>
                                <div className="flex items-center gap-2 text-sm text-[#B0E4CC]">
                                    Open Panel
                                    <ArrowRight size={16} />
                                </div>
                            </Link>

                            {/* BOOKINGS */}
                            <Link
                                to="/owner/dashboard/booking-requests"
                                className="bg-white rounded-[30px] p-7 border border-[#dcefe7] hover:-translate-y-1 transition-all duration-300"
                            >
                                <div className="w-14 h-14 rounded-2xl bg-[#e7f5ef] flex items-center justify-center mb-6">
                                    <CalendarCheck className="text-[#285A48]" />
                                </div>
                                <h3 className="text-2xl font-semibold mb-3 text-[#091413]">
                                    Booking Requests
                                </h3>
                                <p className="text-gray-500 text-sm leading-relaxed">
                                    Review and approve booking requests.
                                </p>
                            </Link>

                            {/* EARNINGS */}
                            <div className="bg-white rounded-[30px] p-7 border border-[#dcefe7] hover:-translate-y-1 transition-all duration-300">
                                <div className="w-14 h-14 rounded-2xl bg-[#B0E4CC] flex items-center justify-center mb-6">
                                    <Wallet className="text-[#091413]" />
                                </div>
                                <h3 className="text-2xl font-semibold mb-3 text-[#091413]">
                                    Earnings
                                </h3>
                                <p className="text-gray-500 text-sm leading-relaxed">
                                    Track total earnings and booking revenue.
                                </p>
                            </div>
                        </div>
                    </div>
                </>
                <div className="mt-12">
                    <Outlet />
                </div>
            </div>
        </>
    );
};

export default OwnerDashboard;