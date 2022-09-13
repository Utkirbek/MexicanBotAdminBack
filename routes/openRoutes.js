const express = require("express");
const router = express.Router();
const {
 

  updateOpen,

} = require("../controller/openController");

//add a Open





//update a Open
router.put("/", updateOpen);




module.exports = router;
