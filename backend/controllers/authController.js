const bcrypt = require("bcryptjs");
const User = require("../models/User");

/**
 * @route   POST /api/auth/register
 * @desc    Register new user
 * @access  Public
 */
exports.registerUser = async (req, res) => {
  try {
    const { name, email, age, password } = req.body;

    if (!name || !email || !age || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    if (age < 18) {
      return res.status(400).json({
        message: "Age must be at least 18",
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      age,
      password: hashedPassword,
    });

    await user.save();

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server error during registration",
    });
  }
};

/**
 * @route   POST /api/auth/login
 * @desc    Login user
 * @access  Public
 */
exports.loginUser = async (req, res) => {
  try {
    
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    req.session.userId = user._id;
    req.session.userRole = user.role;
    req.session.userName = user.name;

    res.json({ message: "Login successful" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};   


/**
 * @route   POST /api/auth/logout
 * @desc    Logout user
 * @access  Private
 */
exports.logoutUser = (req, res) => {
  req.session.destroy(() => {
    res.status(200).json({
      message: "Logout successful",
    });
  });
};
