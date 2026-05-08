import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { loginUser } from "../api/authAPI";
import { setCredentials } from "../rtk/slices/authSlice";

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
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

            const res = await loginUser(formData);

            const { data: user, token } = res.data;

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
            setError(error);
        }
    };

    return (
        <>
            <div className="max-w-md mx-auto mt-10 border p-6 rounded">
                <h1 className="text-3xl font-bold mb-6 text-center">
                    Login
                </h1>

                {
                    error && (
                        <p className="text-red-500 mb-4">
                            {error}
                        </p>
                    )
                }

                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-4"
                >
                    <input
                        type="email"
                        name="email"
                        placeholder="Enter Email"
                        value={formData.email}
                        onChange={handleChange}
                        className="border p-3 rounded outline-none"
                        required
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="Enter Password"
                        value={formData.password}
                        onChange={handleChange}
                        className="border p-3 rounded outline-none"
                        required
                    />

                    <button
                        type="submit"
                        className="bg-black text-white p-3 rounded cursor-pointer"
                    >
                        Login
                    </button>
                </form>
            </div>
        </>
    );
};

export default Login;