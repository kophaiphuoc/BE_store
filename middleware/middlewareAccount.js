const jwt = require('jsonwebtoken');
const { emailOtp } = require('../models/emailotp_models');
const { AccountStore } = require('../models/accounts_models');

const checkAccount ={
    checkRegister :async(req,res,next)=>{
        if(req.body.emailStore == null || req.body.nameStore == null || req.body.passStore == null){
            res.status(400).json({message:"tài khoản đã tồn tại hoặc cú pháp không hợp lệ"})
        }else{
            const emailAccount = await AccountStore.findOne({emailStore: req.body.emailStore});
            const nameAccount = await AccountStore.findOne({nameStore: req.body.nameStore});
            
            if(emailAccount != null || nameAccount != null){
                res.status(400).json({message:"tài khoản đã tồn tại hoặc cú pháp không hợp lệ"});
            }else{
                next();
            }
            
        }
    }
}

module.exports = checkAccount;