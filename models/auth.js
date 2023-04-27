const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const usersAuthSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "YOU NEED TO ENTER A NAME VALUE!!!"],
    maxlength: 50,
    minlength: 3,
  },
  email: {
    type: String,
    required: [true, "PLEASE PROVIDE EMAIL!!!!"],
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please provide a valid email",
    ],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "PLEASE PROVIDE PASSWORD!!!!"],
    minlength: 6,
  },
  lastName: {
    type: String,
    trim: true,
    maxlength: 20,
    default: "lastName",
  },
  location: {
    type: String,
    trim: true,
    maxlength: 20,
    default: "my city",
  },
  image: {
    type: String,
    required: [true, "please upload an avatar"],
    default:"there should be an avatar here"
  },
});

usersAuthSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  //return stops the execution of all the upcoming codes
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

usersAuthSchema.methods.createJWT = function () {
  return jwt.sign(
    { userId: this._id, name: this.name, email: this.email },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_LIFETIME }
  );
};

usersAuthSchema.methods.comparePassword = async function (canditatePassword) {
  const isMatch = await bcrypt.compare(canditatePassword, this.password);
  return isMatch;
};
module.exports = mongoose.model("USERAUTH", usersAuthSchema);
