const Contact = require('../models/Contact');
const User = require('../models/Users')
exports.createContact = async (req, res, next) => {
    try {
        const { name, email, subject, message } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User Not Found"
            });
        }
        if (user.role === "admin") {
            return res.status(403).json({
                success: false,
                message: "Admins cannot send contact messages"
            });
        }
        const contact = await Contact.create({
            name,
            email,
            subject,
            message,
            role: user.role
        });
        res.status(201).json({
            success: true,
            message: "Message Sent Successfully",
            data: contact
        });
    } catch (error) {
        next(error);
    }
};

exports.getAllContacts = async (req, res, next) => {
    try {
        const contacts = await Contact
            .find()
            .sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            count: contacts.length,
            data: contacts
        });
    } catch (error) {
        next(error);
    }
};

exports.deleteContact = async (req, res, next) => {
    try {
        const contact = await Contact.findById(req.params.id);
        if (!contact) {
            return res.status(404).json({
                success: false,
                message: "Contact Not Found"
            });
        }
        await Contact.findByIdAndDelete(req.params.id);
        res.status(200).json({
            success: true,
            message: "Contact Deleted Successfully"
        });
    } catch (error) {
        next(error);
    }
};