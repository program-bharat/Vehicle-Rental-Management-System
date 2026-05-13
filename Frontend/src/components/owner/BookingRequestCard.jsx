const BookingRequestCard = ({
    booking,
    onApprove,
    onReject,
}) => {

    return (
        <>
            <div className="border rounded-2xl p-6 shadow">

                <div className="flex items-center justify-between mb-4">

                    <h2 className="text-2xl font-bold">
                        {booking.vehicleId?.name}
                    </h2>

                    <span className="bg-black text-white px-4 py-2 rounded-xl capitalize">
                        {booking.status}
                    </span>

                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">

                    <div>
                        <p className="text-gray-500">
                            Customer Name
                        </p>

                        <h3 className="font-semibold">
                            {booking.userId?.name}
                        </h3>
                    </div>

                    <div>
                        <p className="text-gray-500">
                            Customer Email
                        </p>

                        <h3 className="font-semibold">
                            {booking.userId?.email}
                        </h3>
                    </div>

                    <div>
                        <p className="text-gray-500">
                            Start Date
                        </p>

                        <h3 className="font-semibold">
                            {booking.startDate?.split("T")[0]}
                        </h3>
                    </div>

                    <div>
                        <p className="text-gray-500">
                            End Date
                        </p>

                        <h3 className="font-semibold">
                            {booking.endDate?.split("T")[0]}
                        </h3>
                    </div>

                </div>

                {
                    booking.status === "pending" && (
                        <div className="flex gap-4">

                            <button
                                onClick={() => onApprove(booking._id)}
                                className="bg-green-600 text-white px-5 py-2 rounded-xl cursor-pointer"
                            >
                                Approve
                            </button>

                            <button
                                onClick={() => onReject(booking._id)}
                                className="bg-red-600 text-white px-5 py-2 rounded-xl cursor-pointer"
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
