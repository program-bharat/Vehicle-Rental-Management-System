import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";

import { registerUser } from "../api/authAPI";

const Register = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
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
            setLoading(true);
            await registerUser(formData);
            toast.success("Account created successfully");
            setTimeout(() => {
                navigate("/login");
            }, 1500);
        } catch (error) {
            toast.error(
                error?.response?.data?.message || "Registration failed"
            );
        } finally {
            setLoading(false);
        }
    };
    return (
        <>
            <div className="min-h-[75vh] md:min-h-[75vh] lg:min-h-[85vh] flex items-center justify-center mt-3">
                <div className="w-full max-w-md border border-[#B0E4CC] bg-white rounded-2xl shadow-md p-8">
                    <div className="text-center mb-6">
                        <h1 className="text-3xl font-bold text-[#091413]">
                            Create Account
                        </h1>
                        <p className="text-gray-500 mt-2 text-sm">
                            Join RentWheel and start booking vehicles easily
                        </p>
                    </div>
                    <form
                        onSubmit={handleSubmit}
                        className="flex flex-col gap-4"
                    >
                        <input
                            type="text"
                            name="name"
                            placeholder="Enter Name"
                            value={formData.name}
                            onChange={handleChange}
                            className="border border-[#B0E4CC] focus:border-[#408A71] focus:ring-2 focus:ring-[#B0E4CC] p-3 rounded-xl outline-none transition"
                            required
                        />
                        <input
                            type="email"
                            name="email"
                            placeholder="Enter Email"
                            value={formData.email}
                            onChange={handleChange}
                            className="border border-[#B0E4CC] focus:border-[#408A71] focus:ring-2 focus:ring-[#B0E4CC] p-3 rounded-xl outline-none transition"
                            required
                        />
                        <input
                            type="tel"
                            name="phone"
                            placeholder="Enter Phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="border border-[#B0E4CC] focus:border-[#408A71] focus:ring-2 focus:ring-[#B0E4CC] p-3 rounded-xl outline-none transition"
                            required
                        />
                        <input
                            type="password"
                            name="password"
                            placeholder="Enter Password"
                            minLength={6}
                            value={formData.password}
                            onChange={handleChange}
                            className="border border-[#B0E4CC] focus:border-[#408A71] focus:ring-2 focus:ring-[#B0E4CC] p-3 rounded-xl outline-none transition"
                            required
                        />
                        <button
                            type="submit"
                            disabled={loading}
                            className="bg-[#091413] hover:bg-[#285A48] text-white p-3 rounded-xl transition cursor-pointer disabled:opacity-60"
                        >
                            {
                                loading
                                    ? "Creating Account..."
                                    : "Create Account"
                            }
                        </button>
                        <div className="text-center text-sm text-gray-600">
                            Already have an account?{" "}
                            <Link
                                to="/login"
                                className="text-[#285A48] font-semibold hover:text-[#408A71] transition"
                            >
                                Login
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Register;