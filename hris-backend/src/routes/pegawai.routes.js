const express = require("express");

const router = express.Router();

const pegawaiController = require("../controller/pegawai.controller");

const authMiddleware = require("../middleware/auth.middleware");

const roleMiddleware = require("../middleware/role.middleware");

router.get("/", authMiddleware, pegawaiController.getAll);

router.get("/:id", authMiddleware, pegawaiController.getById);

router.get("/:id/gaji", authMiddleware, pegawaiController.getGaji);

router.post(
  "/",
  authMiddleware,
  roleMiddleware("admin"),
  pegawaiController.create,
);

router.put(
  "/:id",
  authMiddleware,
  roleMiddleware("admin"),
  pegawaiController.update,
);

router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware("admin"),
  pegawaiController.remove,
);

module.exports = router;
