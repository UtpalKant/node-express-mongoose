const express = require('express');
const router = express.Router();

const {enableCors} = require('../middlewares/cors.mddleware');
const { verifyToken } = require('../middlewares/auth.middleware');

const loginController = require('../src/login.module/login.controller');
const userController = require('../src/user.module/user.controller');
const adminController = require('../src/admin.module/admin.controller');

router.use(enableCors);
router.use(loginController);
router.use('/api', verifyToken, userController);
router.use('/admin',verifyToken, adminController);

module.exports = router;