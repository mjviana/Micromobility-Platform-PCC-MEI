const express = require("express");
const router = express.Router();
const cleanBody = require("../middlewares/cleanbody");
const AuthController = require("../controllers/user");
router.post("/signup", cleanBody, AuthController.Signup);
router.post("/login", cleanBody, AuthController.Login);
router.post("/activate", cleanBody, AuthController.Activate);
router.post("/forgot", cleanBody, AuthController.ForgotPassword);
router.post("/reset", cleanBody, AuthController.ResetPassword);
module.exports = router;