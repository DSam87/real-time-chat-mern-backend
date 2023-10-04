const Post = require("../models/Post");
const User = require("../models/User");

async function getPost(req, res) {}

async function getAllPosts(req, res) {
  const posts = await Post.find();
  return res.json({ posts });
}

async function postPost(req, res) {
  console.log(req.body);

  const { email, username, post } = req.body;

  // find the user to add the new post id to the users array
  const currentUser = await User.findOne({ email });
  console.log(currentUser);

  if (!currentUser) {
    return res.json({ message: "user could not be found" });
  }

  // add the userid to the postBy on the new post module
  const newPost = new Post({ text: post, postedBy: currentUser._id });

  // add the newpost's id to the user's post array
  currentUser.posts.push(newPost._id);

  // save both the updated user and post to the db
  await newPost.save();
  await currentUser.save();

  res.json({ message: "new post added" });
}

async function deletePost(req, res) {}

async function updatePost(req, res) {}

module.exports = { getPost, updatePost, getAllPosts, postPost, deletePost };
