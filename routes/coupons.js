const express = require('express');
const router = express.Router();
const User = require('../models/User');
const auth = require('../middleware/auth');


router.put('/',auth, async (req, res)=>{
    try{
        const user = await User.findById(req.user.id);
        user.credCoins -= req.body.amount;
        user.coupons.unshift({couponNo:req.body.couponNo,code:req.body.code});
        await user.save();
        res.send("Coupon added");
    }
    catch(err){
        
        console.error(err.message);
        res.status(500).send("Server error");
    }

});



module.exports = router;