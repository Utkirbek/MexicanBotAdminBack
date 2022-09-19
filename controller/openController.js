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
    
    res.send(category);
  } catch (err) {
    
      res.status(500).send({
        message: err.message,
      });
  }
};
const updateOpen = async (req, res) => {
  try {
    
    const open = await Open.findById(`${process.env.OPEN_ID}`);
    if (Open) {
      open.monday_open_time = req.body.monday_open_time;
      open.monday_close_time = req.body.monday_close_time;


      open.tuesday_open_time = req.body.tuesday_open_time;
      open.tuesday_close_time = req.body.tuesday_close_time;

      open.wednesday_open_time = req.body.wednesday_open_time;
      open.wednesday_close_time = req.body.wednesday_close_time;


      open.thursday_open_time = req.body.thursday_open_time;
      open.thursday_close_time = req.body.thursday_close_time;

       open.friday_open_time = req.body.friday_open_time;
       open.friday_close_time = req.body.friday_close_time;

       open.saturday_open_time = req.body.saturday_open_time;
       open.saturday_close_time = req.body.saturday_close_time;


        open.sunday_open_time = req.body.sunday_open_time;
        open.sunday_close_time = req.body.sunday_close_time;

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

