const express = require("express");

const router = express.Router();

const dashboardController = require("../controller/dashboard.controller");

const auth = require("../middleware/auth.middleware");
const role = require("../middleware/role.middleware");

router.get("/admin", auth, role("admin"), dashboardController.adminDashboard);

router.get("/user", auth, role("user"), dashboardController.userDashboard);

module.exports = router;
