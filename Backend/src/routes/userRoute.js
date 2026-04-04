const express = require('express');
const router = express.Router();

const { protect, authorize } = require('../middlewares/authMiddleware');
const { userToOwner, getAllUsers, verifyUser, approveVehicle } = require('../controllers/userController');

// Admin can see all the users
router.get("/", protect, authorize('admin'), getAllUsers);
// Make user -> owner (only Admin can promote)
router.put("/make-owner/:id", protect, authorize('admin'), userToOwner);

// User --> isVerified: false->true
router.put("/verify/:id", protect, authorize('admin'), verifyUser);

// Vehicle --> isApproved: false->true
router.put("/approveVehicle/:id", protect, authorize('admin'), approveVehicle);

module.exports = router;