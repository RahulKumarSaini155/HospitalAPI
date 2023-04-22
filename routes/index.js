const express = require('express');
const router = express.Router();

router.use('/doctors', require('./api/v1/doctor'));
router.use('/patients', require('./api/v1/patient'));
router.use('/reports', require('./api/v1/patient'));

module.exports = router;