const User = require('../models/Users');
const Vehicle = require('../models/Vehicles')
const Booking = require('../models/Bookings')

exports.getAllUsers = async (req, res, next) => {
    try {
        const user = await User.find().select('-password -createdAt -updatedAt -__v');
        res.status(200).json({
            success: true,
            message: "All Users Fetched Successfully",
            data: user
        });
    } catch (error) {
        next(error);
    }
}
exports.deleteUser = async (req, res, next) => {
    try {
        const userId = req.params.id;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User Not Found"
            })
        }
        // Admin can't delete themselves
        if (user._id.toString() === req.user.id) {
            return res.status(400).json({
                success: false,
                message: "Admin can't delete themselves"
            })
        }
        await User.findByIdAndDelete(userId);
        res.status(200).json({
            success: true,
            message: "User Deleted Successfully",
        });
    } catch (error) {
        next(error);
    }
}
exports.userToOwner = async (req, res, next) => {
    try {
        const user = await User.findByIdAndUpdate(
            req.params.id,
            { role: 'owner' },
            { new: true } // returns the new object with updated value
        );
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }
        res.status(200).json({
            success: true,
            message: `User Promoted to Owner`,
            data: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                isVerified: user.isVerified
            }
        });
    } catch (error) {
        next(error);
    }
}
exports.verifyUser = async (req, res, next) => {
    try {
        const user = await User.findByIdAndUpdate(
            req.params.id,
            { isVerified: true },
            { new: true }
        ).select('-createdAt -updatedAt -__v');
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User Not Found"
            });
        }
        res.status(200).json({
            success: true,
            message: "User verified successfully",
            data: user
        })
    } catch (error) {
        next(error);
    }
}
exports.approveVehicle = async (req, res, next) => {
    try {
        const vehicle = await Vehicle.findByIdAndUpdate(
            req.params.id,
            { isApproved: true },
            { new: true }
        )
        if (!vehicle) {
            return res.status(404).json({
                success: false,
                message: "Vehicle Not Found"
            });
        }
        res.status(200).json({
            success: true,
            message: "Vehicle Approved Successfully",
            data: vehicle
        })
    } catch (error) {
        next(error);
    }
}
exports.getOwnerAnalytics = async (req, res, next) => {
    try {
        const ownerId = req.user.id;
        // Total Vehicles
        const vehicles = await Vehicle.find({ ownerId });
        const vehicleIds = vehicles.map(v => v._id);
        if (vehicleIds.length === 0) {
            return res.status(200).json({
                success: true,
                message: "Owner analytics fetched successfully",
                data: {
                    totalVehicles: 0,
                    totalBookings: 0,
                    totalRevenue: 0
                }
            });
        }
        // Total Booking
        const totalBookings = await Booking.countDocuments({
            vehicleId: { $in: vehicleIds }
        });
        // Total Revenue (only approved bookings)
        const revenueResult = await Booking.aggregate([
            {
                $match: {
                    vehicleId: { $in: vehicleIds },
                    status: "approved"
                }
            },
            {
                $group: {
                    _id: null,
                    totalRevenue: { $sum: "$totalPrice" }
                }
            }
        ]);
        const totalRevenue = revenueResult[0]?.totalRevenue || 0;
        res.status(200).json({
            success: true,
            message: "Owner analytics fetched successfully",
            data: {
                totalVehicles: vehicles.length,
                totalBookings,
                totalRevenue
            }
        });
    } catch (error) {
        next(error);
    }
}