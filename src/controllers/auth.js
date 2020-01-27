const User = require("../models/user");
const { generateToken } = require("../utils/jwt");

const loginUser = async (req, res) => {
  const { username, password } = req.body;
  const existingUser = await User.findOne({ username }).exec();
  if (!existingUser) {
    return res.status(401).json("User name does not exist");
  }

  if (existingUser.password !== password) {
    return res.status(401).json("Invalid password");
  }
  const token = generateToken(existingUser._id);
  return res.json({ username, token });
};

module.exports = { loginUser };
