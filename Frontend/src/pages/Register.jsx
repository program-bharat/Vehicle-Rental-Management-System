import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import { registerUser } from "../api/authAPI";

const Register = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        password: "",
    });

    const [error, setError] = useState("");

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setError("");
            const res = await registerUser(formData);
            navigate("/login");
        } catch (error) {
            setError(error);
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
                            Join RentiGo and start booking vehicles easily
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
                        />
                        <input
                            type="email"
                            name="email"
                            placeholder="Enter Email"
                            value={formData.email}
                            onChange={handleChange}
                            className="border border-[#B0E4CC] focus:border-[#408A71] focus:ring-2 focus:ring-[#B0E4CC] p-3 rounded-xl outline-none transition"
                        />
                        <input
                            type="text"
                            name="phone"
                            placeholder="Enter Phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="border border-[#B0E4CC] focus:border-[#408A71] focus:ring-2 focus:ring-[#B0E4CC] p-3 rounded-xl outline-none transition"
                        />
                        <input
                            type="password"
                            name="password"
                            placeholder="Enter Password"
                            value={formData.password}
                            onChange={handleChange}
                            className="border border-[#B0E4CC] focus:border-[#408A71] focus:ring-2 focus:ring-[#B0E4CC] p-3 rounded-xl outline-none transition"
                        />
                        <button
                            type="submit"
                            className="bg-[#091413] hover:bg-[#285A48] text-white p-3 rounded-xl transition cursor-pointer"
                        >
                            Create Account
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
                        {
                            error && (
                                <div className="bg-red-100 text-red-600 p-4 rounded-xl mt-5">
                                    {error}
                                </div>
                            )
                        }
                    </form>
                </div>
            </div>
        </>
    );
};

export default Register;