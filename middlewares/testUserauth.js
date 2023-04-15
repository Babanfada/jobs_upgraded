const { BadRequestError } = require("../errors");

const testUser = (req, res, next) => {
  if (req.user.testUser) {
    throw new BadRequestError("test user is Read only");
  }
  next();
};

module.exports = testUser;
