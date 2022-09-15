const Open = require("../models/Open");
const addOpen = async (req, res) => {
  try {
    
    const newCategory = new Open(req.body);
    await newCategory.save();
    res.status(200).send({
      open: newCategory,
      message: "Open Added Successfully!",
    });
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const getOpen = async (req, res) => {
  try {
    const category = await Open.findById(`${process.env.OPEN_ID}`);
    console.log(category);
    res.send(category);
  } catch (err) {
    console.log(err.message),
      res.status(500).send({
        message: err.message,
      });
  }
};
const updateOpen = async (req, res) => {
  try {
    
    const open = await Open.findById(`${process.env.OPEN_ID}`);
    if (Open) {
      open.open_time = req.body.open_time;

      open.close_time = req.body.close_time;

      await open.save();
      res.send({ message: "Open Updated Successfully!" });
    }
  } catch (err) {
    res.status(404).send({ message: "Open not found!" });
  }
};


module.exports = {
  getOpen,
   addOpen,
    updateOpen,
};

