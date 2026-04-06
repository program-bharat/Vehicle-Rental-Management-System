const express = require('express');
const router = express.Router();

const { protect, authorize } = require('../middlewares/authMiddleware');
const { createBooking, getBooking, updateBookingStatus } = require('../controllers/bookingController')

router.post("/", protect, authorize("user"), createBooking);
router.get("/", protect, getBooking);
// Owner Updates the Status of booking
router.put("/:id", protect, authorize("owner"), updateBookingStatus);

module.exports = router;