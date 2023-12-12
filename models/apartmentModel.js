const mongoose = require("mongoose");

const schema = {
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    building_ID: {
        type: String,
        required: true,
    },
    apartment_number: {
        type: Number,
        required: true,
    },
    resident_name: {
        type: String,
        required: true,
    },
    resident_phone: {
        type: Number,
        required: true,
    },
    resident_cin: {
        type: String,
        required: true,
    },
    condition: {
        type: String,
        required: true,
        enum: ["owner", "rent"],
    },
};

const apartmentSchema = new mongoose.Schema(schema);
module.exports = mongoose.model("Apartment", apartmentSchema);