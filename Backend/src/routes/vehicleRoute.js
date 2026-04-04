const express = require('express');
const router = express.Router();

const { getVehicles, createVehicle, updateVehicle, deleteVehicle } = require('../controllers/vehicleController')
const { protect, authorize } = require('../middlewares/authMiddleware');

router.get("/", protect, authorize('owner'), getVehicles);
router.post("/", protect, authorize('owner'), createVehicle);
router.put("/:id", protect, authorize('owner'), updateVehicle);
router.delete("/:id", protect, authorize('owner'), deleteVehicle);

module.exports = router;