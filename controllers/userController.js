const User = require("../models/User");
const bcrypt = require("bcrypt");

async function getUser(req, res) {
  console.log(body);
  return res.json({ message: "getUserController" });
}

async function getAllUsers(req, res) {
  const body = req.body;
  console.log(body);
  return res.json({ message: "getAllUsers" });
}

async function postUser(req, res) {
  console.log("in post user");
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

  await newUser.save();
  return res.json({ message: "New user created!" });
}

async function deleteUser(req, res) {
  const { email, password } = req.body;

  if (!email | !password) {
    return res.json({ message: "Email and password is required" });
  }
  const foundUser = await User.findOne({ email });

  if (!foundUser) {
    return res.json({ message: "No user found with that email" });
  }

  const passwordsMatch = await bcrypt.compare(password, foundUser.password);

  console.log(passwordsMatch);

  if (!passwordsMatch) {
    return res.json({ message: "password did not match" });
  }

  if (passwordsMatch) {
    const deletedUser = await User.deleteOne({ email });
    console.log(deletedUser);
  }

  return res.json({ message: "deleteUser" });
}

async function updateUser(req, res) {}

module.exports = { getUser, getAllUsers, postUser, deleteUser, updateUser };
