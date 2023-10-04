const User = require("../models/User");
require("dotenv").config();
const jwt = require("jsonwebtoken");

async function userVerification(req, res) {
  const token = req.cookies.token;
  if (!token) {
    return res.json({ status: false });
  }

  jwt.verify(token, process.env.TOKEN_KEY, async function (err, decoded) {
    if (err) {
      return res.json({ status: false });
    } else {
      const user = await User.findById(decoded.id);
      if (user) {
        return res.json({
          status: true,
          username: user.username,
          email: user.email,
        });
      } else {
        return res.json({ status: false });
      }
    }
  });
}

module.exports = { userVerification };
