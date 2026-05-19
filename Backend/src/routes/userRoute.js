const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middlewares/authMiddleware');
const { userToOwner,
    getAllUsers,
    verifyUser,
    approveVehicle,
    deleteUser,
    getOwnerAnalytics,
    getMyProfile,
    updateProfile
} = require('../controllers/userController');

// USER PROFILE
router.get("/profile/me", protect, getMyProfile);
router.put("/profile/update", protect, updateProfile);

// Admin can see all the users
router.get("/", protect, authorize('admin'), getAllUsers);

// Owner Analytics
router.get("/owner/analytics", protect, authorize('owner'), getOwnerAnalytics);

// Make user -> owner (only Admin can promote)
router.put("/make-owner/:id", protect, authorize('admin'), userToOwner);

// User --> isVerified: false->true
router.put("/:id/verify", protect, authorize('admin'), verifyUser);

// Vehicle --> isApproved: false->true
router.put("/vehicles/:id/approve", protect, authorize('admin'), approveVehicle);

// Admin can delete user 
router.delete("/:id", protect, authorize('admin'), deleteUser);

module.exports = router;