const express = require('express');
const { authMiddleware } = require('../middlewares/auth-middleware');
const { adminMiddleware } = require('../middlewares/admin-middleware');
const { getAllContactData, getAllUsersData, getSingleUsersNotes ,deleteAllUserNotes, getUserContact, deleteUserContact} = require("../controller/admin-controllers");
const { generateOtpContact } = require('../controller/otp-controllers');
const router = express.Router();

router.route("/contact").get(authMiddleware, adminMiddleware, getAllContactData);
router.route("/users").get( authMiddleware, adminMiddleware, getAllUsersData);
router.route("/user/:id").get( authMiddleware, adminMiddleware, getSingleUsersNotes);
router.route("/user/note/delete/:id").delete( authMiddleware, adminMiddleware, deleteAllUserNotes);
router.route("/contact/:id").get(authMiddleware, adminMiddleware, getUserContact);
router.route("/contact/:id").post(authMiddleware, adminMiddleware, generateOtpContact);
router.route("/contact/:id").delete(authMiddleware, adminMiddleware, deleteUserContact);

module.exports = router;