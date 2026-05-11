import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import { createBooking } from "../api/bookingAPI";
import { getVehicleDetails } from "../api/vehicleAPI";

const ConfirmBooking = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const vehicleId = location.state?.vehicleId;
    const bookingData = location.state?.bookingData;

    const [loading, setLoading] = useState(false);
    const [vehicle, setVehicle] = useState(null);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    useEffect(() => {
        const fetchVehicle = async () => {
            try {
                const res = await getVehicleDetails(vehicleId);
                setVehicle(res.data.data);
            } catch (error) {
                console.log(error);
            }
        };

        if (vehicleId) {
            fetchVehicle();
        }
    }, [vehicleId]);

    // IF USER DIRECTLY OPENS /confirm-booking
    if (!vehicle || !bookingData) {
        return (
            <>
                <div className="text-center py-20">
                    <h1 className="text-3xl font-bold mb-4">
                        No Booking Data Found
                    </h1>

                    <button
                        onClick={() => navigate("/")}
                        className="bg-black text-white px-6 py-3 rounded-xl cursor-pointer"
                    >
                        Go Home
                    </button>
                </div>
            </>
        );
    }

    // TOTAL DAYS
    const totalDays =
        (
            new Date(bookingData.endDate) -
            new Date(bookingData.startDate)
        ) /
        (1000 * 60 * 60 * 24) + 1;

    // TOTAL PRICE
    const totalPrice = totalDays * vehicle.pricePerDay;

    // CONFIRM BOOKING
    const handleConfirmBooking = async () => {
        try {
            setLoading(true);
            setError("");
            setSuccess("");

            const payload = {
                vehicleId: vehicle._id,
                startDate: bookingData.startDate,
                endDate: bookingData.endDate,
            };

            const res = await createBooking(payload);

            setSuccess(res.data.message || "Booking Created Successfully");

            setTimeout(() => {
                navigate("/my-bookings");
            }, 2000);

        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className="max-w-3xl mx-auto">
                <h1 className="text-4xl font-bold mb-8 text-center">
                    Confirm Booking
                </h1>

                {/* ERROR */}
                {
                    error && (
                        <div className="bg-red-100 text-red-600 p-4 rounded-xl mb-5">
                            {error}
                        </div>
                    )
                }

                {/* SUCCESS */}
                {
                    success && (
                        <div className="bg-green-100 text-green-700 p-4 rounded-xl mb-5">
                            {success}
                        </div>
                    )
                }

                {/* CARD */}
                <div className="border rounded-3xl overflow-hidden shadow-lg">
                    {/* IMAGE */}
                    <img
                        src={
                            vehicle.image ||
                            "https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg"
                        }
                        alt={vehicle.name}
                        className="w-full h-80 object-cover"
                    />

                    {/* DETAILS */}
                    <div className="p-8">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-4xl font-bold">
                                {vehicle.name}
                            </h2>
                            <span className="bg-black text-white px-5 py-2 rounded-full">
                                ₹{vehicle.pricePerDay}/day
                            </span>
                        </div>

                        {/* BOOKING DETAILS */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
                            <div className="border rounded-2xl p-5">
                                <p className="text-gray-500 mb-2">
                                    Start Date
                                </p>

                                <h3 className="text-xl font-semibold">
                                    {bookingData.startDate}
                                </h3>
                            </div>
                            <div className="border rounded-2xl p-5">
                                <p className="text-gray-500 mb-2">
                                    End Date
                                </p>

                                <h3 className="text-xl font-semibold">
                                    {bookingData.endDate}
                                </h3>
                            </div>
                            <div className="border rounded-2xl p-5">
                                <p className="text-gray-500 mb-2">
                                    Total Days
                                </p>

                                <h3 className="text-xl font-semibold">
                                    {totalDays} Days
                                </h3>
                            </div>
                            <div className="border rounded-2xl p-5">
                                <p className="text-gray-500 mb-2">
                                    Total Price
                                </p>

                                <h3 className="text-xl font-semibold">
                                    ₹{totalPrice}
                                </h3>
                            </div>
                        </div>

                        {/* BUTTON */}
                        <button
                            onClick={handleConfirmBooking}
                            disabled={loading}
                            className={`w-full py-4 rounded-2xl text-lg font-semibold transition
                                ${loading
                                    ? "bg-gray-400 text-white cursor-not-allowed"
                                    : "bg-black text-white hover:bg-gray-800 cursor-pointer"
                                }`}
                        >
                            {
                                loading
                                    ? "Processing Booking..."
                                    : "Confirm Booking"
                            }
                        </button>

                    </div>
                </div>
            </div>
        </>
    );
};

export default ConfirmBooking;