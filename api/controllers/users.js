const User = require("../models/user");
const { generateToken } = require("../lib/token");

const getAllUsers = async (req, res) => {
  const users = await User.find();
  const token = generateToken(req.user_id);
  res.status(200).json({ users: users, token: token });
};

const create = (req, res) => {
  const forename = req.body.forename;
  const surname = req.body.surname;
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;

  const user = new User({ forename, surname, username, email, password });
  user
    .save()
    .then((user) => {
      console.log("User created, id:", user._id.toString());
      res.status(201).json({ message: "OK" });
    })
    .catch((err) => {
      console.error(err);
      res.status(400).json({ message: "Something went wrong" });
    });
};

const addFriend = async (req, res) => {
  try {
    const userId = req.user_id;
    console.log("this is the userid?", userId);
    const friendId = req.body.friendUserId;
    console.log("this is the friendid?", friendId);
    const user = await User.findById(userId);

    console.log("this is the user", user);
    console.log("does the user exist?", user.friends.includes(friendId));
    if (user.friends.includes(friendId)) {
      return res.status(400).json({ message: "You are already friends!" });
    }

    if (!user.friends.includes(friendId)) {
      user.friends.push(friendId)
      await user.save();
    }
    const newToken = generateToken(req.user_id);
    res.status(200).json({ message: "Friend Added", token: newToken });
  } catch (error) {
    console.error("Internal server error:", error);
    res.status(500).json({ message: "Internal server error" });
};
};

const removeFriend = async (req, res) => {
  try {
    const userId = req.user_id;
    const friendId = req.body.friendUserId;

    const user = await User.findById(userId);

    const friendIndex = user.friends.indexOf(friendId);
    if (friendIndex === -1) {
      return res.status(400).json({ message: "You are not friends anyway" });
    }
    if (user.friends.includes(friendId)){
      user.friends.splice(friendIndex, 1);
      await user.save();
    }
    const newToken = generateToken(req.user_id);
    res.status(200).json({ message: "Friend removed", token: newToken });
  } catch (error) {
    console.error("Internal server error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const UsersController = {
  create: create,
  getAllUsers: getAllUsers,
  addFriend: addFriend,
  removeFriend: removeFriend
};

module.exports = UsersController;
