const express = require("express");
const router = express.Router();

const authController = require("../controller/auth.controller");
const authMiddleware = require("../middleware/auth.middleware");

router.post("/login", authController.login);
router.get("/profile", authMiddleware, authController.profile);

module.exports = router;
