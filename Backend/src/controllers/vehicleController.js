const Vehicle = require('../models/Vehicles');

exports.getVehicles = async (req, res) => {
    try {
        const vehicles = await Vehicle.find();
        res.json(vehicles);
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

    } catch (error) {

    }
}
exports.deleteVehicle = async (req, res) => {
    try {

    } catch (error) {

    }
}