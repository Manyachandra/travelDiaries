const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const ActivityLog = require("../models/ActivityLog");
const { generateToken } = require("../middleware/auth");
const { asyncHandler, errorResponse } = require("../middleware/errorHandler");
 
//REGISTER
router.post("/register", asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  // Validation
  if (!username || !email || !password) {
    return errorResponse(res, 400, 'Username, email, and password are required');
  }

  if (password.length < 6) {
    return errorResponse(res, 400, 'Password must be at least 6 characters');
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPass = await bcrypt.hash(password, salt);
  const newUser = new User({
    username,
    email,
    password: hashedPass,
  });

  const user = await newUser.save();
  
  // best-effort activity log
  try {
    await ActivityLog.create({
      action: "register",
      userId: user._id,
      username: user.username,
      ip: req.headers["x-forwarded-for"]?.split(",")[0] || req.socket?.remoteAddress || "",
      userAgent: req.headers["user-agent"] || "",
      uaPlatform: req.headers["sec-ch-ua-platform"] || "",
      uaBrands: req.headers["sec-ch-ua"] || "",
      uaMobile: req.headers["sec-ch-ua-mobile"] || "",
      referer: req.headers["referer"] || "",
    });
  } catch (_) {}
  
  // Remove password from response
  const { password: _, ...userWithoutPassword } = user._doc;
  
  res.status(201).json({
    success: true,
    message: 'User registered successfully',
    user: userWithoutPassword
  });
}));

//LOGIN
router.post("/login", asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  // Validation
  if (!username || !password) {
    return errorResponse(res, 400, 'Username and password are required');
  }

  const user = await User.findOne({ username });
  if (!user) {
    return errorResponse(res, 400, 'Wrong credentials!');
  }

  const validated = await bcrypt.compare(password, user.password);
  if (!validated) {
    return errorResponse(res, 400, 'Wrong credentials!');
  }

  // Generate JWT token
  const token = generateToken(user._id.toString(), user.username);

  // best-effort activity log
  try {
    await ActivityLog.create({
      action: "login",
      userId: user._id,
      username: user.username,
      ip: req.headers["x-forwarded-for"]?.split(",")[0] || req.socket?.remoteAddress || "",
      userAgent: req.headers["user-agent"] || "",
      uaPlatform: req.headers["sec-ch-ua-platform"] || "",
      uaBrands: req.headers["sec-ch-ua"] || "",
      uaMobile: req.headers["sec-ch-ua-mobile"] || "",
      referer: req.headers["referer"] || "",
    });
  } catch (_) {}

  // Remove password from response
  const { password: _, ...userWithoutPassword } = user._doc;

  res.status(200).json({
    success: true,
    message: 'Login successful',
    token,
    user: userWithoutPassword
  });
}));

module.exports = router;