const express = require('express');
const router = express.Router();
const { verifyAccess } = require('../controllers/access');
const { validateApiKey } = require('../middleware/auth');
const { asyncHandler } = require('../utils/asyncHandler');

// Access verification endpoint
router.post('/verify', validateApiKey, asyncHandler(verifyAccess));

module.exports = router;
