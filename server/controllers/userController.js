import bcrypt from "bcrypt";
import User from "../models/User.js";
import { validateEmail, validatePassword } from "../utils/validation.js";

export const registerUserController = async (req, res) => {
  const { username, password, profile, email } = req.body;

  // Validate input fields
  if (!username || !password || !email) {
    return res
      .status(400)
      .json({ message: "Username, password, and email are required." });
  }

  if (username.length < 3) {
    return res
      .status(400)
      .json({ message: "Username must be at least 3 characters long." });
  }

  if (!validateEmail(email)) {
    return res.status(400).json({ message: "Invalid email format." });
  }

  if (!validatePassword(password)) {
    return res.status(400).json({
      message:
        "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character.",
    });
  }

  try {
    // Check if username already exists
    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      return res.status(400).json({ message: "Username already exists." });
    }

    // Check if email already exists
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ message: "Email already exists." });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      username,
      password: hashedPassword,
      profile,
      email,
    });

    // Save the user to the database
    await newUser.save();

    // Return a success response
    res.status(201).json({ message: "User registered successfully." });
  } catch (error) {
    res.status(500).json({ message: "Error while Registering User." });
  }
};

export const sendEmailController = (req, res) => {
  res.json({ message: "Send email logic here" });
};

export const authenticateUserController = (req, res) => {
  res.json({ message: "Authenticate user logic here" });
};

export const loginUserController = async (req, res) => {
  const { username, password } = req.body;

  // Check for missing credentials
  if (!username || !password) {
    return res
      .status(400)
      .json({ error: "Username and password are required" });
  }

  try {
    // Check if user exists in the database
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Compare password using bcrypt
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid password" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    res.json({ message: "Login successful", username: user.username, token });
  } catch (error) {
    res.status(500).json({ error: "Error while Logging in user." });
  }
};

export const fetchUserController = async (req, res) => {
  const { username } = req.query;

  // Check if username is provided in the query
  if (!username) {
    return res
      .status(400)
      .json({ error: "Username query parameter is required" });
  }

  try {
    // Check if user exists in the database
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Extract non-sensitive user data to return
    const { _id, username, email } = user;
    const userData = {
      id: _id,
      username,
      email,
    };

    res.json({ user: userData });
  } catch (error) {
    res.status(500).json({ error: "Error while fetching user Info." });
  }
};

export const generateOTPController = (req, res) => {
  res.json({ message: "Generate OTP logic here" });
};

export const verifyOTPController = (req, res) => {
  res.json({ message: "Verify OTP logic here" });
};

export const createResetSessionController = (req, res) => {
  res.json({ message: "Create reset session logic here" });
};

export const updateUserController = (req, res) => {
  res.json({ message: "Update user logic here" });
};

export const resetPasswordController = (req, res) => {
  res.json({ message: "Reset password logic here" });
};
