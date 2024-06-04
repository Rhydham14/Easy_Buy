const userService = require("../Services/userService");
const tokenService = require("../Services/tokenService");
const User = require("../Models/userModel");
const Token = require("../Models/tokenModel");
require('dotenv').config();

const userController = {
 
    register: async (req, res) => {
      try {
        const { fullname, email, password, role } = req.body;
        const user = await userService.register({ fullname, email, password, role });
        const token = await tokenService.generateToken(user._id);
        const url = `${process.env.BASE_URL}/api/users/verify/${user._id}/${token}`;
        await userService.sendEmail(  
          user.email,
          'Verify your email',
          `Click this link to verify your email: <a href="${url}">Click to verify</a>`
        );        res.status(200).json({ message: 'Registration successful. Please check your email for verification link.'});
      } catch (error) {
        if (error.message === 'Email already in use') {
          res.status(400).json({ error: error.message });
        } else {
          console.error("Error registering user:", error);
          res.status(500).json({ error: "Internal server error" });
        }
      }
    },

  verifyEmail: async (req, res) => {
    try {
      const { userId, token } = req.params;
      const tokenDoc = await Token.findOne({ userId, token });
      if (!tokenDoc) {
        return res.status(400).json({ message: 'Invalid or expired token' });
      }
      await User.findByIdAndUpdate(userId, { isVerified: true });
      await Token.deleteOne({ _id: tokenDoc._id }); // Use deleteOne to remove the token document
      // res.status(200).json({ message: 'Email verified successfully', isVerified: true });
      const loginUrl = `${process.env.REDIRECT}/login`;

      res.redirect(loginUrl);

    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      // Call the login function from the userService
      const userData = await userService.login({ email, password });

      if (userData.success) {
        const { user} = userData;
       
        res.status(200).json({
          success: true,
          message: userData.message,  
          user,
        });
      } else {
        const { message } = userData;
        res.status(401).json({ success: false, message });
      }
    } catch (error) {
      console.error("Error logging in:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },
};

module.exports = userController;
