const express = require('express');
const router = express.Router();
const memberController = require('../controllers/memberController');
const { auth, authorize } = require('../middleware/auth');

router.post('/register', auth, authorize('Admin', 'Associate', 'Supervisor', 'Centre'), memberController.registerMember);
router.get('/', auth, memberController.getMembers);

module.exports = router;
