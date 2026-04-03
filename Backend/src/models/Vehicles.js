const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
    ownerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    name: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        enum: ['2W', '4W'],
        required: true
    },
    brand: {
        type: String,
        required: true,
    },
    model: {
        type: String,
        required: true,
    },
    fuelType: {
        type: String,
        required: true,
    },
    transmission: {
        type: String,
        enum: ['automatic', 'manual']
    },
    pricePerDay: {
        type: Number,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    availability: {
        type: Boolean,
        default: true
    },
    isApproved: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

const Vehicle = mongoose.model("vehicle", vehicleSchema);
module.exports = Vehicle;