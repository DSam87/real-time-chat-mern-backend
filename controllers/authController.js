const User = require("../models/User");
const { createSecretToken } = require("../util/SecretToken");
const bcrypt = require("bcrypt");

const Signup = async (req, res, next) => {
  try {
    const { username, password, email } = req.body;
    if (!username | !password | !email) {
      return res.json({ message: "Need all redentials" });
    }

    const foundUser = await User.findOne({ email: email });

    if (foundUser) {
      return res.json({ message: "email already exists in the database" });
    }

    const bcryptPassword = await bcrypt.hash(password, 12);
    const newUser = new User({ username, password: bcryptPassword, email });

    const token = createSecretToken(newUser._id);

    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: false,
    });

    await newUser.save();

    res
      .status(201)
      .json({ message: "User signed in successfuly", success: true, newUser });

    next();
  } catch (error) {
    console.error(error);
  }
};

async function Login(req, res, next) {
  try {
    // checking if login reds are ok

    const { email, password } = req.body;

    if (!email | !password) {
      return res.json({ message: "All fields requred" });
    }

    // check if emal req matchs one on db
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.json({ message: "Incorrect password or email" });
    }

    // check existingUser to see if passed in password maches
    const passMatch = await bcrypt.compare(password, existingUser.password);
    if (!passMatch) {
      return res.json({ message: "Incorrect password or email" });
    }

    // all match and now we make our js token to pass to the client
    const token = createSecretToken(existingUser._id);

    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: false,
    });

    res
      .status(201)
      .json({ message: "User logged in successfully", success: true });

    next();
  } catch (error) {
    console.error(error);
  }
}

module.exports = { Signup, Login };
