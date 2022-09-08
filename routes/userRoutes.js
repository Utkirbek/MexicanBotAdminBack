const express = require('express');
const router = express.Router();
const {
  checkUser,
  registerUser,
  checkUserStatus,
  // verifyEmailAddress,
  updateStatusUser,
  getAllUsers,
  
  // updateUser,
  deleteUser,
} = require('../controller/userController');
const {
  passwordVerificationLimit,
  emailVerificationLimit,
} = require('../config/others');

//verify email
// router.post('/verify-email', emailVerificationLimit, verifyEmailAddress);

// //register a user
// router.post('/register/:token', registerUser);

// //login a user
// router.post('/login', loginUser);

// //register or login with google and fb
// router.post('/signup', signUpWithProvider);

// //forget-password
// router.put('/forget-password', passwordVerificationLimit, forgetPassword);

// //reset-password
// router.put('/reset-password', resetPassword);

// //change password
// router.post('/change-password', changePassword);


router.post('/add', registerUser);
router.get("/check/status/:id", checkUserStatus);
router.post("/check", checkUser)

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
