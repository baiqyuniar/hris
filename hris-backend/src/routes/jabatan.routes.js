const express = require("express");

const router = express.Router();

const jabatanController = require("../controller/jabatan.controller");

const authMiddleware = require("../middleware/auth.middleware");

const roleMiddleware = require("../middleware/role.middleware");

router.get("/", authMiddleware, jabatanController.getAll);

router.get("/:id", authMiddleware, jabatanController.getById);

router.post(
  "/",
  authMiddleware,
  roleMiddleware("admin"),
  jabatanController.create,
);

router.put(
  "/:id",
  authMiddleware,
  roleMiddleware("admin"),
  jabatanController.update,
);

router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware("admin"),
  jabatanController.remove,
);

module.exports = router;
