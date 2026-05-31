import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";

import { loginUser } from "../api/authAPI";
import { setCredentials } from "../rtk/slices/authSlice";

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await loginUser(formData);
            toast.success("Login successful", {
                position: "top-right",
                autoClose: 3000,
            });
            const user = res.data.data;
            const token = res.data.token;
            dispatch(setCredentials({ user, token }));
            if (user.role === "admin") {
                navigate("/admin/dashboard");
            }
            else if (user.role === "owner") {
                navigate("/owner/dashboard");
            }
            else {
                navigate("/");
            }
        } catch (error) {
            if (error === "Invalid email") {
                toast.error("Invalid email");
            }
            else if (error === "Invalid password") {
                toast.error("Invalid password");
            }
            else {
                toast.error("Login failed");
            }
        }
    }
    return (
        <>
            <div className="min-h-[75vh] md:min-h-[75vh] lg:min-h-[85vh] flex items-center justify-center">
                <div className="w-full max-w-md border border-[#B0E4CC] bg-white rounded-2xl shadow-md p-8">
                    <div className="text-center mb-6">
                        <h1 className="text-3xl font-bold text-[#091413]">
                            Welcome Back!
                        </h1>
                        <p className="text-gray-500 mt-2 text-sm">
                            Login to continue your journey with RentWheel
                        </p>
                    </div>
                    <form
                        onSubmit={handleSubmit}
                        className="flex flex-col gap-4"
                    >
                        <div>
                            <input
                                type="email"
                                name="email"
                                placeholder="Enter Email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full border border-[#B0E4CC] focus:border-[#408A71] focus:ring-2 focus:ring-[#B0E4CC] p-3 rounded-xl outline-none transition"
                                required
                            />
                        </div>
                        <div>
                            <input
                                type="password"
                                name="password"
                                placeholder="Enter Password"
                                value={formData.password}
                                onChange={handleChange}
                                className="w-full border border-[#B0E4CC] focus:border-[#408A71] focus:ring-2 focus:ring-[#B0E4CC] p-3 rounded-xl outline-none transition"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="bg-[#091413] hover:bg-[#285A48] text-white p-3 rounded-xl transition cursor-pointer"
                        >
                            Login
                        </button>
                        <div className="text-center text-sm text-gray-600">
                            Don&apos;t have an account?{" "}
                            <Link
                                to="/register"
                                className="text-[#285A48] font-semibold hover:text-[#408A71] transition"
                            >
                                Register now
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Login;