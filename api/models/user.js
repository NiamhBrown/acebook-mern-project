const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  forename: { type: String, required: true },
  surname: { type: String, required: true },
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  friends: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  profilePicture: { type: String, default: ""}
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
