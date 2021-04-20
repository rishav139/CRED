const express = require('express');
const router = express.Router();
const Transaction = require('../models/Transaction');
//const Card = require('../models/Card');
const auth = require('../middleware/auth');
//const { isValidObjectId } = require('mongoose');
var ObjectId = require('mongodb').ObjectID;
router.get('/:card',auth,async(req,res)=>{
    //const {card} = req.params.card;
    try{
        //const transactions = await Transaction.find({"card": new ObjectId(card)});
        const transactions = await Transaction.find({card:req.params.card}).sort();
        transactions.reverse();
        //console.log(req.params);
        res.json(transactions);
    }
    catch(err){
        console.log(err.message);
        res.status(500).send('Server Error');
    }
})

router.post('/pay',auth,
async (req,res) => 
{
    const {card, amount,vendor,type,category,date} = req.body;
    try{
        transaction = new Transaction({
         card,amount,vendor,category,type,date   
        });
        await transaction.save();
        res.send('Transaction Successful');
    }
    catch(err){
        console.log(err.message);
        res.status(500).send('Server Error');
    }

});


router.post('/',
async (req,res) => 
{
    const {card, amount,vendor,type,category,date} = req.body;
    try{
        transaction = new Transaction({
         card,amount,vendor,category,type,date   
        });
        await transaction.save();
        res.send('Transaction Successful');
    }
    catch(err){
        console.log(err.message);
        res.status(500).send('Server Error');
    }

});

module.exports = router;