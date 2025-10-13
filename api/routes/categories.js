const router = require("express").Router();
const Category = require("../models/Category");
const { verifyToken } = require("../middleware/auth");
const { asyncHandler, errorResponse } = require("../middleware/errorHandler");

router.post("/", verifyToken, asyncHandler(async (req, res) => {
  const newCat = new Category(req.body);
  const savedCat = await newCat.save();

  res.status(201).json({
    success: true,
    message: 'Category created successfully',
    category: savedCat
  });
}));

router.get("/", asyncHandler(async (req, res) => {
  const cats = await Category.find();

  res.status(200).json({
    success: true,
    count: cats.length,
    categories: cats
  });
}));

module.exports = router;