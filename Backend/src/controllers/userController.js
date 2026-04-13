const User = require('../models/Users');
const Vehicle = require('../models/Vehicles')

exports.getAllUsers = async (req, res) => {
    try {
        const user = await User.find().select('-password');
        res.status(200).json({
            success: true,
            message: "All Users Fetched Successfully",
            data: user
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
}

exports.userToOwner = async (req, res) => {
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
        console.log(error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
}

exports.verifyUser = async (req, res) => {
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
        console.log(error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
}
exports.approveVehicle = async (req, res) => {
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
        console.log(error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
}