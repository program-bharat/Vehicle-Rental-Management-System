const Booking = require('../models/Bookings');
const Vehicle = require('../models/Vehicles');

exports.createBooking = async (req, res) => {
    try {
        const { vehicleId, startDate, endDate } = req.body;
        const vehicle = await Vehicle.findById(vehicleId);
        // Check if exists and is approved
        if (!vehicle || !vehicle.isApproved) {
            return res.status(404).json({ message: "Vehicle not found" });
        }
        // Check Date conflicts
        const existingBooking = await Booking.findOne({
            vehicleId,
            status: { $in: ['pending', 'approved'] },
            startDate: { $lte: endDate },
            endDate: { $gte: startDate }
        });
        if (existingBooking) {
            return res.status(400).json({ message: "Vehicle already booked for selected dates" });
        }
        // Calculate total price
        const days = Math.ceil(
            (new Date(endDate).getTime() - new Date(startDate).getTime())
            / (1000 * 60 * 60 * 24)
        );
        const totalPrice = days * vehicle.pricePerDay;
        const booking = await Booking.create({
            userId: req.user.id,
            vehicleId,
            startDate,
            endDate,
            totalPrice,
            status: 'pending'
        });
        console.log(startDate, endDate)
        res.status(200).json({ message: "Booking Request Sent", booking });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
}
exports.getBooking = async (req, res) => {
    try {
        let bookings;
        // User can see his bookings 
        if (req.user.role === 'user') {
            bookings = await Booking.find({ userId: req.user.id })
                .populate("vehicleId", "-createdAt -updatedAt -__v");
        }
        // Owner can see bookings of their vehicles 
        else if (req.user.role === 'owner') {
            const vehicles = await Vehicle.find({ ownerId: req.user.id });
            const vehiclesIds = vehicles.map(v => v._id);
            bookings = await Booking.find({
                vehicleId: { $in: vehiclesIds }
            })
                .populate("vehicleId", "-createdAt -updatedAt -__v")
                .populate("userId", "-password -createdAt -updatedAt -__v");
            res.status(200).json({ message: "Booking Fetched", bookings });
        }
        // Admin can see all the bookings
        else if (req.user.role === 'admin') {
            bookings = await Booking.find()
                .populate("vehicleId", "-createdAt -updatedAt -__v")
                .populate("userId", "-password -createdAt -updatedAt -__v");
        }
        res.status(200).json({
            message: "Booking Fetched",
            bookings
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
}
exports.updateBookingStatus = async (req, res) => {
    try {
        const { status } = req.body;
        if (!['approved', 'rejected'].includes(status)) {
            return res.status(400).json({ message: "Invalid Status" });
        }
        const booking = await Booking.findById(req.params.id).populate("vehicleId");
        if (!booking) {
            return res.status(404).json({ message: "Booking not found" });
        }
        // Check Owner
        if (!booking.vehicleId.ownerId.equals(req.user.id)) {
            return res.status(403).json({ message: "Not Authorized" });
        }
        booking.status = status;
        await booking.save();
        res.status(200).json({ message: `Booking Status: ${status}`, booking });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
}