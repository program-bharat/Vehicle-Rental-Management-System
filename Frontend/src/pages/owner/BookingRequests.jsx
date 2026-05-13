import { useEffect, useState } from "react";

import {
    getBookings,
    updateBookingStatus,
} from "../../api/bookingAPI";

import BookingRequestCard from "../../components/owner/BookingRequestCard";

const BookingRequests = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // FETCH BOOKINGS
    useEffect(() => {
        const fetchBookings = async () => {
            try {
                setLoading(true);
                const res = await getBookings();
                setBookings(res.data.data);
            } catch (error) {
                console.log(error);
                setError(
                    error.response?.data?.message ||
                    "Failed to fetch bookings"
                );
            } finally {
                setLoading(false);
            }
        };
        fetchBookings();

    }, []);

    // APPROVE
    const handleApprove = async (bookingId) => {
        try {
            await updateBookingStatus(bookingId, {
                status: "approved",
            });
            setBookings((prev) =>
                prev.map((booking) =>
                    booking._id === bookingId
                        ? { ...booking, status: "approved" }
                        : booking
                )
            );
        } catch (error) {
            console.log(error);
        }
    };

    // REJECT
    const handleReject = async (bookingId) => {
        try {
            await updateBookingStatus(bookingId, {
                status: "rejected",
            });
            setBookings((prev) =>
                prev.map((booking) =>
                    booking._id === bookingId
                        ? { ...booking, status: "rejected" }
                        : booking
                )
            );
        } catch (error) {
            console.log(error);
        }
    };

    if (loading) {
        return (
            <div className="text-center text-3xl font-bold py-20">
                Loading Booking Requests...
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center text-red-500 text-2xl font-bold py-20">
                {error}
            </div>
        );
    }

    return (
        <>
            <div>
                <h1 className="text-4xl font-bold mb-10">
                    Booking Requests
                </h1>
                {
                    bookings.length === 0 ? (
                        <h2 className="text-2xl font-semibold">
                            No Booking Requests Found
                        </h2>
                    ) : (
                        <div className="space-y-5">
                            {
                                bookings.map((booking) => (

                                    <BookingRequestCard
                                        key={booking._id}
                                        booking={booking}
                                        onApprove={handleApprove}
                                        onReject={handleReject}
                                    />
                                ))
                            }
                        </div>
                    )
                }

            </div>
        </>
    );
};

export default BookingRequests;