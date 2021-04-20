const express = require('express');
const router = express.Router();
//const Transaction = require('../models/Transaction');
const Card = require('../models/Card');
const auth = require('../middleware/auth');

var luhnChk = (function (arr) {
    return function (ccNum) {
        var 
            len = ccNum.length,
            bit = 1,
            sum = 0,
            val;

        while (len) {
            val = parseInt(ccNum.charAt(--len), 10);
            sum += (bit ^= 1) ? arr[val] : val;
        }

        return sum && sum % 10 === 0;
    };
}([0, 2, 4, 6, 8, 1, 3, 5, 7, 9]));


router.get('/',auth,async(req,res)=>{
    const user = req.user.id;
    try{
        const cards = await Card.find({user});
        res.json(cards);
    }
    catch(err){
        console.log(err.message);
        res.status(500).send('Server Error');
    }
})

router.post('/',auth,
async (req,res) => 
{
    const {name,cardNumber,expiryDate,amount} = req.body;
    try{
        let card = await Card.findOne({cardNumber});
        if(card){
            return res.status(400).json({errors:[{msg: "Card already exists"}]});
        }
        card = new Card({user:req.user.id,name,cardNumber,expiryDate,amount});
        if(luhnChk(cardNumber))
        {
            await card.save();
            res.send('Card Added');
        }
        else{
            res.status(400).json({errors:[{msg: "Card not valid"}]});
        }
    }
    catch(err){
        console.log(err.message);
        res.status(500).send('Server Error');
    }

});

module.exports = router;