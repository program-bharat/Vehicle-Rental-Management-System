const Vehicle = require('../models/Vehicles');
const User = require("../models/Users")

exports.getVehiclesById = async (req, res, next) => {
    try {
        const vehicles = await Vehicle.find({ ownerId: req.user.id })
            .select("-__v");
        res.status(200).json({
            success: true,
            message: `Owner Vehicles Fetched Successfully`,
            data: vehicles
        });
    } catch (error) {
        next(error);
    }
}
exports.createVehicle = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user.isVerified) {
            return res.status(403).json({
                success: false,
                message: "Only Verified Owners can add vehicles"
            });
        }
        const vehicle = await Vehicle.create({
            ownerId: req.user.id,
            ...req.body
        });
        res.status(201).json({
            success: true,
            message: "Vehicle Created Successfully",
            data: vehicle
        });
    } catch (error) {
        next(error);
    }
}
exports.updateVehicle = async (req, res, next) => {
    try {
        const vehicleID = req.params.id;
        const vehicle = await Vehicle.findById(vehicleID);
        if (!vehicle) {
            return res.status(404).json({
                success: false,
                message: "Vehicle Not Found"
            });
        }
        // Check OwnerShip
        if (vehicle.ownerId.toString() !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: "Not Authorized"
            });
        }
        const updatedVehicle = await Vehicle.findByIdAndUpdate(
            vehicleID,
            req.body,
            { new: true }
        );
        res.status(200).json({
            success: true,
            message: "Vehicle Updated Successfully",
            data: updatedVehicle
        });
    } catch (error) {
        next(error);
    }
}
exports.deleteVehicle = async (req, res, next) => {
    try {
        const vehicleID = req.params.id;
        const vehicle = await Vehicle.findById(vehicleID);
        if (!vehicle) {
            return res.status(404).json({
                success: false,
                message: "Vehicle Not Found"
            });
        }
        // Check OwnerShip
        if (vehicle.ownerId.toString() !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: "Not Authorized"
            });
        }
        await Vehicle.findByIdAndDelete(vehicleID);
        res.status(200).json({
            success: true,
            message: "Vehicle Deleted Successfully"
        });
    } catch (error) {
        next(error);
    }
}
exports.getPublicVehicles = async (req, res, next) => {
    try {
        const { type, fuelType, minPrice, maxPrice } = req.query;
        let filter = {
            isApproved: true,
            availability: true,
        }
        if (type) filter.type = type;
        if (fuelType) filter.fuelType = fuelType;
        if (minPrice || maxPrice) {
            filter.pricePerDay = {};
            if (minPrice) filter.pricePerDay.$gte = Number(minPrice);
            if (maxPrice) filter.pricePerDay.$lte = Number(maxPrice);
        }
        const vehicles = await Vehicle.find(filter).select('-createdAt -updatedAt -__v');
        res.status(200).json({
            success: true,
            message: "Public Vehicle Fetched",
            data: vehicles
        });
    } catch (error) {
        next(error);
    }
}
exports.getVehicleDetails = async (req, res, next) => {
    try {
        const vehicleId = req.params.id;
        const vehicle = await Vehicle.findById(vehicleId)
            .select("-createdAt -updatedAt -__v")
            .populate("ownerId", "-_id name email phone");
        if (!vehicle) {
            return res.status(404).json({
                success: false,
                message: "Vehicle Not Found"
            });
        }
        res.status(200).json({
            success: true,
            message: "Vehicle details Fetched",
            data: vehicle
        });
    } catch (error) {
        next(error);
    }
};