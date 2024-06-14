import express from "express";
import {
  authenticateUserController,
  createResetSessionController,
  fetchUserController,
  forgotPasswordController,
  generateOTPController,
  loginUserController,
  registerUserController,
  resetPasswordController,
  sendEmailController,
  tokenVerificationController,
  updateUserController,
  verifyOTPController,
} from "../controllers/userController.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

router.post("/register", registerUserController);
router.post("/login", loginUserController);
router.post("/forgotPassword", forgotPasswordController);
router.post("/verifyOTP", verifyOTPController);

router.get("/", authMiddleware, tokenVerificationController);
router.get("/:userName", fetchUserController);

router.put("/updateUser", authMiddleware, updateUserController);

export default router;

// router.post("/authenticate", authenticateUserController);
// router.post("/registerMail", sendEmailController);
// router.get("/generateOTP", generateOTPController);
// router.get("/createResetSession", createResetSessionController);
// router.post("/resetPassword", resetPasswordController);
