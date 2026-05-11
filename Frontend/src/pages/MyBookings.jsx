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

                setBookings(res.data.data);

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

            <h1 className="text-4xl font-bold mb-10">
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
                    <h2 className="text-2xl font-semibold">
                        No Bookings Found
                    </h2>
                ) : (
                    <div className="space-y-5">

                        {
                            bookings.map((booking) => (

                                <div
                                    key={booking._id}
                                    className="border rounded-2xl p-6 shadow"
                                >

                                    <div className="flex items-center justify-between mb-4">

                                        <h2 className="text-2xl font-bold">
                                            {booking.vehicleId?.name}
                                        </h2>

                                        <span className="bg-black text-white px-4 py-2 rounded-xl">
                                            ₹{booking.vehicleId?.pricePerDay}/day
                                        </span>

                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                                        <div>
                                            <p className="text-gray-500">
                                                Brand
                                            </p>

                                            <h3 className="font-semibold">
                                                {booking.vehicleId?.brand}
                                            </h3>
                                        </div>

                                        <div>
                                            <p className="text-gray-500">
                                                Fuel Type
                                            </p>

                                            <h3 className="font-semibold">
                                                {booking.vehicleId?.fuelType}
                                            </h3>
                                        </div>

                                        <div>
                                            <p className="text-gray-500">
                                                Start Date
                                            </p>

                                            <h3 className="font-semibold">
                                                {
                                                    booking.startDate?.split("T")[0]
                                                }
                                            </h3>
                                        </div>

                                        <div>
                                            <p className="text-gray-500">
                                                End Date
                                            </p>

                                            <h3 className="font-semibold">
                                                {
                                                    booking.endDate?.split("T")[0]
                                                }
                                            </h3>
                                        </div>

                                        <div>
                                            <p className="text-gray-500">
                                                Status
                                            </p>

                                            <h3 className="font-semibold capitalize">
                                                {booking.status}
                                            </h3>
                                        </div>

                                        {
                                            role !== "user" && (
                                                <div>
                                                    <p className="text-gray-500">
                                                        Booked By
                                                    </p>

                                                    <h3 className="font-semibold">
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