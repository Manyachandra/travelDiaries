const router = require("express").Router();
const User = require("../models/User");
const Post = require("../models/Post");
const bcrypt = require("bcryptjs");
const { verifyToken, verifyOwnership } = require("../middleware/auth");
const { asyncHandler, errorResponse } = require("../middleware/errorHandler");

//UPDATE
router.put("/:id", verifyToken, verifyOwnership, asyncHandler(async (req, res) => {
  // Hash password if being updated
  if (req.body.password) {
    if (req.body.password.length < 6) {
      return errorResponse(res, 400, 'Password must be at least 6 characters');
    }
    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(req.body.password, salt);
  }

  const updatedUser = await User.findByIdAndUpdate(
    req.params.id,
    { $set: req.body },
    { new: true, runValidators: true }
  );

  if (!updatedUser) {
    return errorResponse(res, 404, 'User not found');
  }

  // Remove password from response
  const { password: _, ...userWithoutPassword } = updatedUser._doc;

  res.status(200).json({
    success: true,
    message: 'User updated successfully',
    user: userWithoutPassword
  });
}));

//DELETE
router.delete("/:id", verifyToken, verifyOwnership, asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  
  if (!user) {
    return errorResponse(res, 404, 'User not found');
  }

  // Delete all user's posts
  await Post.deleteMany({ username: user.username });
  
  // Delete user
  await User.findByIdAndDelete(req.params.id);

  res.status(200).json({
    success: true,
    message: 'User and all associated posts have been deleted'
  });
}));

//GET USER
router.get("/:id", asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  
  if (!user) {
    return errorResponse(res, 404, 'User not found');
  }

  // Remove password from response
  const { password: _, ...userWithoutPassword } = user._doc;

  res.status(200).json({
    success: true,
    user: userWithoutPassword
  });
}));

module.exports = router;