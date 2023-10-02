const express = require("express");
const router = express.Router();
const {
  getUser,
  getAllUsers,
  postUser,
  updateUser,
  deleteUser,
} = require("../controllers/userController");

router
  .route("/")
  .get(getUser)
  .post(postUser)
  .patch(updateUser)
  .delete(deleteUser);

module.exports = router;
