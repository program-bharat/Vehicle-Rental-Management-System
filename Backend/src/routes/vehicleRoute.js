const express = require('express');
const router = express.Router();

const {
    getOwnerVehicles,
    createVehicle,
    updateVehicle,
    deleteVehicle,
    getPublicVehicles,
    getVehicleDetails,
    getOwnerVehicleDetails,
    toggleAvailability,
    getPendingVehicles
} = require('../controllers/vehicleController')
const { protect, authorize } = require('../middlewares/authMiddleware');
const upload = require('../middlewares/uploadMiddleware');

router.get("/public", getPublicVehicles);
router.post("/", protect, authorize('owner'), upload.single("image"), createVehicle);
router.get("/", protect, authorize('owner'), getOwnerVehicles);
router.get("/pending/all", protect, authorize("admin"), getPendingVehicles);

router.get("/owner/:id", protect, authorize("owner"), getOwnerVehicleDetails);
router.get("/:id", getVehicleDetails);
router.put("/:id", protect, authorize('owner'), upload.single("image"), updateVehicle);
router.delete("/:id", protect, authorize('owner'), deleteVehicle);
router.put("/:id/availability", protect, authorize('owner'), toggleAvailability);

module.exports = router;