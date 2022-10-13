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
  sendMessageByUser,
  sendMessageByAdmin,
  getMessage,
  getUserById,
  
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
router.post("/send/message/:id", sendMessageByAdmin)
router.get("/send/user/message/:id/:message", sendMessageByUser)
router.get("/get/message/:id", getMessage)

router.get("/status/:id/:status", updateStatusUser);
//get all user
router.get('/', getAllUsers);

//get a user
router.get('/:id', getUserById);
;

// //update a user
// router.put('/:id', updateUser);

//delete a user
router.delete('/:id', deleteUser);

module.exports = router;
