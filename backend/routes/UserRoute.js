const express = require("express");

const router = express.Router();
const RoleMiddleware = require("../middleware/RoleMiddleware");
const AuthMiddleware = require("../middleware/AuthMiddleware");

const {
  getAllEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} = require("../controllers/UserController");

router.use(AuthMiddleware);

router.get("/", RoleMiddleware(["Manager"]), getAllEmployees);
router.get("/:id", RoleMiddleware(["Manager", "Employee"]), getEmployeeById);
router.post("/", RoleMiddleware(["Manager"]), createEmployee);
router.put("/:id", RoleMiddleware(["Manager"]), updateEmployee);
router.delete("/:id", RoleMiddleware(["Manager"]), deleteEmployee);

module.exports = router;
