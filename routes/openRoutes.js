const express = require("express");
const router = express.Router();
const {
  updateOpen,
  addOpen,
  getOpen,
} = require("../controller/openController");

//add a Open
router.post("/add", addOpen);

router.get("/", getOpen);





//update a Open
router.put("/", updateOpen);




module.exports = router;
