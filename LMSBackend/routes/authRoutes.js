const express = require("express");
const {
  register,
  login,
  forgotLogin,
} = require("../controllers/authController");
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/forgot", forgotLogin);
module.exports = router;
