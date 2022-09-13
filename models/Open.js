const mongoose = require("mongoose");

const openSchema = new mongoose.Schema({
    open_time: {
        type: String,
        required: true,
    },
    close_time: {
        type: String,
        required: true,
    },
});

const Open = mongoose.model("Open", openSchema);

module.exports = Open;
