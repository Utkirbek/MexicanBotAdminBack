const Option = require('../models/Option');

const addOption = async (req, res) => {
  try {
    const newOption = new Option(req.body);
    await newOption.save();
    res.status(200).send({
      message: 'Option Added Successfully!',
    });
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

const getOptionById = async (req, res) => {
  try {
    const option = await Option.findById(req.params.id);
    res.send(option);
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const updateOption = async (req, res) => {
  try {
    const option = await Option.findById(req.params.id);
    if (option) {
      option.parent = req.body.parent;
      // option.slug = req.body.slug;
      option.type = req.body.type;
      option.icon = req.body.icon;
      option.children = req.body.children;
      await option.save();
      res.send({ message: 'Option Updated Successfully!' });
    }
  } catch (err) {
    res.status(404).send({ message: 'Option not found!' });
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
        message: 'Option Deleted Successfully!',
      });
    }
  });


};

module.exports = {
  addOption,
  getAllOption,
  getOptionById,
  updateOption,
  deleteOption,
};
