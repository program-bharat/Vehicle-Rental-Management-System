const express = require('express');
const router = express.Router();

const {
    getVehiclesById,
    createVehicle,
    updateVehicle,
    deleteVehicle,
    getPublicVehicles,
    getVehicleDetails,
    toggleAvailability
} = require('../controllers/vehicleController')
const { protect, authorize } = require('../middlewares/authMiddleware');

router.get("/public", getPublicVehicles);

router.get("/:id", getVehicleDetails);
router.get("/", protect, authorize('owner'), getVehiclesById);
router.post("/", protect, authorize('owner'), createVehicle);
router.put("/:id", protect, authorize('owner'), updateVehicle);
router.delete("/:id", protect, authorize('owner'), deleteVehicle);
router.put("/:id/availability", protect, authorize('owner'), toggleAvailability);

module.exports = router;