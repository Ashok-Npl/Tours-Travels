const express = require('express');
const controller = require('../../controllers/admin/adminController');

const router = express.Router();
router.get('/', controller.dashboard);

module.exports = router;
