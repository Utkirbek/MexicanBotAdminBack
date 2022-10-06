require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { sendMessageToUserAboutStatus  , requestPhoneNumberFromUser, chatWithUser} = require("../bot");
const Open = require("../models/Open");


const registerUser = async (req, res) => {
  const  user = await User.findOne({ chatid: req.body.chatid });
  if (user) {
    res.status(400).send({ message: "User Already Registered" });
    return 
  }

 const newUser = new User({
   ...req.body,
 });
 newUser.save();

 res.send({
   message: "Your account created successfully, you can login now!",
 });}
    
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}).sort({ _id: -1 }).populate("messages  ");
    
    res.send(users);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

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
const requestPhoneNumber = (req, res) => {
  try {
    
    requestPhoneNumberFromUser(req.params.id);
    res.status(200).send({
      message: 'Request Sent Successfully!',
    });
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
    
  }
  
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
        sendMessageToUserAboutStatus(req.params.id, newStatus);
        res.status(200).send({
          message: `Product ${newStatus} Successfully!`,
        });
      }
    }
  );
};
const updatePhoneUser = (req, res) => {
  const newPhone = req.params.phone;
  User.updateOne(
    { chatid: req.params.chatid },
    {
      $set: {
        phone: newPhone
      },
    },
    (err) => {
      if (err) {
        res.status(500).send({
          message: err.message,
        });
      } else {
       
        res.status(200).send({
          message: `User Phone Successfully Changed!`,
        });
      }
    }
  );
};




const sendMessage = async(req, res) => {
  try {
    const user = await  User.findById(req.params.id).populate("messages")
    if (req.body.sender === 'admin'){
      chatWithUser(req.params.id, req.body.message)
    }

    user.addMessage(
      req.body.message, req.body.sender
    )
    res.status(200).send({
      user:user,
      message: 'Message added succesfully',
    });
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
    
  }
}


const getMessage = async(req, res) => {
    try {
      const user = await  User.findById(req.params.id).populate("messages")
      res.status(200).send(
        user.messages
        
      );
    } catch (error) {
      res.status(500).send({
        message: error.message,
      });
      
    }
 
};



module.exports = {
  sendMessage,
  registerUser,
  updateStatusUser,
  checkUserStatus,
  getAllUsers,
  checkUser,
  deleteUser,
  requestPhoneNumber,
  updatePhoneUser,
  getMessage,
};
