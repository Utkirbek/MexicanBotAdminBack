const Order = require('../models/Order');

const Option = require("../models/Option");
const Product = require("../models/Product");
const { Bot } = require("grammy");

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
      sendMessageToAdmins(order);
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

const sendMessageToAdmins = async (order) => {
  try{
    const ADMINS = process.env.ADMINS;
    
    const bot = new Bot(`${process.env.BOT_TOKEN}`); 
    
    const send = async (order ,chatid,bot)=>{
      let product_images = []
      let message_text = ""
      
      for(let i = 0 ; i < order.cart.length ; i++){
        product_images.push(order.cart[i]?.product?.image)
        for(let j = 0 ; j < order.cart[i]?.options?.length ; j++){
          let  options = ""
          options += `${order.cart[i]?.options[j]?.label}`; 
          message_text += `Product : ${order.cart[i]?.product?.title} x ${order.cart[i].quantity} + ${options} \n`
        }
      }
      await bot.api.sendMessage(
        chatid,
`New Order \n
${message_text} \n
Total Price : ${order.total} \n
Address : ${order.address_name} \n
User :  https://t.me/${order.user?.username} \n`
      );
      await bot.api.sendLocation(chatid, order.location.lat, order.location.lng);
      
    }
    ADMINS.split("/").forEach(async (chatid) => {
      
      await send(order,chatid,bot);
    });
  }
  catch(err){

  }
}
module.exports = {
  addOrder,
  getOrderById,
  getOrderByUser,
};
