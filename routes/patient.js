const express = require('express');
const router = express.Router();
const passport = require('passport');

const userController = require('../controllers/user_controller');
// const { registerPatient } = require('../controllers/user_controller');

router.post('/register', passport.authenticate('jwt', {session: false}), userController.registerPatient);
router.post('/:id/create_report', passport.authenticate('jwt', {session: false}), userController.createReport);
router.get('/:id/all_reports', userController.allReports);
router.get('/:status', userController.allReportsStatus);

module.exports = router;