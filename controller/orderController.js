const Order = require('../models/Order');
const Product = require("../models/Product");
const Option = require("../models/Option");

const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({});
    let products ;
    let options;
    for (let order of orders) {
      await order.populate('user').execPopulate();
      
      for (let i = 0; i < order.cart.length; i++) {
        products = [];
        const product = await Product.findById(order.cart[i]);
        products.push(product);
      }
      for (let i = 0; i < order.option?.length; i++) {
        options = [];
        const option = await Option.findById(order.option[i]);
        options.push(option);
      }
      order.options = options;
      order.cart = products;
    }
   
    orders.cart = products;

    res.send(orders);
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const getOrderByUser = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.params.id }).sort({ _id: -1 });
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

const updateOrder = (req, res) => {
  const newStatus = req.body.status;
  Order.updateOne(
    {
      _id: req.params.id,
    },
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
          message: 'Order Updated Successfully!',
        });
      }
    }
  );
};

const deleteOrder = (req, res) => {
  Order.deleteOne({ _id: req.params.id }, (err) => {
    if (err) {
      res.status(500).send({
        message: err.message,
      });
    } else {
      res.status(200).send({
        message: 'Order Deleted Successfully!',
      });
    }
  });
};

module.exports = {
  getAllOrders,
  getOrderById,
  getOrderByUser,
  updateOrder,
  deleteOrder,
};
