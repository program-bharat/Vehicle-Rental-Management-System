const Vehicle = require('../models/Vehicles');

exports.getVehicles = async (req, res) => {
    try {
        const vehicles = await Vehicle.find({ ownerId: req.user.id });
        res.json({ message: `Owner Vehicles Fetched Successfully`, vehicles });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
}
exports.createVehicle = async (req, res) => {
    try {
        const vehicle = await Vehicle.create({
            ownerId: req.user.id,
            ...req.body
        });
        res.status(201).json(vehicle);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
}
exports.updateVehicle = async (req, res) => {
    try {
        const vehicleID = req.params.id;
        const vehicle = await Vehicle.findById(vehicleID);
        if (!vehicle) {
            return res.status(404).json({ message: "Vehicle Not Found" });
        }
        // Check OwnerShip
        if (vehicle.ownerId.toString() !== req.user.id) {
            return res.status(403).json({ message: "Not Authorized" });
        }
        const updatedVehicle = await Vehicle.findByIdAndUpdate(
            vehicleID,
            req.body,
            { new: true }
        );
        res.status(200).json({
            message: "Vehicle Updated Successfully",
            vehicle: updatedVehicle
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
}
exports.deleteVehicle = async (req, res) => {
    try {
        const vehicleID = req.params.id;
        const vehicle = await Vehicle.findById(vehicleID);
        if (!vehicle) {
            return res.status(404).json({ message: "Vehicle Not Found" });
        }
        // Check OwnerShip
        if (vehicle.ownerId.toString() !== req.user.id) {
            return res.status(403).json({ message: "Not Authorized" });
        }
        await Vehicle.findByIdAndDelete(vehicleID);
        res.status(200).json({ message: "Vehicle Deleted Successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
}