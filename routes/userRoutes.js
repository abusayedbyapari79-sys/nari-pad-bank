const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { auth, authorize } = require('../middleware/auth');

router.post('/create', auth, authorize('Admin', 'Associate', 'Supervisor'), userController.createUser);

module.exports = router;
