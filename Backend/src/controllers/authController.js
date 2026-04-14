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
exports.register = async (req, res, next) => {
    try {
        const { name, email, password, phone } = req.body;
        // Check if user Exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: 'User Already Exists'
            });
        }
        // hash Password
        const hashedPassword = await bcrypt.hash(password, 10);
        // create user
        const user = await User.create({
            name,
            email,
            phone,
            password: hashedPassword,
            role: 'user',
            isVerified: false
        });
        const userData = { // To hide the password in response
            id: user._id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            role: user.role
        }
        res.status(201).json({
            success: true,
            message: "User Registered Successfully",
            data: userData
        });
    } catch (error) {
        next(error);
    }
};

exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                success: false,
                message: 'Invalid email'
            });
        }
        // Compare Password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: 'Invalid password'
            });
        }
        res.status(200).json({
            success: true,
            message: "Login Successful",
            token: generateToken(user),
            data: {
                id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                role: user.role
            }
        });
    } catch (error) {
        next(error);
    }
}