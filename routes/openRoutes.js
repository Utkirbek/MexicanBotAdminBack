const express = require("express");
const router = express.Router();
const { updateOpen, addOpen } = require("../controller/openController");

//add a Open
router.post("/add", addOpen);





//update a Open
router.put("/", updateOpen);




module.exports = router;
