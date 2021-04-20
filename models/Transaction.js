const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
    card:{
        type: String,
        required: true
    },
    amount:{
        type: Number,
        required: true
    },
    vendor:{
        type: String,
        required: true
    },
    category:{
        type : String,
        required: true
    },
    type:{
        type: String,
        required: true
    },
    date:{
        type:String,
        required: true
    }

})

module.exports = Transaction = mongoose.model('transaction', TransactionSchema);