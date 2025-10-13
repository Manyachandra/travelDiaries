const router = require("express").Router();
const User = require("../models/User");
const Post = require("../models/Post");
const { verifyToken } = require("../middleware/auth");
const { asyncHandler, errorResponse } = require("../middleware/errorHandler");

//CREATE POST
router.post("/", verifyToken, asyncHandler(async (req, res) => {
  // Ensure the username matches the authenticated user
  if (req.body.username !== req.user.username) {
    return errorResponse(res, 403, 'You can only create posts for your own account');
  }

  const newPost = new Post(req.body);
  const savedPost = await newPost.save();

  res.status(201).json({
    success: true,
    message: 'Post created successfully',
    post: savedPost
  });
}));

//UPDATE POST
router.put("/:id", verifyToken, asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);
  
  if (!post) {
    return errorResponse(res, 404, 'Post not found');
  }

  // Verify ownership
  if (post.username !== req.user.username) {
    return errorResponse(res, 403, 'You can update only your own posts');
  }

  const updatedPost = await Post.findByIdAndUpdate(
    req.params.id,
    { $set: req.body },
    { new: true, runValidators: true }
  );

  res.status(200).json({
    success: true,
    message: 'Post updated successfully',
    post: updatedPost
  });
}));

//DELETE POST
router.delete("/:id", verifyToken, asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);
  
  if (!post) {
    return errorResponse(res, 404, 'Post not found');
  }

  // Verify ownership
  if (post.username !== req.user.username) {
    return errorResponse(res, 403, 'You can delete only your own posts');
  }

  await Post.findByIdAndDelete(req.params.id);

  res.status(200).json({
    success: true,
    message: 'Post has been deleted'
  });
}));

//GET POST
router.get("/:id", asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);
  
  if (!post) {
    return errorResponse(res, 404, 'Post not found');
  }

  res.status(200).json({
    success: true,
    post
  });
}));

//GET ALL POSTS
router.get("/", asyncHandler(async (req, res) => {
  const { user: username, city, cat: catName } = req.query;
  
  let query = {};
  
  if (city) {
    query.city = city;
  } else if (username) {
    query.username = username;
  } else if (catName) {
    query.categories = { $in: [catName] };
  }

  const posts = await Post.find(query).sort({ createdAt: -1 }); // Sort by newest first

  res.status(200).json({
    success: true,
    count: posts.length,
    posts
  });
}));

module.exports = router;