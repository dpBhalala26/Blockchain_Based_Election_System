const express = require('express');

const authRoutes = require('./auth.route');
const electionRoutes = require('./election.route')
const router = express.Router();

// localhost:4200/api/auth
router.use('/auth', authRoutes);
router.use('/election', electionRoutes);
module.exports = router;