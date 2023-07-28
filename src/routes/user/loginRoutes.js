const express = require('express');
const users = require('../../models/userSchema');
const router = new express.Router();
const bcrypt = require("bcryptjs");
const jwt=require("jsonwebtoken")

// user routes
router.post('/login', async (req, res) => {
        try {
            const user = await users.findOne({phoneno:req.body.phoneno})

        if(user.tokens.length!==1){
            res.status(405).send()
            return
        }
        const token = await user.generateAuthToken();

        // res.cookie("jwt", token);
       
        await user.save()
        if (await bcrypt.compare(req.body.password, user.password)) 
           res.status(200).send(token);
        else 
            res.status(404).send()

    } catch (err) {
        console.log(err);
        res.status(500).send(err.message);
    }
});

router.post('/userSignup', async (req, res) => {
    try {
        const user = new users(req.body);
        const token = await user.generateAuthToken();
       
        // res.cookie("jwt", token);

        if (req.body.OTP==='4193') {
            try{
            await user.save()
            res.status(200).send(token);
            }catch(err){
                console.log(err);
                res.status(500).send("Duplicate Phone no.");
            }
        } else {
            res.status(400).send("OTP is wrong");
        }
    } catch (err) {
        console.log(err);
        res.status(500).send(err.message);
    }
});


router.post('/logoutUser',async (req,res)=>{
    try{   
        const token = req.body.mytoken;
        const verifyToken = await jwt.verify(token, process.env.SECRET_KEY);
        const user=await users.findOne({_id:verifyToken._id});

        user.tokens=user.tokens.filter((ele)=>{
            return ele.token!==token
        })

        // res.clearCookie("jwt")
        await user.save()
        res.send(user)
    }
    catch(err){
        console.log(err)
        res.status(500).send(err)
    }
})


router.post('/isAuthenticated', async(req,res)=>{
    // const token = req.cookies.jwt;
        const token=req.body.mytoken;
        
        if(token){
        try{
            const verifyToken = await jwt.verify(token, process.env.SECRET_KEY);
            const user=await users.findOne({_id:verifyToken._id})
            
            if(user.tokens.length!==0)
                res.send("authenticated user") 
            else
                res.send("not authenticated user")     
        }catch(err){
            console.log(err)
            res.status(500).send("not authenticated user")
        }
    }
    else{
        res.status(500).send("not authenticated user")
    }
});

module.exports = router;
