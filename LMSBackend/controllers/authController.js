const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// Email Validation (Regex for valid email format)
const emailRegex =
  /^\w+([\.-]?\w+)@[a-zA-Z]+(?:[a-zA-Z]+)\.(?:com|co|in|net|org|info)$/;

// Password Validation (Minimum 8 characters, at least one uppercase, one special character)
const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])[A-Za-z\d@$!%*?&]{8,}$/;

exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Validate email
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    // Validate password
    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        message:
          "Password must be at least 8 characters long, contain one uppercase letter and one special character",
      });
    }

    // Check if the email already exists in the database
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Encrypt password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate email
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    // Validate password
    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        message:
          "Password must be at least 8 characters long, contain one uppercase letter and one special character",
      });
    }

    // Find user by email
    const user = await User.findOne({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({ token, user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.forgotLogin = async (req, res) => {
  try {
    const { email, password, repassword } = req.body;

    // Validate email
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }
    if (password !== repassword) {
      return res.status(400).json({
        message: "Two passwords must be same.",
      });
    }
    // Validate password
    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        message:
          "Password must be at least 8 characters long, contain one uppercase letter and one special character",
      });
    }

    // Find user by email
    const user = await User.findOne({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Encrypt password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Update user's password
    await User.update({ password: hashedPassword }, { where: { email } });

    res.status(200).json({ message: "password changed successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
