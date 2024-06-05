const Token = require("../Models/tokenModel");
const crypto = require("crypto");

generateToken = async(userId)=> {
  const token = crypto.randomBytes(32).toString("hex");
  const newToken = new Token({ userId, token });
  await newToken.save();
  return token;
}

module.exports = {
  generateToken
};
