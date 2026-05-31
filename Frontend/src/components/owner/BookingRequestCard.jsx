const BookingRequestCard = ({
    booking,
    onApprove,
    onReject,
}) => {

    return (
        <>
            <div className="border rounded-2xl p-4 md:p-5 lg:p-6 shadow bg-white hover:shadow-lg transition">
                <div className="flex items-center justify-between mb-5">
                    <h2 className="text-lg md:text-xl lg:text-2xl font-bold">
                        {booking.vehicleId?.name}
                    </h2>
                    <span
                        className={`px-3 py-1.5 rounded-xl text-xs md:text-sm text-white capitalize
                            ${booking.status === "approved"
                                ? "bg-green-600"
                                : booking.status === "rejected"
                                    ? "bg-red-600"
                                    : "bg-yellow-500"
                            }`}
                    >
                        {booking.status}
                    </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div>
                        <p className="text-gray-500 text-sm">
                            Customer Name
                        </p>
                        <h3 className="font-semibold text-sm md:text-base">
                            {booking.userId?.name}
                        </h3>
                    </div>
                    <div>
                        <p className="text-gray-500 text-sm">
                            Customer Email
                        </p>
                        <h3 className="font-semibold text-sm md:text-base break-all">
                            {booking.userId?.email}
                        </h3>
                    </div>
                    <div>
                        <p className="text-gray-500 text-sm">
                            Start Date
                        </p>
                        <h3 className="font-semibold text-sm md:text-base">
                            {booking.startDate?.split("T")[0]}
                        </h3>
                    </div>
                    <div>
                        <p className="text-gray-500 text-sm">
                            End Date
                        </p>
                        <h3 className="font-semibold text-sm md:text-base">
                            {booking.endDate?.split("T")[0]}
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
                            ₹{
                                Math.ceil(
                                    (
                                        new Date(booking.endDate) -
                                        new Date(booking.startDate)
                                    ) / (1000 * 60 * 60 * 24)
                                ) * booking.vehicleId?.pricePerDay
                            }
                        </h3>
                    </div>
                </div>
                {
                    booking.status === "pending" && (
                        <div className="flex gap-3">

                            <button
                                onClick={() => onApprove(booking._id)}
                                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-xl transition cursor-pointer"
                            >
                                Approve
                            </button>
                            <button
                                onClick={() => onReject(booking._id)}
                                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-xl transition cursor-pointer"
                            >
                                Reject
                            </button>

                        </div>
                    )
                }
            </div>
        </>
    );
};

export default BookingRequestCard;
