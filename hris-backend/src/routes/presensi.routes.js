const express = require("express");

const router = express.Router();

const controller = require("../controller/presensi.controller");

const auth = require("../middleware/auth.middleware");

const role = require("../middleware/role.middleware");

router.get("/", auth, controller.getAll);

router.get("/:id", auth, controller.getById);

router.post("/", auth, role("admin"), controller.create);

router.put("/:id", auth, role("admin"), controller.update);

router.delete("/:id", auth, role("admin"), controller.remove);

module.exports = router;
