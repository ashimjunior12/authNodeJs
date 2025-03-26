const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: [true, 'username is required'],
    unique: [true, 'username must be unique'],
  },
  email: {
    type: String,
    required: [true, 'email is required'],
    match: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    unique: [true, 'email must be unique'],
  },
  password: {
    type: String,
    required: [true, 'password is required'],
    minlength: [6, 'Password must be at least 6 characters long'],
  },
});

const User = mongoose.model("User", userSchema)

module.exports = User;