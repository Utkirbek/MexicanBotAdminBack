const { Bot } = require("grammy");
const User = require("./models/User");
const bot = new Bot(`${process.env.BOT_TOKEN}`);


const sendMessageToAdminsAboutNewOrder = async (order) => {
  try {
    const ADMINS = process.env.ADMINS;

    const send = async (order, chatid, bot) => {
      let product_images = [];
      let message_text = "";

      for (let i = 0; i < order.cart.length; i++) {
        product_images.push(order.cart[i]?.product?.image);
        for (let j = 0; j < order.cart[i]?.options?.length; j++) {
          let options = "";
          options += `${order.cart[i]?.options[j]?.label}`;
          message_text += `Product : ${order.cart[i]?.product?.title} x ${order.cart[i].quantity} + ${options} \n Comment : ${order.cart[i]?.comment} \n`;
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
      await bot.api.sendLocation(
        chatid,
        order.location.lat,
        order.location.lng
      );
    };
    ADMINS.split("/").forEach(async (chatid) => {
      await send(order, chatid, bot);
    });
  } catch (err) {}
};
const sendMessageToOwnerAboutNewOrder = async (chatid) => {
  try {
    await bot.api.sendMessage(
      chatid,
      `Congratulations Your Order Has Been Added to Our List. Please Keep in touch to know the status of your order. \n `
    );
  } catch (err) {}
};
const sendMessageToUserAboutStatus = async (id, newStatus) => {
  try {
    
    let user = await User.findById(id);

    let message = "";
    if (newStatus === "verified") {
      message = `🟢 <b>משתמש מאומת </b>`;
    } else if (newStatus === "blocked") {
      message = `🔴 <b>משתמש לא מאומת</b>;
*בקשת האימות נדחתה, 
אנא פנה ל-<b>׳שירות לקוחות 👩‍💻׳ </b>לפרטים נוספים.`;
    } else {
      message = `🟡 <b>משתמש בבדיקה  </b>;
*בדיקה לוקחת עד כ-10 דקות בשעות הפעילות..`;
    }
    await bot.api.sendMessage(user.chatid, message, { parse_mode: "HTML" });
  } catch (err) {}
};
const sendMessageToUserAboutOrderStatus = async (id, newStatus) => {
  try {
    let user = await User.findById(id);
    
    let message = "";
    if (newStatus === "Processing") {
      message = `Your Order Has Been Received and Is Being Processed`;
    } else if (newStatus === "Delivered") {
      message = `Your Order Has Been Delivered`;
    } else {
      message = `Your Order is Pending`;
    }
    await bot.api.sendMessage(user.chatid, message, { parse_mode: "HTML" });
  } catch (err) {}
};


module.exports = {
  sendMessageToUserAboutOrderStatus,
  sendMessageToAdminsAboutNewOrder,
  sendMessageToOwnerAboutNewOrder,
  sendMessageToUserAboutStatus,
};