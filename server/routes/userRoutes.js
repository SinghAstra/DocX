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
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

router.post("/register", registerUserController);
router.post("/login", loginUserController);
// router.post("/forgotPassword", forgotPasswordController);

router.get("/:userName", fetchUserController);

router.put("/updateUser", authMiddleware, updateUserController);

export default router;

// router.post("/authenticate", authenticateUserController);
// router.post("/registerMail", sendEmailController);
// router.get("/generateOTP", generateOTPController);
// router.get("/verifyOTP", verifyOTPController);
// router.get("/createResetSession", createResetSessionController);
// router.post("/resetPassword", resetPasswordController);
