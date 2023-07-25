const express=require('express')
const admins=require('../../models/adminSchema')
const users=require('../../models/userSchema')
const router=new express.Router()
const jwt=require('jsonwebtoken')


router.post('/retrieveAdminInfo',async (req,res)=>{
    try{
        const token=req.body.mytoken
        const verifyToken = await jwt.verify(token, process.env.SECRET_KEY);
        const admin=await admins.findOne({_id:verifyToken._id})

        res.send(admin)
    }catch(err){
        console.log(err)
        res.status(500).send(err)
    }
})

router.get('/retrieveFirstAdminInfo',async (req,res)=>{
    try{
        const admin=await admins.find()      
        res.send(admin[0])
    }catch(err){
        console.log(err)
        res.status(500).send(err)
    }
})

router.get('/fetchStudents',async (req,res)=>{
    try{
        const students=await users.find()
        res.send(students)
    }
    catch(err){
        console.log(err)
        res.status(500).send(err)
    }
})

router.delete('/deleteStudent/:phoneno',async (req,res)=>{
    try{
        const student=await users.findOne({phoneno:req.params.phoneno})
        await student.deleteOne()
        res.send(student)
    }
    catch(err){
        console.log(err)
        res.status(500).send(err)
    }
})


router.post('/updateAdminPassword',async (req,res)=>{
    try{
        const token=req.body.token
        const verifyToken = await jwt.verify(token, process.env.SECRET_KEY);
        const admin=await admins.findOne({_id:verifyToken._id})
        
        admin.password=req.body.password
        await admin.save()

        res.send(admin)
    }catch(err){
        console.log(err)
        res.status(500).send(err)
    }
})

module.exports=router