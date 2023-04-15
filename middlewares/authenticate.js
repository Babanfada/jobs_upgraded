const { UnauthenticatedError } = require("../errors");
// const User = require("../models/User");
const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    throw new UnauthenticatedError(
      "You need to be logged in to access this route"
    );
  }

  const token = authHeader.split(" ")[1];

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const testUser = payload.userId === "64230cf94473d91e00ff1ce1";
    // you can also use an email here
    req.user = {
      userId: payload.userId,
      testUser,
    };
    next();
  } catch (error) {
    throw new UnauthenticatedError("authentication invalid");
  }
};

module.exports = auth;
