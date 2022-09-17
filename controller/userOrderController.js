const Order = require('../models/Order');
const axios = require("axios").default;

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
    
    
    
    const send = async (order ,chatid)=>{
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
      
        
const message = 
`New Order \n
${message_text} \n
Total Price : ${order.total} \ncod
Address : ${order.address_name} \n
User :  https://t.me/${order.user?.username} \n`
      
      const URL = `https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage?chat_id=${chatid}&text=${message}&parse_mode=HTML`;
      await axios.get(URL)
        
        const Location = `https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendlocation?chat_id=${chatid}&latitude=${order.location.lat}&longitude=${order.location.lng}`;
        await axios.get(Location)
          
      
      
    }
    ADMINS.split("/").forEach(async (chatid) => {
      console.log()
      await send(order,chatid);
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
