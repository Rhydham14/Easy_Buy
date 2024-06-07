const jwt = require('jsonwebtoken');
const Token = require("../Models/tokenModel");

const generateToken = (userId) => {
  const accessToken = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '15m' });
  const refreshToken = jwt.sign({ userId }, process.env.JWT_REFRESH_SECRET, { expiresIn: '7d' });

  const token = new Token({ userId, token: refreshToken });
  token.save();

  return { accessToken, refreshToken };
};

const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return null;
  }
};

const verifyRefreshToken = async (token) => {
  try {
    const payload = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
    const tokenDoc = await Token.findOne({ userId: payload.userId, token });
    if (!tokenDoc) throw new Error('Invalid refresh token');
    return payload;
  } catch (error) {
    throw new Error('Invalid refresh token');
  }
};

module.exports = { generateToken, verifyToken, verifyRefreshToken };
