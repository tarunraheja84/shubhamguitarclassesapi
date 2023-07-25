const express = require('express');
const admins = require('../../models/adminSchema')
const users = require('../../models/userSchema')
const router = new express.Router();
const bcrypt = require("bcryptjs");
const jwt=require("jsonwebtoken")

// user routes
router.post('/loginAdmin', async (req, res) => {
    try {
        const admin = await admins.findOne({email:req.body.email})
        const token = await admin.generateAuthToken();

        // res.cookie("jwt", token);
        await admin.save()
        if (await bcrypt.compare(req.body.password, admin.password)) {
            res.status(200).send(token);
        } else {
            res.status(404).send();
        }

    } catch (err) {
        console.log(err);
        res.status(500).send(err.message);
    }
});


router.post('/logoutAdmin',async (req,res)=>{
    try{   
        const token = req.body.mytoken;
        const verifyToken = await jwt.verify(token, process.env.SECRET_KEY);
        const admin=await admins.findOne({_id:verifyToken._id});

        admin.tokens=admin.tokens.filter((ele)=>{
            return ele.token!==token
        })

        // res.clearCookie("jwt")
        await admin.save()
        res.send(admin)
    }
    catch(err){
        console.log(err)
        res.status(500).send(err)
    }
})

router.post('/logoutAllAdminDevices',async (req,res)=>{
    try{   
        const token = req.body.mytoken;
        const verifyToken = await jwt.verify(token, process.env.SECRET_KEY);
        const admin=await admins.findOne({_id:verifyToken._id});
    
        admin.tokens=[]

        // res.clearCookie("jwt")
        await admin.save()
        res.send(admin)
    }
    catch(err){
        console.log(err)
        res.status(500).send(err)
    }
})


router.post('/isAdmin', async(req,res)=>{
    // const token = req.cookies.jwt;
        const token=req.body.mytoken;
        
        if(token){
        try{
            const verifyToken = await jwt.verify(token, process.env.SECRET_KEY);
            const admin=await admins.findOne({_id:verifyToken._id})
            
            if(admin.tokens.length!==0)
                res.send("admin authenticated") 
            else
                res.send("admin not authenticated")     
        }catch(err){
            console.log(err)
            res.status(500).send("admin not authenticated")
        }
    }
    else{
        res.status(500).send("admin not authenticated")
    }
});


router.post('/logoutAllUserDevices',async (req,res)=>{
    try{   
        const phoneno = req.body.phoneno;
        const user=await users.findOne({phoneno:phoneno});
    
        user.tokens=[]

        // res.clearCookie("jwt")
        await user.save()
        res.send(user)
    }
    catch(err){
        console.log(err)
        res.status(500).send(err)
    }
})

module.exports = router;
