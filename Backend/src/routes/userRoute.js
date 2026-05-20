const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middlewares/authMiddleware');
const {
    requestOwnerRole,
    approveOwnerRequest,
    rejectOwnerRequest,
    markOwnerRequestSeen,
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

// USER SEND OWNER REQUEST
router.put("/request-owner", protect, requestOwnerRole);

// ADMIN APPROVE OWNER REQUEST
router.put("/owner-request/:id/approve", protect, authorize('admin'), approveOwnerRequest);

// ADMIN REJECT OWNER REQUEST
router.put("/owner-request/:id/reject", protect, authorize('admin'), rejectOwnerRequest);

router.put("/owner-request/seen", protect, markOwnerRequestSeen);

// User --> isVerified: false->true
router.put("/:id/verify", protect, authorize('admin'), verifyUser);

// Vehicle --> isApproved: false->true
router.put("/vehicles/:id/approve", protect, authorize('admin'), approveVehicle);

// Admin can delete user 
router.delete("/:id", protect, authorize('admin'), deleteUser);

module.exports = router;