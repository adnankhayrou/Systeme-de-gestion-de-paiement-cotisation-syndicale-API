const mongoose = require('mongoose');

const usersSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    is_verified: {
        type: Boolean,
        default: false
    }
    ,
    date: {
        type: Date,
        required: true,
        default: Date.now,
    },
})

const userSchema = mongoose.model('User', usersSchema);


module.exports = userSchema;