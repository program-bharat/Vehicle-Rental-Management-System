import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { logout } from "../../rtk/slices/authSlice";

const Navbar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { token, role } = useSelector((state) => state.auth);

    const handleLogout = () => {
        dispatch(logout());
        navigate("/login");
    };

    return (
        <>
            <div className="flex items-center justify-between p-4 border-b">
                <Link
                    to="/"
                    className="text-2xl font-bold"
                >
                    RentiGo
                </Link>

                <div className="flex items-center gap-4">
                    {
                        token && (
                            <Link to="/my-bookings">
                                {
                                    role === "user"
                                        ? "My Bookings"
                                        : role === "owner"
                                            ? "Booking Requests"
                                            : role === "admin"
                                                ? "All Bookings"
                                                : "Bookings"
                                }

                            </Link>
                        )
                    }
                    {
                        role === "owner" && (
                            <Link to="/owner/dashboard">
                                Owner Dashboard
                            </Link>
                        )
                    }

                    {
                        role === "admin" && (
                            <Link to="/admin/dashboard">
                                Admin Dashboard
                            </Link>
                        )
                    }

                    {
                        token ? (
                            <button
                                onClick={handleLogout}
                                className="bg-black text-white px-4 py-2 rounded cursor-pointer"
                            >
                                Logout
                            </button>
                        ) : (
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
        </>
    );
};

export default Navbar;