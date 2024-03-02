const express = require('express');
const { authMiddleware } = require('../middlewares/auth-middleware');
const { adminMiddleware } = require('../middlewares/admin-middleware');
const { getAllContactData } = require('../controller/admin-controllers');
const router = express.Router();

router.route("/contact").get(authMiddleware, adminMiddleware, getAllContactData);


module.exports = router;