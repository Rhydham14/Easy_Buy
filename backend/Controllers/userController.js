const userService = require("../Services/userService");
const tokenService = require("../Services/tokenService");
const User = require("../Models/userModel");
const Token = require("../Models/tokenModel");
const jwtSerivce = require("../Services/jwtService");
require('dotenv').config();

const register = async(req, res)=> {
  try {
    const { fullname, email, password, role } = req.body;
    const user = await userService.register({ fullname, email, password, role });
    const token = await tokenService.generateToken(user._id);
    const url = `${process.env.BASE_URL}/api/users/verify/${user._id}/${token}`;
    await userService.sendEmail(  
      user.email,
      'Verify your email',
      `Click this link to verify your email: <a href="${url}">Click to verify</a>`
    );
    res.status(200).json({ message: 'Registration successful. Please check your email for verification link.'});
  } catch (error) {
    if (error.message === 'Email already in use') {
      res.status(400).json({ error: error.message });
    } else {
      console.error("Error registering user:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
}

const verifyEmail = async(req, res)=> {
  try {
    const { userId, token } = req.params;
    const tokenDoc = await Token.findOne({ userId, token });
    if (!tokenDoc) {
      return res.status(400).json({ message: 'Invalid or expired token' });
    }
    await User.findByIdAndUpdate(userId, { isVerified: true });
    await Token.deleteOne({ _id: tokenDoc._id }); // Use deleteOne to remove the token document
    const loginUrl = `${process.env.REDIRECT}/login`;
    res.redirect(loginUrl);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userData = await userService.login({ email, password });

    if (userData.success) {
      const { user } = userData;
      const { accessToken, refreshToken } = jwtSerivce.generateToken(user._id);
      res.status(200).json({
        success: true,
        message: userData.message,
        user,
        accessToken,
        refreshToken,
      });
    } else {
      const { message } = userData;
      res.status(401).json({ success: false, message });
    }
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const updateUserProfile = async(req, res)=> {
  try {
    const userId = req.query;
    console.log("backend ID", userId); 
    const updateData = req.body;
    console.log("backend updateData", updateData); 
  
    const updatedUser = await userService.updateUserProfile(updateData, userId);
  
    res.status(200).json({ message: 'Profile updated successfully', user: updatedUser });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const refreshToken = async (req, res) => {
  const refreshToken = req.body.token;
  if (!refreshToken) return res.status(401).json({ message: 'Refresh token is required' });

  try {
    const payload = await tokenService.verifyRefreshToken(refreshToken);
    const { accessToken, refreshToken: newRefreshToken } = tokenService.generateToken(payload.userId);

    res.status(200).json({
      accessToken,
      refreshToken: newRefreshToken
    });
  } catch (error) {
    res.status(403).json({ message: error.message });
  }
};

module.exports = {
  register,
  verifyEmail,
  login,
  updateUserProfile,
  refreshToken
};
