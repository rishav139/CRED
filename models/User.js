const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        unique: true,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    rewards:{
        type:[]
    },
    unclaimedRewards:{
        type:[]
    },
    credCoins:{
        type:Number,
        default:0
    },
    coupons:{
        type:[]
    }

})

module.exports = User = mongoose.model('user', UserSchema);