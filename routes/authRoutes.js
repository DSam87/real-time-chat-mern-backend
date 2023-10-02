const { Signup, Login } = require("../controllers/authController");
const router = require("express").Router();
const { userVerification } = require("../middlewares/AuthMiddleware");

router.route("/").post(userVerification);

router.route("/signup").post(Signup);

router.route("/login").post(Login);

module.exports = router;
