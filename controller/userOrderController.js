const Order = require('../models/Order');
const { handleProductQuantity } = require('../config/others');
const Option = require("../models/Option");
const Product = require("../models/Product");

const addOrder = async (req, res) => {
  try {

    const newOrder = new Order({
      ...req.body,
      user: req.body.user_id,
    });
    const order = await newOrder.save();
    
    
      await order.populate("user").execPopulate();

      for (let i = 0; i < order.cart.length; i++) {
        let options = [];
        const product = await Product.findById(order.cart[i].product_id);
        order.cart[i].product = product;

        for (let j = 0; j < order.cart[i].options.length; j++) {
          const option = await Option.findById(order.cart[i].options[j]);

          options.push(option);
        }
        order.cart[i].options = options;
      }
      res.status(201).send(order);
   
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const getOrderByUser = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({ _id: -1 });
    res.send(orders);
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    res.send(order);
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

module.exports = {
  addOrder,
  getOrderById,
  getOrderByUser,
};
