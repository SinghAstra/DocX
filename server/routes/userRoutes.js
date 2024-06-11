import express from "express";
import {
  authenticateUserController,
  createResetSessionController,
  fetchUserController,
  generateOTPController,
  loginUserController,
  registerUserController,
  resetPasswordController,
  sendEmailController,
  updateUserController,
  verifyOTPController,
} from "../controllers/userController.js";

const router = express.Router();

router.post("/register", registerUserController);
router.post("/registerMail", sendEmailController);
router.post("/authenticate", authenticateUserController);
router.post("/login", loginUserController);

router.get("/user/:username", fetchUserController);
router.get("/generateOTP", generateOTPController);
router.get("/verifyOTP", verifyOTPController);
router.get("/createResetSession", createResetSessionController);

router.put("/updateUser", updateUserController);
router.post("/resetPassword", resetPasswordController);

export default router;
