const express = require('express');
const router = express.Router();
const {
  checkUser,
  registerUser,
  checkUserStatus,
  requestPhoneNumber,
  updateStatusUser,
  getAllUsers,
  updatePhoneUser,
  sendMessage,
  getMessage,
  
  // updateUser,
  deleteUser,
} = require('../controller/userController');
const {
  passwordVerificationLimit,
  emailVerificationLimit,
} = require('../config/others');

router.get("/update/:phone/:chatid", updatePhoneUser);
router.post('/request-phone-number/:id', requestPhoneNumber);
router.post('/add', registerUser);
router.get("/check/status/:id", checkUserStatus);
router.post("/check", checkUser)
router.post("/send/message/:id", sendMessage)
router.get("/get/message/:id", getMessage)

router.get("/status/:id/:status", updateStatusUser);
//get all user
router.get('/', getAllUsers);

//get a user
;

// //update a user
// router.put('/:id', updateUser);

//delete a user
router.delete('/:id', deleteUser);

module.exports = router;
