import { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";

import {
    Users, CarFront, BadgeCheck, CalendarCheck, IndianRupee, Clock3, ShieldCheck, ArrowRight,
} from "lucide-react";

import { getAdminDashboardStats } from "../../api/userAPI";

const AdminDashboard = () => {

    const admin = JSON.parse(localStorage.getItem("user"));

    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    const currentDate = new Date().toLocaleDateString("en-IN", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
    });

    useEffect(() => {

        const fetchDashboard = async () => {
            try {
                const res = await getAdminDashboardStats();
                setStats(res.data.data);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };

        fetchDashboard();

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
                {/* TOP HERO */}
                <div className="bg-[#091413] rounded-3xl overflow-hidden mb-8">
                    <div className="p-8 lg:p-10 flex flex-col xl:flex-row xl:items-center xl:justify-between gap-10">
                        <div className="max-w-3xl">
                            <p className="text-[#B0E4CC] text-sm tracking-wide uppercase mb-4">
                                Admin Control Center
                            </p>
                            <h1 className="text-4xl lg:text-5xl font-bold text-white leading-tight mb-5">
                                Welcome back,
                                <span className="text-[#B0E4CC]">
                                    {" "}{admin?.name || "Admin"}
                                </span>
                            </h1>
                            <p className="text-gray-300 text-base leading-relaxed max-w-2xl">
                                Monitor platform analytics, manage users,
                                approve vehicles, track bookings and
                                control the complete rental ecosystem
                                from one centralized dashboard.
                            </p>
                        </div>
                        <div className="bg-[#285A48] border border-[#408A71] rounded-3xl p-6 w-full max-w-sm">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-16 h-16 rounded-2xl bg-[#408A71] flex items-center justify-center text-2xl font-bold text-white">
                                    {admin?.name?.charAt(0)}
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold text-white">
                                        Admin
                                    </h3>
                                    <p className="text-[#B0E4CC] text-sm">
                                        Vehicle Rental Platform
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-2 text-[#B0E4CC] text-sm">
                                <Clock3 size={16} />
                                {currentDate}
                            </div>
                        </div>
                    </div>
                </div>

                {/* ANALYTICS */}
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-6 mb-10">
                    <div className="bg-white rounded-[28px] p-6 border border-[#dcefe7] shadow-sm hover:-translate-y-1 transition-all duration-300">
                        <div className="flex items-center justify-between mb-8">
                            <div className="w-14 h-14 rounded-2xl bg-[#B0E4CC] flex items-center justify-center">
                                <Users className="text-[#091413]" />
                            </div>
                            <span className="text-sm text-gray-500">
                                Total Users
                            </span>
                        </div>
                        <h2 className="text-4xl font-bold text-[#091413] mb-2">
                            {stats.totalUsers}
                        </h2>
                        <p className="text-sm text-[#408A71]">
                            Registered platform users
                        </p>
                    </div>
                    <div className="bg-white rounded-[28px] p-6 border border-[#dcefe7] shadow-sm hover:-translate-y-1 transition-all duration-300">
                        <div className="flex items-center justify-between mb-8">
                            <div className="w-14 h-14 rounded-2xl bg-[#285A48] flex items-center justify-center">
                                <CarFront className="text-white" />
                            </div>
                            <span className="text-sm text-gray-500">
                                Vehicles
                            </span>
                        </div>
                        <h2 className="text-4xl font-bold text-[#091413] mb-2">
                            {stats.totalVehicles}
                        </h2>
                        <p className="text-sm text-[#408A71]">
                            Listed rental vehicles
                        </p>
                    </div>
                    <div className="bg-white rounded-[28px] p-6 border border-[#dcefe7] shadow-sm hover:-translate-y-1 transition-all duration-300">
                        <div className="flex items-center justify-between mb-8">
                            <div className="w-14 h-14 rounded-2xl bg-yellow-100 flex items-center justify-center">
                                <BadgeCheck className="text-yellow-700" />
                            </div>
                            <span className="text-sm text-gray-500">
                                Pending
                            </span>
                        </div>
                        <h2 className="text-4xl font-bold text-[#091413] mb-2">
                            {stats.pendingVehicles}
                        </h2>
                        <p className="text-sm text-yellow-600">
                            Vehicle approvals pending
                        </p>
                    </div>
                    <div className="bg-white rounded-[28px] p-6 border border-[#dcefe7] shadow-sm hover:-translate-y-1 transition-all duration-300">
                        <div className="flex items-center justify-between mb-8">
                            <div className="w-14 h-14 rounded-2xl bg-[#e5f6ef] flex items-center justify-center">
                                <CalendarCheck className="text-[#285A48]" />
                            </div>
                            <span className="text-sm text-gray-500">
                                Bookings
                            </span>
                        </div>
                        <h2 className="text-4xl font-bold text-[#091413] mb-2">
                            {stats.totalBookings}
                        </h2>
                        <p className="text-sm text-[#408A71]">
                            Total platform bookings
                        </p>
                    </div>
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
                            ₹{stats.totalRevenue}
                        </h2>
                        <p className="text-sm text-[#B0E4CC]">
                            Approved bookings revenue
                        </p>
                    </div>
                </div>

                {/* RECENT SECTION */}
                <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-10">
                    {/* USERS */}
                    <div className="bg-white rounded-[30px] p-6 border border-[#dcefe7] shadow-sm">
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-2xl font-bold text-[#091413]">
                                Recent Users
                            </h2>
                            <div className="w-10 h-10 rounded-xl bg-[#B0E4CC] flex items-center justify-center">
                                <Users size={18} className="text-[#091413]" />
                            </div>
                        </div>
                        <div className="space-y-5">
                            {stats.recentUsers.slice(0, 4).map((user) => (
                                <div
                                    key={user._id}
                                    className="flex items-center justify-between"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-2xl bg-[#091413] text-white flex items-center justify-center font-bold">
                                            {user.name.charAt(0)}
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-[#091413]">
                                                {user.name}
                                            </h4>
                                            <p className="text-sm text-gray-500">
                                                {user.email}
                                            </p>
                                        </div>
                                    </div>
                                    <span className={`text-xs px-3 py-1 rounded-full ${user.isVerified
                                        ? "bg-green-100 text-green-700"
                                        : "bg-red-100 text-red-700"
                                        }`}>
                                        {user.isVerified ? "Verified" : "Pending"}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* VEHICLES */}
                    <div className="bg-white rounded-[30px] p-6 border border-[#dcefe7] shadow-sm">
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-2xl font-bold text-[#091413]">
                                Recent Vehicles
                            </h2>
                            <div className="w-10 h-10 rounded-xl bg-[#e7f5ef] flex items-center justify-center">
                                <CarFront size={18} className="text-[#285A48]" />
                            </div>
                        </div>
                        <div className="space-y-5">
                            {stats.recentVehicles.slice(0, 4).map((vehicle) => (
                                <div
                                    key={vehicle._id}
                                    className="flex items-center justify-between"
                                >
                                    <div>
                                        <h4 className="font-semibold text-[#091413]">
                                            {vehicle.name}
                                        </h4>
                                        <p className="text-sm text-gray-500">
                                            Added by {vehicle.ownerId?.name}
                                        </p>
                                    </div>
                                    <span className={`text-xs px-3 py-1 rounded-full ${vehicle.isApproved
                                        ? "bg-green-100 text-green-700"
                                        : "bg-yellow-100 text-yellow-700"
                                        }`}>
                                        {vehicle.isApproved ? "Approved" : "Pending"}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* BOOKINGS */}
                    <div className="bg-white rounded-[30px] p-6 border border-[#dcefe7] shadow-sm">
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-2xl font-bold text-[#091413]">
                                Recent Bookings
                            </h2>
                            <div className="w-10 h-10 rounded-xl bg-[#B0E4CC] flex items-center justify-center">
                                <CalendarCheck size={18} className="text-[#091413]" />
                            </div>
                        </div>
                        <div className="space-y-5">
                            {stats.recentBookings.slice(0, 4).map((booking) => (
                                <div
                                    key={booking._id}
                                    className="flex items-center justify-between"
                                >
                                    <div>
                                        <h4 className="font-semibold text-[#091413]">
                                            {booking.vehicleId?.name}
                                        </h4>
                                        <p className="text-sm text-gray-500">
                                            Booking by {booking.userId?.name}
                                        </p>
                                    </div>
                                    <span className={`text-sm font-medium ${booking.status === "approved"
                                        ? "text-green-600"
                                        : booking.status === "rejected"
                                            ? "text-red-600"
                                            : "text-yellow-600"
                                        }`}>
                                        {booking.status}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                {/* QUICK ACTIONS */}
                <div className="mb-10">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-3xl font-bold text-[#091413]">
                            Quick Actions
                        </h2>
                        <div className="hidden md:flex items-center gap-2 text-[#285A48] font-medium">
                            Platform Controls
                            <ArrowRight size={18} />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                        <Link
                            to="/admin/dashboard/users"
                            className="group bg-[#091413] rounded-[30px] p-7 text-white hover:-translate-y-1 transition-all duration-300"
                        >
                            <div className="w-14 h-14 rounded-2xl bg-[#285A48] flex items-center justify-center mb-6">
                                <Users />
                            </div>
                            <h3 className="text-2xl font-semibold mb-3">
                                Manage Users
                            </h3>
                            <p className="text-[#B0E4CC] text-sm leading-relaxed mb-6">
                                View, verify and manage all registered users.
                            </p>
                            <div className="flex items-center gap-2 text-sm text-[#B0E4CC]">
                                Open Panel
                                <ArrowRight size={16} />
                            </div>
                        </Link>
                        <Link
                            to="/admin/dashboard/vehicles"
                            className="group bg-[#285A48] rounded-[30px] p-7 text-white hover:-translate-y-1 transition-all duration-300"
                        >
                            <div className="w-14 h-14 rounded-2xl bg-[#408A71] flex items-center justify-center mb-6">
                                <BadgeCheck />
                            </div>
                            <h3 className="text-2xl font-semibold mb-3">
                                Approve Vehicles
                            </h3>
                            <p className="text-[#B0E4CC] text-sm leading-relaxed mb-6">
                                Review pending vehicle approval requests.
                            </p>
                            <div className="flex items-center gap-2 text-sm text-[#B0E4CC]">
                                Open Panel
                                <ArrowRight size={16} />
                            </div>
                        </Link>
                        <div className="bg-white rounded-[30px] p-7 border border-[#dcefe7]">
                            <div className="w-14 h-14 rounded-2xl bg-[#e7f5ef] flex items-center justify-center mb-6">
                                <CalendarCheck className="text-[#285A48]" />
                            </div>
                            <h3 className="text-2xl font-semibold mb-3 text-[#091413]">
                                View Bookings
                            </h3>
                            <p className="text-gray-500 text-sm leading-relaxed">
                                Monitor latest bookings and customer activity.
                            </p>
                        </div>

                        <div className="bg-white rounded-[30px] p-7 border border-[#dcefe7]">
                            <div className="w-14 h-14 rounded-2xl bg-[#B0E4CC] flex items-center justify-center mb-6">
                                <ShieldCheck className="text-[#091413]" />
                            </div>
                            <h3 className="text-2xl font-semibold mb-3 text-[#091413]">
                                Manage Owners
                            </h3>
                            <p className="text-gray-500 text-sm leading-relaxed">
                                Handle owner verification and approval workflow.
                            </p>
                        </div>
                    </div>
                </div>
                {/* OUTLET */}
                <div className="mt-12">
                    <Outlet />
                </div>
            </div>
        </>
    );
};

export default AdminDashboard;