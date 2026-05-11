import { useState } from "react";
import { useNavigate } from "react-router-dom";

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
            <div className="max-w-md mx-auto mt-10 border p-6 rounded">
                <h1 className="text-3xl font-bold mb-6 text-center">
                    Register
                </h1>

                {
                    error && (
                        <p className="text-red-500 mb-3">
                            {error}
                        </p>
                    )
                }

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
                        className="border p-3 rounded"
                    />

                    <input
                        type="email"
                        name="email"
                        placeholder="Enter Email"
                        value={formData.email}
                        onChange={handleChange}
                        className="border p-3 rounded"
                    />

                    <input
                        type="text"
                        name="phone"
                        placeholder="Enter Phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="border p-3 rounded"
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="Enter Password"
                        value={formData.password}
                        onChange={handleChange}
                        className="border p-3 rounded"
                    />

                    <button
                        type="submit"
                        className="bg-black text-white p-3 rounded cursor-pointer"
                    >
                        Register
                    </button>
                </form>
            </div>
        </>
    );
};

export default Register;