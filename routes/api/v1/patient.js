const express = require('express');
const router = express.Router();
const passport = require('passport');

const userController = require('../../../controllers/api/v1/user_controller');
// const { registerPatient } = require('../controllers/user_controller');

router.post('/register', passport.authenticate('jwt', {session: false}), userController.registerPatient);
router.post('/:id/create_report', passport.authenticate('jwt', {session: false}), userController.createReport);
router.get('/:id/all_reports', passport.authenticate('jwt', {session: false}), userController.allReports);
router.get('/:status', passport.authenticate('jwt', {session: false}), userController.allReportsStatus);

module.exports = router;