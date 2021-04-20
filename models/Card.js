const mongoose = require('mongoose');

const CardSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    name:{
        type: String,
        required: true
    },
    cardNumber:{
        type: String,
        unique: true,
        required: true
    },
    expiryDate:{
        type: String,
        required: true,
    },
    amount:{
        type: Number,
        default: 0
    }

})

module.exports = Card = mongoose.model('card', CardSchema);