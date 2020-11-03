const express = require("express");
const router = express.Router();
const authController = require("../control/authController");
const forgotController = require("../control/forgotPassController");
const resetController = require("../control/resetPassController");

router.post("/sign-in", authController.sign_in_post);

router.get("/log-in", authController.log_sign_in_get);

router.post("/log-in", authController.log_in_post);

router.get("/log-out", authController.log_out_get);

router.get("/forgot-password", forgotController.forgot_password_get);

router.post("/forgot-password", forgotController.forgot_password_post);

router.get("/reset-password/:id", resetController.reset_password_get);

router.put("/reset-password", resetController.reset_password_put);

router.get("/verify-account/:id", authController.verify_account_get);

module.exports = router;
