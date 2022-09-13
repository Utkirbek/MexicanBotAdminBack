const Open = require("../models/Open");

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
   
    updateOpen,
};

