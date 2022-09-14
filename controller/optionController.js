const Option = require("../models/Option");

const addOption = async (req, res) => {
  try {
    const newOption = new Option(req.body);
    await newOption.save();
    res.status(200).send({
      message: "Option Added Successfully!",
    });
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const addAllOption = async (req, res) => {
  try {
    await Option.insertMany(req.body);
    res.status(200).send({
      message: "Option Added successfully!",
    });
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const getShowingOption = async (req, res) => {
  try {
    const categories = await Option.find({ status: "Show" }).sort({
      _id: -1,
    });
    res.send(categories);
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const getOptionById = async (req, res) => {
  try {
    const category = await Option.findById(req.params.id);
    res.send(category);
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const getAllOption = async (req, res) => {
  try {
    const categories = await Option.find({}).sort({ _id: -1 });
    res.send(categories);
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};



const updateOption = async (req, res) => {
  try {
    const category = await Option.findById(req.params.id);
    if (category) {
      category.label = req.body.label;

      category.value = req.body.value;

      await category.save();
      res.send({ message: "Option Updated Successfully!" });
    }
  } catch (err) {
    res.status(404).send({ message: "Option not found!" });
  }
};



const deleteOption = (req, res) => {
  Option.deleteOne({ _id: req.params.id }, (err) => {
    if (err) {
      res.status(500).send({
        message: err.message,
      });
    } else {
      res.status(200).send({
        message: "Option Deleted Successfully!",
      });
    }
  });

  
};

module.exports = {
  addOption,
  addAllOption,
  getAllOption,
  getShowingOption,
  getOptionById,
  updateOption,
 
  deleteOption,
};
