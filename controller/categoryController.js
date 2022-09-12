const Option = require('../models/Option');

const addCategory = async (req, res) => {
  try {
    const newCategory = new Option(req.body);
    await newCategory.save();
    res.status(200).send({
      message: 'Category Added Successfully!',
    });
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const addAllCategory = async (req, res) => {
  try {
    await Option.insertMany(req.body);
    res.status(200).send({
      message: 'Category Added successfully!',
    });
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const getShowingCategory = async (req, res) => {
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

const getAllCategory = async (req, res) => {
  try {
    const categories = await Option.find({}).sort({ _id: -1 });
    res.send(categories);
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const getCategoryById = async (req, res) => {
  try {
    const category = await Option.findById(req.params.id);
    res.send(category);
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const updateCategory = async (req, res) => {
  try {
    const category = await Option.findById(req.params.id);
    if (category) {
      category.label = req.body.label;
      
      category.value = req.body.value;
      
      await category.save();
      res.send({ message: 'Category Updated Successfully!' });
    }
  } catch (err) {
    res.status(404).send({ message: 'Category not found!' });
  }
};

const updateStatus = (req, res) => {
  const newStatus = req.body.status;

  Option.updateOne(
    { _id: req.params.id },
    {
      $set: {
        status: newStatus,
      },
    },
    (err) => {
      if (err) {
        res.status(500).send({
          message: err.message,
        });
      } else {
        res.status(200).send({
          message: `Option ${newStatus} Successfully!`,
        });
      }
    }
  );
};

const deleteCategory = (req, res) => {
  Option.deleteOne({ _id: req.params.id }, (err) => {
    if (err) {
      res.status(500).send({
        message: err.message,
      });
    } else {
      res.status(200).send({
        message: "Category Deleted Successfully!",
      });
    }
  });

  //This is for delete children category
  // Category.updateOne(
  //   { _id: req.params.id },
  //   {
  //     $pull: { children: req.body.title },
  //   },
  //   (err) => {
  //     if (err) {
  //       res.status(500).send({ message: err.message });
  //     } else {
  //       res.status(200).send({
  //         message: 'Category Deleted Successfully!',
  //       });
  //     }
  //   }
  // );
};

module.exports = {
  addCategory,
  addAllCategory,
  getAllCategory,
  getShowingCategory,
  getCategoryById,
  updateCategory,
  updateStatus,
  deleteCategory,
};
