import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";

import { loginUser } from "../api/authAPI";
import { setCredentials } from "../rtk/slices/authSlice";

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [errors, setErrors] = useState({
        email: "",
        password: "",
    });
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
        setErrors({
            ...errors,
            [e.target.name]: "",
        });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setErrors({
                email: "",
                password: "",
            });
            const res = await loginUser(formData);
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
                setErrors({
                    email: "Invalid email",
                    password: "",
                });
            }
            else if (error === "Invalid password") {
                setErrors({
                    email: "",
                    password: "Invalid password",
                });
            }
        }
    };
    return (
        <>
            <div className="min-h-[75vh] md:min-h-[75vh] lg:min-h-[85vh] flex items-center justify-center">
                <div className="w-full max-w-md border border-[#B0E4CC] bg-white rounded-2xl shadow-md p-8">
                    <div className="text-center mb-6">
                        <h1 className="text-3xl font-bold text-[#091413]">
                            Welcome Back!
                        </h1>
                        <p className="text-gray-500 mt-2 text-sm">
                            Login to continue your journey with RentiGo
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
                                className={`w-full border p-3 rounded-xl outline-none text-[#091413] transition ${errors.email
                                    ? "border-red-500 focus:ring-2 focus:ring-red-200"
                                    : "border-[#B0E4CC] focus:border-[#408A71] focus:ring-2 focus:ring-[#B0E4CC]"
                                    }`}
                                required
                            />
                            {
                                errors.email && (
                                    <p className="text-red-600 text-sm mt-1 ml-1 block">
                                        {errors.email}
                                    </p>
                                )
                            }
                        </div>
                        <div>
                            <input
                                type="password"
                                name="password"
                                placeholder="Enter Password"
                                value={formData.password}
                                onChange={handleChange}
                                className={`w-full border p-3 rounded-xl outline-none transition ${errors.password
                                    ? "border-red-500 focus:ring-2 focus:ring-red-200"
                                    : "border-[#B0E4CC] focus:border-[#408A71] focus:ring-2 focus:ring-[#B0E4CC]"
                                    }`}
                                required
                            />
                            {
                                errors.password && (
                                    <p className="text-red-600 text-sm mt-1 ml-1 block">
                                        {errors.password}
                                    </p>
                                )
                            }
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