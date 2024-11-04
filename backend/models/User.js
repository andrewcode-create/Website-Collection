const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  salt: { type: String, required: true },
  settings: {
    theme: { type: String, default: "Light" }, // example setting
    notifications: { type: Boolean, default: true },
  },
});

module.exports = mongoose.model("User", userSchema);
