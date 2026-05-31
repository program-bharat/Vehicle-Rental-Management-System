const express = require('express');
const router = express.Router();

const { createContact, getAllContacts, deleteContact } = require('../controllers/contactController');

const { protect, authorize } = require('../middlewares/authMiddleware');

router.post("/", createContact);

router.get("/", protect, authorize("admin"), getAllContacts);

router.delete("/:id", protect, authorize("admin"), deleteContact);

module.exports = router;