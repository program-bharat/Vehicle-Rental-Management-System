const User = require('../models/Users');
const Vehicle = require('../models/Vehicles')
const Booking = require('../models/Bookings')
const bcrypt = require("bcrypt");

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
// USER REQUEST OWNER ROLE
exports.requestOwnerRole = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }
        if (user.role === "owner") {
            return res.status(400).json({
                success: false,
                message: "You are already an owner"
            });
        }
        if (user.ownerRequestStatus === "pending") {
            return res.status(400).json({
                success: false,
                message: "Owner request already pending"
            });
        }
        user.ownerRequestStatus = "pending";
        await user.save();
        res.status(200).json({
            success: true,
            message: "Owner request sent successfully"
        });
    } catch (error) {
        next(error);
    }
};
// ADMIN APPROVE OWNER REQUEST
exports.approveOwnerRequest = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }
        user.role = "owner";
        user.ownerRequestStatus = "approved";
        user.ownerRequestSeen = false;
        await user.save();
        res.status(200).json({
            success: true,
            message: "Owner request approved successfully",
            data: user
        });
    } catch (error) {
        next(error);
    }
};
// ADMIN REJECT OWNER REQUEST
exports.rejectOwnerRequest = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }
        user.ownerRequestStatus = "rejected";
        user.ownerRequestSeen = false;
        await user.save();
        res.status(200).json({
            success: true,
            message: "Owner request rejected successfully"
        });
    } catch (error) {
        next(error);
    }
};
exports.markOwnerRequestSeen = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id);
        user.ownerRequestSeen = true;
        await user.save();
        res.status(200).json({
            success: true,
            message: "Owner request notification marked as seen"
        });
    } catch (error) {
        next(error);
    }
};
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
// GET LOGGED IN USER
exports.getMyProfile = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id)
            .select("-password -updatedAt -__v");
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }
        res.status(200).json({
            success: true,
            message: "Profile data fetched successfully",
            data: user
        });
    } catch (error) {
        next(error);
    }
};

// UPDATE PROFILE
exports.updateProfile = async (req, res, next) => {
    try {
        const { name, phone } = req.body;
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }
        user.name = name || user.name;
        user.phone = phone || user.phone;
        await user.save();
        res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            data: {
                id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                role: user.role,
                isVerified: user.isVerified,
                createdAt: user.createdAt
            }
        });
    } catch (error) {
        next(error);
    }
};
// CHANGE PASSWORD
exports.changePassword = async (req, res, next) => {
    try {
        const { currentPassword, newPassword, confirmPassword } = req.body;
        // Validation
        if (!currentPassword || !newPassword || !confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }
        if (newPassword !== confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "Passwords do not match"
            });
        }
        if (newPassword.length < 6) {
            return res.status(400).json({
                success: false,
                message: "Password must be at least 6 characters"
            });
        }
        // Find user
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }
        // Check current password
        const isMatch = await bcrypt.compare(
            currentPassword,
            user.password
        );
        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: "Current password is incorrect"
            });
        }
        // Hash new password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(newPassword, salt);
        await user.save();
        res.status(200).json({
            success: true,
            message: "Password changed successfully"
        });
    } catch (error) {
        next(error);
    }
};
exports.getAdminDashboardStats = async (req, res, next) => {
    try {
        const totalUsers = await User.countDocuments();
        const totalVehicles = await Vehicle.countDocuments();
        const pendingVehicles = await Vehicle.countDocuments({
            isApproved: false,
        });
        const totalBookings = await Booking.countDocuments();
        const revenueResult = await Booking.aggregate([
            {
                $match: {
                    status: "approved",
                },
            },
            {
                $group: {
                    _id: null,
                    totalRevenue: {
                        $sum: "$totalPrice",
                    },
                },
            },
        ]);
        const totalRevenue =
            revenueResult[0]?.totalRevenue || 0;
        const recentUsers = await User.find()
            .sort({ createdAt: -1 })
            .limit(5)
            .select("name email role createdAt isVerified");
        const recentVehicles = await Vehicle.find()
            .sort({ createdAt: -1 })
            .limit(5)
            .populate("ownerId", "name");
        const recentBookings = await Booking.find()
            .sort({ createdAt: -1 })
            .limit(5)
            .populate("userId", "name")
            .populate("vehicleId", "name");
        res.status(200).json({
            success: true,
            data: {
                totalUsers,
                totalVehicles,
                pendingVehicles,
                totalBookings,
                totalRevenue,
                recentUsers,
                recentVehicles,
                recentBookings,
            },
        });
    } catch (error) {
        next(error);
    }
};