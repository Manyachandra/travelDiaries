const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const ActivityLog = require("../models/ActivityLog");
 
//REGISTER
router.post("/register", async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(req.body.password, salt);
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPass,
    });

    const user = await newUser.save();
    // best-effort log
    try {
      await ActivityLog.create({
        action: "register",
        userId: user?._id,
        username: user?.username,
        ip: req.headers["x-forwarded-for"]?.split(",")[0] || req.socket?.remoteAddress || "",
        userAgent: req.headers["user-agent"] || "",
        uaPlatform: req.headers["sec-ch-ua-platform"] || "",
        uaBrands: req.headers["sec-ch-ua"] || "",
        uaMobile: req.headers["sec-ch-ua-mobile"] || "",
        referer: req.headers["referer"] || "",
      });
    } catch (_) {}
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

//LOGIN
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      return res.status(400).json("Wrong credentials!");
    }

    const validated = await bcrypt.compare(req.body.password, user.password);
    if (!validated) {
      return res.status(400).json("Wrong credentials!");
    }

    const { password, ...others } = await user._doc;
  // best-effort log
  try {
    await ActivityLog.create({
      action: "login",
      userId: user?._id,
      username: user?.username,
      ip: req.headers["x-forwarded-for"]?.split(",")[0] || req.socket?.remoteAddress || "",
      userAgent: req.headers["user-agent"] || "",
      uaPlatform: req.headers["sec-ch-ua-platform"] || "",
      uaBrands: req.headers["sec-ch-ua"] || "",
      uaMobile: req.headers["sec-ch-ua-mobile"] || "",
      referer: req.headers["referer"] || "",
    });
  } catch (_) {}
  res.status(200).json(others);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;