const express = require('express');
const router = express.Router();
const User = require('../models/User');
const auth = require('../middleware/auth');


router.put('/',auth, async (req, res)=>{
    try{
        const user = await User.findById(req.user.id);
        user.unclaimedRewards.push(1);
        await user.save();
        res.send("Reward added");
    }
    catch(err){
        
        console.error(err.message);
        res.status(500).send("Server error");
    }

});

router.put('/claim',auth, async (req, res)=>{
    try{
        const user = await User.findById(req.user.id);
        user.unclaimedRewards.pop();
        user.rewards.unshift(req.body.amount);
        user.credCoins += req.body.amount;
        await user.save();
        res.send("Reward claimed");
    }
    catch(err){
        
        console.error(err.message);
        res.status(500).send("Server error");
    }

});


module.exports = router;