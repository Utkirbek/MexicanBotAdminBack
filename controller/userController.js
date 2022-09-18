require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const Open = require("../models/Open");
const { Bot } = require("grammy");

// const verifyEmailAddress = async (req, res) => {
//   const isAdded = await User.findOne({ email: req.body.email });
//   if (isAdded) {
//     return res.status(403).send({
//       message: 'This Email already Added!',
//     });
//   } else {
//     const token = tokenForVerify(req.body);
//     const body = {
//       from: process.env.EMAIL_USER,
//       to: `${req.body.email}`,
//       subject: 'Email Activation',
//       subject: 'Verify Your Email',
//       html: `<h2>Hello ${req.body.email}</h2>
//       <p>Verify your email address to complete the signup and login into your <strong>KachaBazar</strong> account.</p>

//         <p>This link will expire in <strong> 15 minute</strong>.</p>

//         <p style="margin-bottom:20px;">Click this link for active your account</p>

//         <a href=${process.env.STORE_URL}/user/email-verification/${token} style="background:#22c55e;color:white;border:1px solid #22c55e; padding: 10px 15px; border-radius: 4px; text-decoration:none;">Verify Account</a>

//         <p style="margin-top: 35px;">If you did not initiate this request, please contact us immediately at support@kachabazar.com</p>

//         <p style="margin-bottom:0px;">Thank you</p>
//         <strong>Kachabazar Team</strong>
//              `,
//     };

//     const message = 'Please check your email to verify!';
//     sendEmail(body, res, message);
//   }
// };

const registerUser = async (req, res) => {
  
  

 const newUser = new User({
   ...req.body,
 });
 newUser.save();

 res.send({
   message: "Your account created successfully, you can login now!",
 });}
    
  

// const loginUser = async (req, res) => {
//   try {
//     const user = await User.findOne({ email: req.body.registerEmail });

//     if (
//       user &&
//       user.password &&
//       bcrypt.compareSync(req.body.password, user.password)
//     ) {
//       const token = signInToken(user);
//       res.send({
//         token,
//         _id: user._id,
//         name: user.name,
//         email: user.email,
//         address: user.address,
//         phone: user.phone,
//         image: user.image,
//       });
//     } else {
//       res.status(401).send({
//         message: 'Invalid user or password!',
//       });
//     }
//   } catch (err) {
//     res.status(500).send({
//       message: err.message,
//     });
//   }
// };

// const forgetPassword = async (req, res) => {
//   const isAdded = await User.findOne({ email: req.body.verifyEmail });
//   if (!isAdded) {
//     return res.status(404).send({
//       message: 'User Not found with this email!',
//     });
//   } else {
//     const token = tokenForVerify(isAdded);
//     const body = {
//       from: process.env.EMAIL_USER,
//       to: `${req.body.verifyEmail}`,
//       subject: 'Password Reset',
//       html: `<h2>Hello ${req.body.verifyEmail}</h2>
//       <p>A request has been received to change the password for your <strong>Kachabazar</strong> account </p>

//         <p>This link will expire in <strong> 15 minute</strong>.</p>

//         <p style="margin-bottom:20px;">Click this link for reset your password</p>

//         <a href=${process.env.STORE_URL}/user/forget-password/${token} style="background:#22c55e;color:white;border:1px solid #22c55e; padding: 10px 15px; border-radius: 4px; text-decoration:none;">Reset Password</a>

//         <p style="margin-top: 35px;">If you did not initiate this request, please contact us immediately at support@kachabazar.com</p>

//         <p style="margin-bottom:0px;">Thank you</p>
//         <strong>Kachabazar Team</strong>
//              `,
//     };

//     const message = 'Please check your email to reset password!';
//     sendEmail(body, res, message);
//   }
// };

// const resetPassword = async (req, res) => {
//   const token = req.body.token;
//   const { email } = jwt.decode(token);
//   const user = await User.findOne({ email: email });

//   if (token) {
//     jwt.verify(token, process.env.JWT_SECRET_FOR_VERIFY, (err, decoded) => {
//       if (err) {
//         return res.status(500).send({
//           message: 'Token expired, please try again!',
//         });
//       } else {
//         user.password = bcrypt.hashSync(req.body.newPassword);
//         user.save();
//         res.send({
//           message: 'Your password change successful, you can login now!',
//         });
//       }
//     });
//   }
// };

// const changePassword = async (req, res) => {
//   try {
//     const user = await User.findOne({ email: req.body.email });
//     if (!user.password) {
//       return res.send({
//         message:
//           'For change password,You need to sign in with email & password!',
//       });
//     } else if (
//       user &&
//       bcrypt.compareSync(req.body.currentPassword, user.password)
//     ) {
//       user.password = bcrypt.hashSync(req.body.newPassword);
//       await user.save();
//       res.send({
//         message: 'Your password change successfully!',
//       });
//     } else {
//       res.status(401).send({
//         message: 'Invalid email or current password!',
//       });
//     }
//   } catch (err) {
//     res.status(500).send({
//       message: err.message,
//     });
//   }
// };

// const signUpWithProvider = async (req, res) => {
//   try {
//     const isAdded = await User.findOne({ email: req.body.email });
//     if (isAdded) {
//       const token = signInToken(isAdded);
//       res.send({
//         token,
//         _id: isAdded._id,
//         name: isAdded.name,
//         email: isAdded.email,
//         address: isAdded.address,
//         phone: isAdded.phone,
//         image: isAdded.image,
//       });
//     } else {
//       const newUser = new User({
//         name: req.body.name,
//         email: req.body.email,
//         image: req.body.image,
//       });

//       const user = await newUser.save();
//       const token = signInToken(user);
//       res.send({
//         token,
//         _id: user._id,
//         name: user.name,
//         email: user.email,
//         image: user.image,
//       });
//     }
//   } catch (err) {
//     res.status(500).send({
//       message: err.message,
//     });
//   }
// };

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}).sort({ _id: -1 });
    
    res.send(users);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const sendMessage = async (id,newStatus) => {
  try{
    const bot = new Bot(`${process.env.BOT_TOKEN}`);
  let user = await User.findById(id);
  let message = '';
  if(newStatus === 'verified'){
    message = `🟢 <b>משתמש מאומת </b>`;
  }else if(newStatus === 'blocked'){
    message = `🔴 <b>משתמש לא מאומת</b>;
*בקשת האימות נדחתה, 
אנא פנה ל-<b>׳שירות לקוחות 👩‍💻׳ </b>לפרטים נוספים.`;
  }else{
    message = `🟡 <b>משתמש בבדיקה  </b>;
*בדיקה לוקחת עד כ-10 דקות בשעות הפעילות..`;
  }
  await bot.api.sendMessage(
    user.chatid,
    message,
     { parse_mode: "HTML" },
  );
  

  }catch(err){
    res.status(500).send({ message: err.message });
  }

}

const checkUser = async (req, res) => {
  try {
    const user = await User.findOne({chatid:req.body.chatid});
    const open = await Open.findById(`${process.env.OPEN_ID}`);
    
    if (!user) {
      res.send({ error: "User not found" });
    }else{
      res.send({user:user, opening_times:open});
    }
  
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const checkUserStatus = async (req, res) => {
  try {
    const user = await User.find({chatid :req.params.id});
    
    if (user[0].status==="verified") {
      res.send({"isVerified":true});
    }else{
      res.send({"isVerified":false});
    }

  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

// const updateUser = async (req, res) => {
//   try {
//     const user = await User.findById(req.params.id);
//     if (user) {
//       user.name = req.body.name;
//       user.email = req.body.email;
//       user.address = req.body.address;
//       user.phone = req.body.phone;
//       user.image = req.body.image;
//       const updatedUser = await user.save();
//       const token = signInToken(updatedUser);
//       res.send({
//         token,
//         _id: updatedUser._id,
//         name: updatedUser.name,
//         email: updatedUser.email,
//         address: updatedUser.address,
//         phone: updatedUser.phone,
//         image: updatedUser.image,
//       });
//     }
//   } catch (err) {
//     res.status(404).send({
//       message: 'Your email is not valid!',
//     });
//   }
// };

const deleteUser = (req, res) => {
  User.deleteOne({ _id: req.params.id }, (err) => {
    if (err) {
      res.status(500).send({
        message: err.message,
      });
    } else {
      res.status(200).send({
        message: 'User Deleted Successfully!',
      });
    }
  });
};

const updateStatusUser = (req, res) => {
  const newStatus = req.params.status;
  User.updateOne(
    { _id: req.params.id },
    {
      $set: {
        status: newStatus,
        isChecked: "Done"
      },
    },
    (err) => {
      if (err) {
        res.status(500).send({
          message: err.message,
        });
      } else {
        sendMessage(req.params.id,newStatus);
        res.status(200).send({
          message: `Product ${newStatus} Successfully!`,
        });
      }
    }
  );
};



module.exports = {
  // loginUser,
  registerUser,
  updateStatusUser,
  // // signUpWithProvider,
  // verifyEmailAddress,
  // forgetPassword,
  // changePassword,
  // resetPassword,
  checkUserStatus,
  getAllUsers,

  checkUser,
  // updateUser,
  deleteUser,
};
