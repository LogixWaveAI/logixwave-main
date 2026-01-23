const express = require('express');
const router = express.Router();
const { sendContactEmail } = require('../controllers/contactController');

// /api/contact par POST request handle karega
router.post('/', sendContactEmail);

module.exports = router;