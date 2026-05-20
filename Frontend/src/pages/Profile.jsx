import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect, useRef } from "react";
import { toast } from "react-toastify";
import { getBookings } from "../api/bookingAPI";
import { logout, setCredentials } from "../rtk/slices/authSlice";
import { updateProfile, getMyProfile, markOwnerRequestSeen } from "../api/userAPI";
import {
    FaUserCircle, FaEnvelope, FaPhoneAlt, FaCalendarAlt, FaCheckCircle, FaCar, FaClipboardList, FaKey,
    FaSignOutAlt, FaChartBar, FaSave,
} from "react-icons/fa";

const Profile = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user, role, token } = useSelector((state) => state.auth);
    const [loading, setLoading] = useState(false);
    const [bookings, setBookings] = useState([]);
    const [showPasswordSection, setShowPasswordSection] = useState(false);
    const ownerToastShown = useRef(false);
    const [passwordData, setPasswordData] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
    });
    const [formData, setFormData] = useState({
        name: user?.name || "",
        phone: user?.phone || "",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handlePasswordChange = (e) => {
        setPasswordData({
            ...passwordData,
            [e.target.name]: e.target.value
        });
    };

    const handleLogout = () => {
        dispatch(logout());
        navigate("/login");
    };

    const handleUpdateProfile = async () => {
        try {
            setLoading(true);
            const res = await updateProfile(formData);
            dispatch(
                setCredentials({
                    token,
                    user: res.data.data,
                })
            );
            toast.success(res.data.message);
        } catch (error) {
            toast.error(error);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        if (ownerToastShown.current) return;
        const showOwnerToast = async () => {
            if (!user?.ownerRequestSeen && user?.ownerRequestStatus === "approved") {
                ownerToastShown.current = true;
                toast.success("Your owner request has been approved. You are now an owner.");
                await markOwnerRequestSeen();
            }
            else if (!user?.ownerRequestSeen && user?.ownerRequestStatus === "rejected") {
                ownerToastShown.current = true;
                toast.error("Your owner request was rejected by admin.");
                await markOwnerRequestSeen();
            }
        };
        showOwnerToast();
    }, [user]);
    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const res = await getBookings();
                setBookings(res.data.data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchBookings();
    }, []);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await getMyProfile();
                dispatch(
                    setCredentials({
                        token,
                        user: res.data.data
                    })
                );

                setFormData({
                    name: res.data.data.name || "",
                    phone: res.data.data.phone || ""
                });
            } catch (error) {
                console.log(error);
            }
        };

        fetchProfile();
    }, [dispatch, token]);

    const totalBookings = bookings.length;

    const pendingBookings = bookings.filter(
        (booking) => booking.status === "pending"
    ).length;

    const approvedBookings = bookings.filter(
        (booking) => booking.status === "approved"
    ).length;

    const rejectedBookings = bookings.filter(
        (booking) => booking.status === "rejected"
    ).length;

    return (
        <>
            <div className="bg-gray-50 min-h-screen">
                {/* PAGE HEADER */}
                <section className="bg-[#091413] text-white rounded-3xl px-8 py-14 mb-12">
                    <h1 className="text-5xl font-bold mb-4">
                        My Profile
                    </h1>

                    <p className="text-gray-300 text-lg">
                        Manage your account information and activity
                    </p>
                </section>
                {
                    user?.ownerRequestStatus === "pending" && (
                        <div className="mb-8 bg-yellow-100 text-yellow-700 px-4 py-3 rounded-xl">
                            Your owner request is pending admin approval.
                        </div>
                    )
                }
                {/* PROFILE HEADER CARD */}
                <section className="bg-white border border-[#D6EFE3] rounded-3xl p-8 mb-12">
                    <div className="flex flex-col sm:flex-row md:items-center gap-8">
                        {/* AVATAR */}
                        <div className="flex items-center justify-center">
                            <div className="bg-[#D6EFE3] h-32 w-32 rounded-full flex items-center justify-center">
                                <FaUserCircle className="text-7xl text-[#285A48]" />
                            </div>
                        </div>

                        {/* USER INFO */}
                        <div className="flex-1 flex flex-col items-center sm:items-start text-center md:text-left">
                            <div className="flex flex-wrap flex-col sm:flex-row items-center gap-4 mb-4">
                                <h2 className="text-4xl font-bold text-[#091413]">
                                    {formData.name}
                                </h2>

                                <div className="bg-[#D6EFE3] text-[#285A48] px-4 py-1 rounded-full capitalize font-semibold">
                                    {role}
                                </div>
                            </div>

                            <p className="text-gray-600 text-lg mb-4">
                                {user?.email}
                            </p>

                            <div className={`flex items-center gap-2 font-medium ${user?.isVerified ? "text-[#285A48]" : "text-red-500"}`}>
                                <FaCheckCircle />

                                <span>
                                    {user?.isVerified ? "Verified Account" : "Not Verified"}
                                </span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ACCOUNT INFORMATION */}
                <section className="bg-white border border-[#D6EFE3] rounded-3xl p-5 sm:p-8 mb-12">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-10">
                        <div>
                            <h2 className="text-2xl sm:text-3xl font-bold text-[#091413]">
                                Account Information
                            </h2>

                            <p className="text-gray-500 mt-2 text-sm sm:text-base">
                                Manage your personal account details
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* NAME */}
                        <div className="bg-[#F8FCFA] border border-[#D6EFE3] rounded-2xl p-5 flex items-start gap-4">
                            <div className="bg-[#D6EFE3] p-3 rounded-2xl">
                                <FaUserCircle className="text-[#285A48] text-2xl" />
                            </div>

                            <div className="w-full">
                                <p className="text-gray-500 mb-2 text-sm">
                                    Full Name
                                </p>

                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full bg-white border border-[#D6EFE3] rounded-xl px-4 py-3 outline-none focus:border-[#285A48]"
                                />
                            </div>
                        </div>

                        {/* EMAIL */}
                        <div className="bg-[#F8FCFA] border border-[#D6EFE3] rounded-2xl p-5 flex items-start gap-4">
                            <div className="bg-[#D6EFE3] p-3 rounded-2xl">
                                <FaEnvelope className="text-[#285A48] text-2xl" />
                            </div>

                            <div className="w-full">
                                <p className="text-gray-500 mb-2 text-sm">
                                    Email Address
                                </p>

                                <input
                                    type="email"
                                    value={user?.email}
                                    disabled
                                    className="w-full border border-[#D6EFE3] rounded-xl px-4 py-3 bg-gray-100 cursor-not-allowed"
                                />
                            </div>
                        </div>

                        {/* PHONE */}
                        <div className="bg-[#F8FCFA] border border-[#D6EFE3] rounded-2xl p-5 flex items-start gap-4">
                            <div className="bg-[#D6EFE3] p-3 rounded-2xl">
                                <FaPhoneAlt className="text-[#285A48] text-2xl" />
                            </div>

                            <div className="w-full">
                                <p className="text-gray-500 mb-2 text-sm">
                                    Phone Number
                                </p>

                                <input
                                    type="text"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className="w-full bg-white border border-[#D6EFE3] rounded-xl px-4 py-3 outline-none focus:border-[#285A48]"
                                />
                            </div>
                        </div>

                        {/* JOIN DATE */}
                        <div className="bg-[#F8FCFA] border border-[#D6EFE3] rounded-2xl p-5 flex items-start gap-4">
                            <div className="bg-[#D6EFE3] p-3 rounded-2xl">
                                <FaCalendarAlt className="text-[#285A48] text-2xl" />
                            </div>

                            <div>
                                <p className="text-gray-500 mb-2 text-sm">
                                    Joined Date
                                </p>

                                <h3 className="text-lg sm:text:sm font-semibold text-[#091413]">
                                    {new Date(user?.createdAt).toDateString()}
                                </h3>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row justify-end gap-4 mt-8">
                        <button
                            onClick={() => setShowPasswordSection(true)}
                            className="border border-[#285A48] hover:bg-[#285A48] hover:text-white text-[#285A48] px-6 py-3 rounded-2xl transition flex items-center justify-center gap-2 cursor-pointer font-medium"
                        >
                            <FaKey />
                            Change Password
                        </button>

                        <button
                            onClick={handleUpdateProfile}
                            disabled={loading}
                            className="bg-[#091413] hover:bg-[#285A48] text-white px-6 sm:px-8 py-3 rounded-2xl transition flex items-center justify-center gap-3 cursor-pointer disabled:opacity-60 font-medium"
                        >
                            <FaSave />

                            {
                                loading
                                    ? "Updating..."
                                    : "Update Profile"
                            }
                        </button>
                    </div>
                </section>

                {/* BOOKING SUMMARY */}
                <section className="mb-12">
                    <h2 className="text-3xl font-bold text-[#091413] mb-8">
                        Booking Summary
                    </h2>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        <div className="bg-white border border-[#D6EFE3] rounded-3xl p-8">
                            <h3 className="text-gray-500 mb-3">
                                Total Bookings
                            </h3>

                            <p className="text-5xl font-bold text-[#091413]">
                                {totalBookings}
                            </p>
                        </div>

                        <div className="bg-white border border-[#D6EFE3] rounded-3xl p-8">
                            <h3 className="text-gray-500 mb-3">
                                Pending Requests
                            </h3>

                            <p className="text-5xl font-bold text-yellow-600">
                                {pendingBookings}
                            </p>
                        </div>

                        <div className="bg-white border border-[#D6EFE3] rounded-3xl p-8">
                            <h3 className="text-gray-500 mb-3">
                                Approved Bookings
                            </h3>

                            <p className="text-5xl font-bold text-green-600">
                                {approvedBookings}
                            </p>
                        </div>

                        <div className="bg-white border border-[#D6EFE3] rounded-3xl p-8">
                            <h3 className="text-gray-500 mb-3">
                                Rejected Bookings
                            </h3>

                            <p className="text-5xl font-bold text-red-500">
                                {rejectedBookings}
                            </p>
                        </div>
                    </div>
                </section>

                {/* DASHBOARD QUICK ACCESS */}
                {
                    (role === "owner" || role === "admin") && (
                        <section className="bg-[#091413] text-white rounded-3xl p-8 mb-10">
                            <h2 className="text-3xl font-bold mb-8">
                                Dashboard Access
                            </h2>

                            <div className="flex flex-wrap gap-5">
                                {
                                    role === "owner" && (
                                        <Link
                                            to="/owner/dashboard"
                                            className="bg-[#285A48] hover:bg-[#408A71] px-6 py-4 rounded-2xl transition flex items-center gap-3"
                                        >
                                            <FaCar />
                                            Owner Dashboard
                                        </Link>
                                    )
                                }

                                {
                                    role === "admin" && (
                                        <Link
                                            to="/admin/dashboard"
                                            className="bg-[#285A48] hover:bg-[#408A71] px-6 py-4 rounded-2xl transition flex items-center gap-3"
                                        >
                                            <FaChartBar />
                                            Admin Dashboard
                                        </Link>
                                    )
                                }
                            </div>
                        </section>
                    )
                }
            </div>

            {
                showPasswordSection && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
                        <div className="bg-white w-full max-w-lg rounded-3xl p-8 relative">
                            <button
                                onClick={() => setShowPasswordSection(false)}
                                className="absolute top-4 right-5 text-2xl font-bold text-gray-500 hover:text-black cursor-pointer"
                            >
                                ×
                            </button>

                            <h2 className="text-3xl font-bold text-[#091413] mb-8">
                                Change Password
                            </h2>

                            <div className="flex flex-col gap-5">
                                <input
                                    type="password"
                                    name="currentPassword"
                                    placeholder="Current Password"
                                    value={passwordData.currentPassword}
                                    onChange={handlePasswordChange}
                                    className="border border-[#D6EFE3] rounded-xl px-4 py-3 outline-none focus:border-[#285A48]"
                                />

                                <input
                                    type="password"
                                    name="newPassword"
                                    placeholder="New Password"
                                    value={passwordData.newPassword}
                                    onChange={handlePasswordChange}
                                    className="border border-[#D6EFE3] rounded-xl px-4 py-3 outline-none focus:border-[#285A48]"
                                />

                                <input
                                    type="password"
                                    name="confirmPassword"
                                    placeholder="Confirm New Password"
                                    value={passwordData.confirmPassword}
                                    onChange={handlePasswordChange}
                                    className="border border-[#D6EFE3] rounded-xl px-4 py-3 outline-none focus:border-[#285A48]"
                                />

                                <button
                                    className="bg-[#091413] hover:bg-[#285A48] text-white py-3 rounded-2xl transition cursor-pointer"
                                >
                                    Update Password
                                </button>
                            </div>
                        </div>
                    </div>
                )
            }
        </>
    );
};

export default Profile;