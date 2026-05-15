import { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { FaUserCircle, FaBars, FaTimes } from "react-icons/fa";

import { logout } from "../../rtk/slices/authSlice";

const Navbar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

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
    return (
        <>
            <nav className="border-b bg-white sticky top-0 z-50 shadow-sm">
                <div className="max-w-7xl mx-auto px-5 py-2 flex items-center justify-between">
                    <Link
                        to="/"
                        className="text-3xl font-bold tracking-tight"
                    >
                        RentiGo
                    </Link>
                    <div className="hidden md:flex items-center gap-8 text-[16px] font-medium">

                        <Link
                            to="/"
                            className="hover:text-gray-500 transition"
                        >
                            Home
                        </Link>
                        <Link
                            to="/vehicles"
                            className="hover:text-gray-500 transition"
                        >
                            Explore
                        </Link>
                        <Link
                            to="/about"
                            className="hover:text-gray-500 transition"
                        >
                            About
                        </Link>
                        <Link
                            to="/contact"
                            className="hover:text-gray-500 transition"
                        >
                            Contact
                        </Link>
                        {
                            role === "owner" && (
                                <Link
                                    to="/owner/dashboard"
                                    className="hover:text-gray-500 transition"
                                >
                                    Dashboard
                                </Link>
                            )
                        }
                        {
                            role === "admin" && (
                                <Link
                                    to="/admin/dashboard"
                                    className="hover:text-gray-500 transition"
                                >
                                    Dashboard
                                </Link>
                            )
                        }
                    </div>
                    {/* RIGHT SECTION */}
                    <div className="flex items-center justify-center gap-4">
                        {
                            token ? (
                                <div ref={profileRef} className="relative">
                                    <button
                                        onClick={() => setProfileOpen(!profileOpen)}
                                        className="flex items-center justify-center cursor-pointer"
                                    >
                                        <FaUserCircle className="text-[26px]" />
                                    </button>
                                    {
                                        profileOpen && (
                                            <div className="absolute right-0 top-14 w-64 bg-white border rounded-2xl shadow-lg p-5">

                                                <div className="border-b pb-4 mb-4">
                                                    <h2 className="text-xl font-bold">
                                                        {user?.name}
                                                    </h2>
                                                    <p className="text-gray-500 capitalize">
                                                        {role}
                                                    </p>
                                                </div>
                                                <div className="flex flex-col gap-3">
                                                    <button
                                                        onClick={() => navigate("/profile")}
                                                        className="bg-black text-white py-2 rounded-xl cursor-pointer"
                                                    >
                                                        Profile
                                                    </button>
                                                    <button
                                                        onClick={handleLogout}
                                                        className="border py-2 rounded-xl cursor-pointer"
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
                                        className="hover:text-gray-500 transition"
                                    >
                                        Login
                                    </Link>
                                    <Link
                                        to="/register"
                                        className="bg-black text-white px-5 py-2 rounded-xl hover:bg-gray-800 transition"
                                    >
                                        Register
                                    </Link>

                                </div>
                            )
                        }
                        {/* MOBILE MENU BUTTON */}
                        <button
                            onClick={() => setMenuOpen(!menuOpen)}
                            className="md:hidden text-2xl"
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
                        <div ref={menuRef} className="md:hidden border-t px-5 py-5 bg-white">
                            <div className="flex flex-col gap-5 text-lg">
                                <Link to="/">
                                    Home
                                </Link>
                                <Link to="/vehicles">
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