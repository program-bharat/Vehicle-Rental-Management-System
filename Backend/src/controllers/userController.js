const User = require('../models/Users');

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