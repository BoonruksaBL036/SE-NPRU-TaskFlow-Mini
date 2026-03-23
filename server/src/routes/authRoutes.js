const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const { protect } = require("../middleware/authMiddleware");

router.post("/register", userController.register);
router.post("/login", userController.login);
router.post("/logout", userController.logOut);
router.get("/me", protect, userController.checkAuth);

module.exports = router;
