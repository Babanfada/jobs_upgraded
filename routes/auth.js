const express = require("express");
const router = express.Router();

const auth = require("../middlewares/authenticate");
const testUser = require("../middlewares/testUserauth");
const {
  register,
  login,
  updateUser,
  uploadProductImage,
} = require("../controllers/auth");

router.route("/register").post(register); 
router.route("/upload").post(uploadProductImage);
router.route("/login").post(login);
router.route("/updateUser").patch(auth, testUser, updateUser);

module.exports = router;
