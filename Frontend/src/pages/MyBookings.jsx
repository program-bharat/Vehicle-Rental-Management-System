import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { getBookings } from "../api/bookingAPI";

const MyBookings = () => {

    const { role } = useSelector((state) => state.auth);

    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                setLoading(true);
                const res = await getBookings();
                setBookings([...res.data.data].reverse());
            } catch (error) {
                console.log(error);
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchBookings();

    }, []);

    if (loading) {
        return (
            <div className="text-center py-20 text-3xl font-bold">
                Loading Bookings...
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center py-20 text-red-500 text-2xl font-bold">
                {error}
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-8">
                {
                    role === "user"
                        ? "My Bookings"
                        : role === "owner"
                            ? "Vehicle Booking Requests"
                            : "All Bookings"
                }
            </h1>
            {
                bookings.length === 0 ? (
                    <h2 className="text-xl md:text-2xl font-semibold">
                        No Bookings Found
                    </h2>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                        {
                            bookings.map((booking) => (

                                <div
                                    key={booking._id}
                                    className="border rounded-2xl p-4 md:p-5 lg:p-6 shadow bg-white hover:shadow-lg transition"
                                >
                                    <div className="flex items-center justify-between mb-5">
                                        <h2 className="text-lg md:text-xl lg:text-2xl font-bold">
                                            {booking.vehicleId?.name}
                                        </h2>
                                        <span className="bg-black text-white px-3 py-1.5 rounded-xl text-xs md:text-sm">
                                            ₹{booking.vehicleId?.pricePerDay}/day
                                        </span>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <p className="text-gray-500 text-sm">
                                                Brand
                                            </p>
                                            <h3 className="font-semibold text-sm md:text-base">
                                                {booking.vehicleId?.brand}
                                            </h3>
                                        </div>
                                        <div>
                                            <p className="text-gray-500 text-sm">
                                                Fuel Type
                                            </p>
                                            <h3 className="font-semibold text-sm md:text-base">
                                                {booking.vehicleId?.fuelType}
                                            </h3>
                                        </div>
                                        <div>
                                            <p className="text-gray-500 text-sm">
                                                Start Date
                                            </p>
                                            <h3 className="font-semibold text-sm md:text-base">
                                                {
                                                    booking.startDate?.split("T")[0]
                                                }
                                            </h3>
                                        </div>
                                        <div>
                                            <p className="text-gray-500 text-sm">
                                                End Date
                                            </p>
                                            <h3 className="font-semibold text-sm md:text-base">
                                                {
                                                    booking.endDate?.split("T")[0]
                                                }
                                            </h3>
                                        </div>
                                        <div>
                                            <p className="text-gray-500 text-sm">
                                                Total Days
                                            </p>
                                            <h3 className="font-semibold text-sm md:text-base">
                                                {
                                                    Math.ceil(
                                                        (
                                                            new Date(booking.endDate) -
                                                            new Date(booking.startDate)
                                                        ) / (1000 * 60 * 60 * 24)
                                                    )
                                                } Days
                                            </h3>
                                        </div>
                                        <div>
                                            <p className="text-gray-500 text-sm">
                                                Total Price
                                            </p>
                                            <h3 className="font-semibold text-sm md:text-base text-green-600">
                                                ₹{booking.totalPrice}
                                            </h3>
                                        </div>
                                        <div>
                                            <p className="text-gray-500 text-sm">
                                                Status
                                            </p>
                                            <h3
                                                className={`font-semibold text-sm md:text-base capitalize
                                                    ${booking.status === "approved"
                                                        ? "text-green-600"
                                                        : booking.status === "rejected"
                                                            ? "text-red-600"
                                                            : "text-yellow-600"
                                                    }`}
                                            >
                                                {booking.status}
                                            </h3>
                                        </div>
                                        {
                                            role !== "user" && (
                                                <div>
                                                    <p className="text-gray-500 text-sm">
                                                        Booked By
                                                    </p>
                                                    <h3 className="font-semibold text-sm md:text-base">
                                                        {booking.userId?.name}
                                                    </h3>
                                                </div>
                                            )
                                        }
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                )
            }
        </div>
    );
};

export default MyBookings;