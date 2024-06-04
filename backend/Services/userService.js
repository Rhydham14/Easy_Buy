const User = require("../Models/userModel");
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt'); // Add bcrypt for password hashing

const userService = {
  register: async (userData) => {
    try {
      const existingUser = await User.findOne({ email: userData.email });
      if (existingUser) {
        throw new Error('Email already in use');
      }

      // Create a new user with the plain text password
      const user = new User(userData);
      await user.save();
      return user;
    } catch (e) {
      throw e;
    }
  },

  sendEmail: async (to, subject, text) => {
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
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
  },

  login: async (userData) => {
    try {
      const user = await User.findOne({ email: userData.email });
      if (user) {
        // Compare the provided password with the hashed password in the database
        const isPasswordCorrect = await bcrypt.compare(userData.password, user.password);
        if (isPasswordCorrect) {
          return { success: true, message: 'Login successful', user: user };
        } else {
          return { success: false, message: 'Invalid password' };
        }
      } else {
        return { success: false, message: 'User not found' };
      }
    } catch (e) {
      return { success: false, message: 'An error occurred', error: e };
    }
  },

updateUserProfile: async (updateData,userId) => {
  try {
    console.log("Service id", userId);
    console.log("Service data", updateData);
    
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        fullname: updateData.fullname,
        email: updateData.email
      },
      { new: true, runValidators: true } // Returns the updated document and runs schema validators
    );

    console.log("Service user", updatedUser);
    return updatedUser;
  } catch (error) {
    throw error;
  }
},


  // updateProduct: async(updataData)=>{
  //   try{
  //     const _id = updataData._id;
  //     const updateData = await ProductModel.findByIdAndUpdate(
  //       {_id},
  //       {title:updataData.title,
  //         description:updataData.description,
  //         price:updataData.price,
  //         category:updataData.category,
  //         images:updataData.images
  //       }
  //     );
  //     return updateData;
  //   }catch(e){
      
  //   }
  // },
  
};

module.exports = userService;
