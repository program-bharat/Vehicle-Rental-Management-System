import { useEffect, useState, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { FaUserCircle, FaBars, FaTimes } from "react-icons/fa";

import { logout } from "../../rtk/slices/authSlice";

const Navbar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const { token, role, user } = useSelector((state) => state.auth);

    const [menuOpen, setMenuOpen] = useState(false);
    const [profileOpen, setProfileOpen] = useState(false);
    const profileRef = useRef(null);
    const menuRef = useRef(null);

    const handleLogout = () => {
        dispatch(logout());
        navigate("/login");
    };
    useEffect(() => {
        const handleClickOutside = (event) => {
            // PROFILE DROPDOWN
            if (profileRef.current && !profileRef.current.contains(event.target)) {
                setProfileOpen(false);
            }
            // MOBILE MENU
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setMenuOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);
    useEffect(() => {
        setMenuOpen(false);
        setProfileOpen(false);
    }, [location.pathname]);
    return (
        <>
            <nav className="border-b border-[#B0E4CC] bg-[#091413] sticky top-0 z-50 shadow-sm">
                <div className="max-w-7xl mx-auto px-5 py-2 flex items-center justify-between">
                    <Link
                        to="/"
                        className="text-3xl font-bold tracking-tight text-white"
                    >
                        RentiGo
                    </Link>
                    <div className="hidden md:flex items-center gap-8 text-[16px] font-medium text-white">

                        <Link
                            to="/"
                            className="text-white hover:text-[#408A71] transition"
                        >
                            Home
                        </Link>
                        <Link
                            to="/explore"
                            className="text-white hover:text-[#408A71] transition"
                        >
                            Explore
                        </Link>
                        <Link
                            to="/about"
                            className="text-white hover:text-[#408A71] transition"
                        >
                            About
                        </Link>
                        <Link
                            to="/contact"
                            className="text-white hover:text-[#408A71] transition"
                        >
                            Contact
                        </Link>
                        {
                            role === "owner" && (
                                <Link
                                    to="/owner/dashboard"
                                    className="text-white hover:text-[#408A71] transition"
                                >
                                    Dashboard
                                </Link>
                            )
                        }
                        {
                            role === "user" && (
                                <Link
                                    to="/my-bookings"
                                    className="text-white hover:text-[#408A71] transition"
                                >
                                    My Bookings
                                </Link>
                            )
                        }
                        {
                            role === "admin" && (
                                <Link
                                    to="/admin/dashboard"
                                    className="text-white hover:text-[#408A71] transition"
                                >
                                    Dashboard
                                </Link>
                            )
                        }
                    </div>
                    {/* RIGHT SECTION */}
                    <div className="flex items-center justify-center gap-4 text-white">
                        {
                            token ? (
                                <div ref={profileRef} className="relative">
                                    <button
                                        onClick={() => setProfileOpen(!profileOpen)}
                                        className="flex items-center justify-center cursor-pointer"
                                    >
                                        <FaUserCircle className="text-[26px] text-white" />
                                    </button>
                                    {
                                        profileOpen && (
                                            <div className="absolute right-0 top-14 w-64 bg-[#091413] border border-[#285A48] rounded-2xl shadow-lg p-5 text-white">

                                                <div className="border-b border-[#285A48] pb-4 mb-4">
                                                    <h2 className="text:sm font-bold">
                                                        {user?.name}
                                                    </h2>
                                                    <p className="text-[#408A71] capitalize">
                                                        {role}
                                                    </p>
                                                </div>
                                                <div className="flex flex-col gap-3">
                                                    <button
                                                        onClick={() => navigate("/profile")}
                                                        className="bg-[#091413] hover:bg-[#285A48] text-white py-2 rounded-xl transition cursor-pointer"
                                                    >
                                                        Profile
                                                    </button>
                                                    <button
                                                        onClick={handleLogout}
                                                        className="border border-[#285A48] hover:bg-[#285A48] text-white py-2 rounded-xl transition cursor-pointer"
                                                    >
                                                        Logout
                                                    </button>
                                                </div>
                                            </div>
                                        )
                                    }

                                </div>
                            ) : (
                                <div className="hidden md:flex items-center gap-4">
                                    <Link
                                        to="/login"
                                        className="text-white hover:text-[#408A71] transition"
                                    >
                                        Login
                                    </Link>
                                    <Link
                                        to="/register"
                                        className="bg-[#091413] text-white px-5 py-2 rounded-xl hover:bg-[#285A48] transition"
                                    >
                                        Register
                                    </Link>

                                </div>
                            )
                        }
                        {/* MOBILE MENU BUTTON */}
                        <button
                            onClick={() => setMenuOpen(!menuOpen)}
                            className="md:hidden text-2xl text-white"
                        >
                            {
                                menuOpen
                                    ? <FaTimes />
                                    : <FaBars />
                            }
                        </button>
                    </div>
                </div>
                {/* MOBILE MENU */}
                {
                    menuOpen && (
                        <div ref={menuRef} className="md:hidden border-t border-[#285A48] px-5 py-5 bg-[#091413] text-white">
                            <div className="flex flex-col gap-5 text-lg">
                                <Link to="/">
                                    Home
                                </Link>
                                <Link to="/explore">
                                    Explore
                                </Link>
                                <Link to="/about">
                                    About
                                </Link>
                                <Link to="/contact">
                                    Contact
                                </Link>
                                {
                                    role === "owner" && (
                                        <Link to="/owner/dashboard">
                                            Dashboard
                                        </Link>
                                    )
                                }
                                {
                                    role === "user" && (
                                        <Link to="/my-bookings">
                                            My Bookings
                                        </Link>
                                    )
                                }
                                {
                                    role === "admin" && (
                                        <Link to="/admin/dashboard">
                                            Dashboard
                                        </Link>
                                    )
                                }
                                {
                                    !token && (
                                        <>
                                            <Link to="/login">
                                                Login
                                            </Link>
                                            <Link to="/register">
                                                Register
                                            </Link>
                                        </>
                                    )
                                }
                            </div>
                        </div>
                    )
                }
            </nav>
        </>
    );
};

export default Navbar;