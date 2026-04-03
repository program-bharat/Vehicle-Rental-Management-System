const express = require('express');
const router = express.Router();

const { getVehicles, createVehicle, updateVehicle, deleteVehicle } = require('../controllers/vehicleController')
const { protect, authorize } = require('../middlewares/authMiddleware');

router.get("/", protect, authorize('owner'), getVehicles);
router.post("/", protect, authorize('owner'), createVehicle);
router.put("/:id", updateVehicle);
router.delete("/:id", deleteVehicle);

module.exports = router;