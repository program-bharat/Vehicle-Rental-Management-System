const express = require('express');
const router = express.Router();

const { protect, authorize } = require('../middlewares/authMiddleware');
const { userToOwner, getAllUsers } = require('../controllers/userController');

// Admin can see all the users
router.get("/", protect, authorize('admin'), getAllUsers);
// Make user -> owner (only Admin can promote)
router.put("/make-owner/:id", protect, authorize('admin'), userToOwner);

module.exports = router;