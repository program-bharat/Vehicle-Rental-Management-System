import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { createVehicle } from "../../api/vehicleAPI";

import VehicleForm from "../../components/owner/VehicleForm";

const AddVehicle = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        brand: "",
        model: "",
        type: "",
        fuelType: "",
        transmission: "",
        pricePerDay: "",
        image: null,
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // TEXT INPUTS
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    // IMAGE INPUT
    const handleImageChange = (e) => {
        setFormData({
            ...formData,
            image: e.target.files[0],
        });
    };

    // SUBMIT
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            setError("");
            const vehicleData = new FormData();
            vehicleData.append("name", formData.name);
            vehicleData.append("brand", formData.brand);
            vehicleData.append("model", formData.model);
            vehicleData.append("type", formData.type);
            vehicleData.append("fuelType", formData.fuelType);
            vehicleData.append("transmission", formData.transmission);
            vehicleData.append("pricePerDay", formData.pricePerDay);
            vehicleData.append("image", formData.image);

            const res = await createVehicle(vehicleData);

            navigate("/owner/dashboard/my-vehicles");
        } catch (error) {
            console.log(error);
            setError(
                error.response?.data?.message ||
                "Failed to create vehicle"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className="max-w-3xl mx-auto">
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-4xl font-bold">
                        Add Vehicle
                    </h1>
                </div>

                <VehicleForm
                    formData={formData}
                    handleChange={handleChange}
                    handleImageChange={handleImageChange}
                    handleSubmit={handleSubmit}
                    loading={loading}
                    buttonText="Add Vehicle"
                />

                {
                    error && (
                        <div className="bg-red-100 text-red-600 p-4 rounded-xl mt-5">
                            {error}
                        </div>
                    )
                }
            </div>
        </>
    );
};

export default AddVehicle;