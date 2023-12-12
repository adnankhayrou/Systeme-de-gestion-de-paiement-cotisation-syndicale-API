const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    payment: {
        type: String,
        required: true,
        enum: ["paid", "unpaid"],
    },
    apartment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Apartment",
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    month: {
        type: Number,
        required: true,
    },
    year: {
        type: Number,
        required: true,
    },
});

module.exports = mongoose.model("Payment", paymentSchema);