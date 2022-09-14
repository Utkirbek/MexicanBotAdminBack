const express = require("express");
const router = express.Router();
const {
  addOption,
  getAllOption,
getOptionById,
  updateOption,
  deleteOption,
} = require("../controller/optionController");

//add a Option
router.post("/add", addOption);

//get all Option
router.get("/", getAllOption);


router.get("/:id", getOptionById);

//update a Option
router.put("/:id", updateOption);

//delete a Option
router.patch("/:id", deleteOption);

module.exports = router;
