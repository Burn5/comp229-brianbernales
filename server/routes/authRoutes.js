// server/routes/authRoutes.js
const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/logout", authController.logout);

router.post("/signin", authController.login);     // POST /api/auth/signin
router.get("/signout", authController.logout);    // GET /api/auth/signout

module.exports = router;
