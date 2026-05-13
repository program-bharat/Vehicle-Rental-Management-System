import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { getOwnerVehicleDetails, updateVehicle } from "../../api/vehicleAPI";

import VehicleForm from "../../components/owner/VehicleForm";

const EditVehicle = () => {
    const { id } = useParams();
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
    const [fetchLoading, setFetchLoading] = useState(true);
    const [error, setError] = useState("");

    // FETCH VEHICLE
    useEffect(() => {
        const fetchVehicle = async () => {
            try {
                setFetchLoading(true);
                const res = await getOwnerVehicleDetails(id);
                const vehicle = res.data.data;
                setFormData({
                    name: vehicle.name || "",
                    brand: vehicle.brand || "",
                    model: vehicle.model || "",
                    type: vehicle.type || "",
                    fuelType: vehicle.fuelType || "",
                    transmission: vehicle.transmission || "",
                    pricePerDay: vehicle.pricePerDay || "",
                    image: null,
                });
            } catch (error) {
                console.log(error);
                setError(
                    error.response?.data?.message ||
                    "Failed to fetch vehicle"
                );
            } finally {
                setFetchLoading(false);
            }
        };
        fetchVehicle();
    }, [id]);

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

            if (formData.image) {
                vehicleData.append("image", formData.image);
            }
            await updateVehicle(id, vehicleData);
            navigate("/owner/dashboard/my-vehicles");
        } catch (error) {
            console.log(error);
            setError(
                error.response?.data?.message ||
                "Failed to update vehicle"
            );
        } finally {
            setLoading(false);
        }
    };

    if (fetchLoading) {
        return (
            <div className="text-center text-3xl font-bold py-20">
                Loading Vehicle...
            </div>
        );
    }

    return (
        <>
            <div className="max-w-3xl mx-auto">
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-4xl font-bold">
                        Edit Vehicle
                    </h1>
                </div>
                <VehicleForm
                    formData={formData}
                    handleChange={handleChange}
                    handleImageChange={handleImageChange}
                    handleSubmit={handleSubmit}
                    loading={loading}
                    error={error}
                    buttonText="Update Vehicle"
                />
            </div>
        </>
    );
};

export default EditVehicle;