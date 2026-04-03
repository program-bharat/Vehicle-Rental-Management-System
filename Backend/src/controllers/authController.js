const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const User = require('../models/Users');

// Function to Generate JWT token
const generateToken = (user) => {
    return jwt.sign({
        id: user._id,
        role: user.role
    }, process.env.JWT_SECRET,
        { expiresIn: '7d' }
    );
}
exports.register = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        // Check if user Exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User Already Exists' });
        }
        // hash Password
        const hashedPassword = await bcrypt.hash(password, 10);
        // create user
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            role: 'user',
            isVerified: false
        });
        res.status(201).json({ message: "User Registered Successfully", user });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid userName' });
        }
        // Compare Password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid password' });
        }
        res.status(200).json({
            message: "Login Successful",
            token: generateToken(user)
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
}