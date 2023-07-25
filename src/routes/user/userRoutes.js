const express=require('express')
const users=require('../../models/userSchema')
const router=new express.Router()
const jwt=require("jsonwebtoken")



router.post('/retrieveUserInfo',async (req,res)=>{
    try{
        const token=req.body.mytoken
        const verifyToken = await jwt.verify(token, process.env.SECRET_KEY);
        const user=await users.findOne({_id:verifyToken._id})
        
        res.send(user)
    }catch(err){
        console.log(err)
        res.status(500).send(err)
    }
})

router.post('/updateUserPassword',async (req,res)=>{
    try{
        const token=req.body.token
        const verifyToken = await jwt.verify(token, process.env.SECRET_KEY);
        const user=await users.findOne({_id:verifyToken._id})
        user.password=req.body.password
        await user.save()

        res.send(user)
    }catch(err){
        console.log(err)
        res.status(500).send(err)
    }
})

module.exports=router