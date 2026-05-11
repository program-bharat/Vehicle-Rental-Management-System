import { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { getVehicleDetails } from "../api/vehicleAPI";
import { setSelectedVehicle } from "../rtk/slices/vehicleSlice";

const VehicleDetails = () => {
    const { id } = useParams();

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const dateInputRef = useRef(null);

    const [vehicle, setVehicle] = useState(null);
    const [loading, setLoading] = useState(true);
    const [bookingData, setBookingData] = useState({
        startDate: "",
        endDate: "",
    });

    // FETCH SINGLE VEHICLE
    useEffect(() => {
        const fetchVehicle = async () => {
            try {
                setLoading(true);
                const res = await getVehicleDetails(id);
                setVehicle(res.data.data);
                dispatch(setSelectedVehicle(res.data.data));

            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };

        fetchVehicle();
    }, [id, dispatch]);

    // HANDLE DATE CHANGE
    const handleChange = (e) => {
        setBookingData({
            ...bookingData,
            [e.target.name]: e.target.value,
        });
    };

    // FOCUS DATE INPUT
    const handleFocusDate = () => {
        dateInputRef.current?.focus();
    };

    // BOOKING BUTTON
    const handleBooking = () => {
        if (!bookingData.startDate || !bookingData.endDate) {
            alert("Please select booking dates");
            return;
        }
        const startYear = bookingData.startDate.split("-")[0];
        const endYear = bookingData.endDate.split("-")[0];
        if (startYear.length !== 4 || endYear.length !== 4) {
            alert("Invalid date format");
            return;
        }
        navigate("/confirm-booking", {
            state: {
                vehicleId: vehicle._id,
                bookingData,
            }
        });
    };

    if (loading) {
        return (
            <>
                <div className="text-center text-3xl font-bold py-20">
                    Loading Vehicle...
                </div>
            </>
        );
    }

    if (!vehicle) {
        return (
            <>
                <div className="text-center text-3xl font-bold py-20">
                    Vehicle Not Found
                </div>
            </>
        );
    }

    return (
        <>
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                    {/* IMAGE */}
                    <div>
                        <img
                            src={
                                vehicle.image ||
                                "https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg"
                            }
                            alt={vehicle.name}
                            className="w-full h-[500px] object-cover rounded-3xl shadow-lg"
                        />
                    </div>

                    {/* DETAILS */}
                    <div>
                        <div className="flex items-center justify-between mb-4">
                            <h1 className="text-5xl font-bold text-gray-900">
                                {vehicle.name}
                            </h1>
                            <span className="bg-black text-white px-5 py-2 rounded-full text-lg">
                                ₹{vehicle.pricePerDay}/day
                            </span>
                        </div>

                        <p className="text-gray-600 text-lg mb-8">
                            Premium quality rental vehicle available for daily booking.
                        </p>

                        {/* SPECS */}
                        <div className="grid grid-cols-2 gap-4 mb-8">
                            <div className="border rounded-2xl p-4">
                                <p className="text-gray-500 mb-1">
                                    Brand
                                </p>
                                <h3 className="text-xl font-semibold">
                                    {vehicle.brand}
                                </h3>
                            </div>
                            <div className="border rounded-2xl p-4">
                                <p className="text-gray-500 mb-1">
                                    Type
                                </p>
                                <h3 className="text-xl font-semibold">
                                    {vehicle.type}
                                </h3>
                            </div>
                            <div className="border rounded-2xl p-4">
                                <p className="text-gray-500 mb-1">
                                    Fuel Type
                                </p>
                                <h3 className="text-xl font-semibold">
                                    {vehicle.fuelType}
                                </h3>
                            </div>
                            <div className="border rounded-2xl p-4">
                                <p className="text-gray-500 mb-1">
                                    Availability
                                </p>
                                <h3 className="text-xl font-semibold">
                                    {
                                        vehicle.availability
                                            ? "Available"
                                            : "Unavailable"
                                    }
                                </h3>
                            </div>
                        </div>
                        {/* OWNER INFO */}
                        <div className="border rounded-2xl p-6 mb-8">
                            <h2 className="text-2xl font-bold mb-4">
                                Owner Information
                            </h2>
                            <div className="space-y-2">
                                <p>
                                    <span className="font-semibold">
                                        Name:
                                    </span>{" "}
                                    {vehicle.ownerId?.name || "N/A"}
                                </p>
                                <p>
                                    <span className="font-semibold">
                                        Email:
                                    </span>{" "}
                                    {vehicle.ownerId?.email || "N/A"}
                                </p>
                                <p>
                                    <span className="font-semibold">
                                        Phone:
                                    </span>{" "}
                                    {vehicle.ownerId?.phone || "N/A"}
                                </p>
                            </div>
                        </div>
                        {/* BOOKING SECTION */}
                        <div className="border rounded-2xl p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-2xl font-bold">
                                    Select Booking Dates
                                </h2>
                                <button
                                    onClick={handleFocusDate}
                                    className="bg-gray-100 px-4 py-2 rounded-xl cursor-pointer"
                                >
                                    Focus Date Input
                                </button>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                                <input
                                    ref={dateInputRef}
                                    type="date"
                                    name="startDate"
                                    value={bookingData.startDate}
                                    onChange={handleChange}
                                    min={new Date().toISOString().split("T")[0]}
                                    className="border p-3 rounded-xl outline-none"
                                />
                                <input
                                    type="date"
                                    name="endDate"
                                    value={bookingData.endDate}
                                    onChange={handleChange}
                                    min={bookingData.startDate || new Date().toISOString().split("T")[0]}
                                    className="border p-3 rounded-xl outline-none"
                                />

                            </div>
                            <button
                                type="button"
                                onClick={handleBooking}
                                disabled={!vehicle.availability}
                                className={`w-full py-4 rounded-2xl text-lg font-semibold transition
                                    ${vehicle.availability
                                        ? "bg-black text-white hover:bg-gray-800 cursor-pointer"
                                        : "bg-gray-300 text-gray-500 cursor-not-allowed"
                                    }`}
                            >
                                Proceed To Booking
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default VehicleDetails;
