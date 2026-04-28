const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const memberController = require('../controllers/memberController');
const { auth, authorize } = require('../middleware/auth');

router.post('/approve-member', auth, authorize('Admin'), memberController.approveMember);
router.get('/dashboard', auth, authorize('Admin', 'Associate', 'Supervisor'), adminController.getDashboardStats);
router.get('/fraud-check', auth, authorize('Admin'), adminController.fraudCheck);

module.exports = router;
