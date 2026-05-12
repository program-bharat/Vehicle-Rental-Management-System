const express = require('express');
const router = express.Router();

const {
    getOwnerVehicles,
    createVehicle,
    updateVehicle,
    deleteVehicle,
    getPublicVehicles,
    getVehicleDetails,
    toggleAvailability
} = require('../controllers/vehicleController')
const { protect, authorize } = require('../middlewares/authMiddleware');
const upload = require('../middlewares/uploadMiddleware');

router.get("/public", getPublicVehicles);

router.get("/:id", getVehicleDetails);
router.get("/", protect, authorize('owner'), getOwnerVehicles);
router.post("/", protect, authorize('owner'), upload.single("image"), createVehicle);
router.put("/:id", protect, authorize('owner'), updateVehicle);
router.delete("/:id", protect, authorize('owner'), deleteVehicle);
router.put("/:id/availability", protect, authorize('owner'), toggleAvailability);

module.exports = router;