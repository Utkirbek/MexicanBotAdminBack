const   axios  = require("axios");

const User = require("./models/User");



const sendMessageToAdminsAboutNewOrder = async (order) => {
  try {
    const ADMINS = process.env.ADMINS;
    if (order.comment==="" ){
      order.comment= "User did not add any comment"
    }

    const send = async (order, chatid, ) => {
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
      axios(URL); 

      const Location = `https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendlocation?chat_id=${chatid}&latitude=${order.location.lat}&longitude=${order.location.lng}`;
      axios(Location);
    };
    ADMINS.split("/").forEach(async (chatid) => {
      await send(order, chatid, );
    });
  } catch (err) {}
};
const sendMessageToOwnerAboutNewOrder = async (chatid) => {
  try {
    const message = `Congratulations Your Order Has Been Added to Our List. Please Keep in touch to know the status of your order. \n `
    const URL = `https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage?chat_id=${chatid}&text=${message}&parse_mode=HTML`;
    axios(URL); 
    
  } catch (err) {}
};
const sendMessageToUserAboutStatus = async (id, newStatus) => {
  try {
    
    let user = await User.findById(id);

    let message = "";
    if (newStatus === "verified") {
      message = `<p>🟢 <b>משתמש מאומת </b></p>`;
    } else if (newStatus === "blocked") {
      message = `<p>🔴 <b>משתמש לא מאומת</b>;
*בקשת האימות נדחתה, 
אנא פנה ל-<b>׳שירות לקוחות 👩‍💻׳ </b>לפרטים נוספים.</p>`;
    } else {
      message = `<p>🟡 <b>משתמש בבדיקה  </b>;
*בדיקה לוקחת עד כ-10 דקות בשעות הפעילות..<p>`;
    }
    const URL =`https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage?chat_id=${user.chatid}&text=${message}&parse_mode=HTML`;
      await axios.get(URL);
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
    const URL = `https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage?chat_id=${user.chatid}&text=${message}&parse_mode=HTML`;
    axios(URL); 
  } catch (err) {}
};


module.exports = {
  sendMessageToUserAboutOrderStatus,
  sendMessageToAdminsAboutNewOrder,
  sendMessageToOwnerAboutNewOrder,
  sendMessageToUserAboutStatus,
};