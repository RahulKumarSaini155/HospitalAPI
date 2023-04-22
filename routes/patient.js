const express = require('express');
const router = express.Router();

const userController = require('../controllers/user_controller');
// const { registerPatient } = require('../controllers/user_controller');

router.post('/register', userController.registerPatient);
router.post('/:id/create_report', userController.createReport);
router.get('/:id/all_reports', userController.allReports);
router.get('/:status', userController.allReportsStatus);

module.exports = router;