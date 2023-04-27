const USERAUTH = require("../models/auth");
const cloudinary = require("cloudinary").v2;
const fs = require('fs');
const {
  BadRequestError,
  UnauthenticatedError,
  notFoundError,
} = require("../errors");
const { StatusCodes } = require("http-status-codes");
const register = async (req, res) => {
  const user = await USERAUTH.create({ ...req.body });
  const token = user.createJWT();
  res.status(StatusCodes.CREATED).json({
    user: {
      email: user.email,
      lastName: user.lastName,
      location: user.location,
      name: user.name,
      image: user.image,
      token,
    },
  });
};
const login = async (req, res) => {
  // VALIDATE FISRT
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError("You need to provide login details");
  }
  const user = await USERAUTH.findOne({ email });
  if (!user) {
    throw new UnauthenticatedError(
      "You need to register first, user not registered"
    );
  }
  const isPasswordCorrect = await user.comparePassword(password);

  if (!isPasswordCorrect) {
    throw new UnauthenticatedError("Password is not correct, please check!!!");
  }

  const token = user.createJWT();
  res.status(StatusCodes.OK).json({
    user: {
      email: user.email,
      lastName: user.lastName,
      location: user.location,
      name: user.name,
      image: user.image,
      token,
    },
  });
};
const uploadProductImage = async (req, res) => {
  console.log(req.files.image);
  const result = await cloudinary.uploader.upload(
    req.files.image.tempFilePath,
    {
      use_filename: true,
      folder: "file_upload",
    }
  );
  console.log(result);
  res.status(StatusCodes.OK).json({
    image: {
      src: result.secure_url,
    },
  });
  fs.unlinkSync(req.files.image.tempFilePath);
};

const updateUser = async (req, res) => {
  const { email, lastName, location, name, image } = req.body;
  if (!email || !lastName || !location || !name) {
    throw new BadRequestError("You need to provide all fields");
  }
  const user = await USERAUTH.findOne({ _id: req.user.userId });
  user.email = email;
  user.lastName = lastName;
  user.location = location;
  user.name = name;
  user.image = image;
  await user.save();
  // Nb if you are using the above method to update user profile, you need to tell the schema in the user model not to hash the password the second time using this code if (!this.isModified('password')) return;, this is because you are presaving the the hashed password

  // const user = await USERAUTH.findByIdAndUpdate(
  //   { _id: req.user.userId },
  //   req.body,
  //   { new: true, runValidator: true }
  // );

  // if you are using this method, then no need to use this if (!this.isModified('password')) return;
  const token = user.createJWT();

  res.status(StatusCodes.OK).json({
    user: {
      email: user.email,
      lastName: user.lastName,
      location: user.location,
      name: user.name,
    },
    token,
  });
};
module.exports = {
  register,
  login,
  updateUser,
  uploadProductImage,
};
