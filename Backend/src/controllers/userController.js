const User = require('../models/Users');
const Vehicle = require('../models/Vehicles')

exports.getAllUsers = async (req, res) => {
    try {
        const user = await User.find().select('-password');
        res.status(200).json({ message: "All Users Fetched Successfully", user });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
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
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: `User Promoted to Owner`, user });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
}

exports.verifyUser = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(
            req.params.id,
            { isVerified: true },
            { new: true }
        )
        if (!user) {
            return res.status(404).json({ message: "User Not Found" });
        }
        res.status(200).json({ message: "User verified successfully", user })
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
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
            return res.status(404).json({ message: "Vehicle Not Found" });
        }
        res.status(200).json({ message: "Vehicle Approved Successfully", vehicle })
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
}