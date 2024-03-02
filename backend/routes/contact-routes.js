const express = require('express');
const { contactUs } = require('../controller/contact-controllers');
const router = express.Router();

router.route("/").post(contactUs);

module.exports = router;