const axios = require("axios").default;

const User = require("./models/User");

const sendMessageToAdminsAboutNewOrder = async (order) => {
  try {
    const ADMINS = process.env.ADMINS;
    if (order.comment === "") {
      order.comment = "User did not add any comment";
    }

    const send = async (order, chatid) => {
      let product_images = [];
      let message_text = "";

      for (let i = 0; i < order.cart.length; i++) {
        product_images.push(order.cart[i]?.product?.image);
        for (let j = 0; j < order.cart[i]?.options?.length; j++) {
          let options = "";
          options += `${order.cart[i]?.options[j]?.label}`;
          message_text += `Product : ${order.cart[i]?.product?.title} x ${order.cart[i].quantity} + ${options} \n`;
        }
      }
      const message = `New Order \n
${message_text} \n
Total Price : ${order.total} \n
Address : ${order.address_name} \n
User :  https://t.me/${order.user?.username} \n
Comment : ${order?.comment} \n`;

      const URL = `https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage?chat_id=${chatid}&text=${message}&parse_mode=HTML`;
      const response = await axios.get(URL);

      const Location = `https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendlocation?chat_id=${chatid}&latitude=${order.location.lat}&longitude=${order.location.lng}`;
      const location = await axios.get(Location);
    };
    ADMINS.split("/").forEach(async (chatid) => {
      await send(order, chatid);
    });
  } catch (err) {}
};
const sendMessageToOwnerAboutNewOrder = async (chatid) => {
  try {
    const message = `Congratulations Your Order Has Been Added to Our List. Please Keep in touch to know the status of your order. \n `;
    const URL = `https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage?chat_id=${chatid}&text=${message}&parse_mode=HTML`;
    const  response = await axios.get(URL);
  } catch (err) {}
};
const sendMessageToUserAboutStatus = async (id, newStatus) => {
  try {
    let user = await User.findById(id);
    const chatid = user.chatid;
 

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
    const URL = `https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage?chat_id=${chatid}&text=${message}&parse_mode=HTML`;
    console.log(URL);
   const response = await axios.get(encodeURI(URL))

    
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
    const URL =`https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage?chat_id=${user.chatid}&text=${message}&parse_mode=HTML`;
    const response = await axios.get(URL);
  } catch (err) {}
};


const requestPhoneNumberFromUser = async (id) => {
  try {
    let user = await User.findById(id);
      const message = `Please Send Your Phone Number To Verify Your Account`;
    const URL = `https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage?chat_id=${user.chatid}&text=${message}&parse_mode=HTML&reply_markup={"keyboard":[[{"text":"Send Phone Number","request_contact":true} ]],"resize_keyboard":true,"one_time_keyboard":true}`;
    const response = await axios.get(URL);
  } catch (err) {}
};
const chatWithUser = async (id, message) => {
  try {
    let user = await User.findById(id);
    const URL = `https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage?chat_id=${user.chatid}&text=${message}&parse_mode=HTML&reply_markup={force_reply: true}`;
    const response = await axios.get(URL);
  } catch (err) {}
};

module.exports = {
  sendMessageToUserAboutOrderStatus,
  sendMessageToAdminsAboutNewOrder,
  sendMessageToOwnerAboutNewOrder,
  sendMessageToUserAboutStatus,
  requestPhoneNumberFromUser,
  chatWithUser,
};
