const User = require("../Models/userModel");
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");

const register = async (userData) => {
  const existingUser = await User.findOne({ email: userData.email });
  if (existingUser) {
    throw new Error("Email already in use");
  }
  const user = new User(userData);
  await user.save();
  return user;
};

const sendEmail = async (to, subject, text) => {
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL,
    to,
    subject,
    text,
  };

  await transporter.sendMail(mailOptions);
};

const login = async (userData) => {
  try {
    const user = await User.findOne({ email: userData.email });
    if (user) {
      const isPasswordCorrect = await bcrypt.compare(
        userData.password,
        user.password
      );
      if (isPasswordCorrect) {
        return { success: true, message: "Login successful", user: user };
      } else {
        return { success: false, message: "Invalid password" };
      }
    } else {
      return { success: false, message: "User not found" };
    }
  } catch (e) {
    return { success: false, message: "An error occurred", error: e };
  }
};

const updateUserProfile = async (updateData, userId) => {
  const updatedUser = await User.findByIdAndUpdate(
    userId,
    {
      fullname: updateData.fullname,
      email: updateData.email,
    },
    { new: true, runValidators: true }
  );
  return updatedUser;
};

module.exports = {
  register,
  sendEmail,
  login,
  updateUserProfile,
};
