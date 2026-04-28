const express = require('express');
const router = express.Router();
const deliveryController = require('../controllers/deliveryController');
const { auth, authorize } = require('../middleware/auth');

router.post('/update', auth, authorize('Admin', 'Associate', 'Supervisor', 'Centre'), deliveryController.updateDelivery);

module.exports = router;
