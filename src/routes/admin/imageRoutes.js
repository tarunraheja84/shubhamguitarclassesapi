const express=require('express')
const admins=require('../../models/adminSchema')
const router=new express.Router()



//image routes
router.post('/storeAdminImage',async (req,res)=>{
    try{
        const admin =await admins.findOne({email:req.body.email})
        admin.image=req.body.image
        await admin.save()
        res.status(200).send(admin)
    }catch(err){
        console.log(err)
        res.send(err)
    }
})


router.delete('/deleteAdminImage',async (req,res)=>{
    try{
        const email=req.body.email;
        const result= await users.deleteOne({email:email})
        if(!result)
            res.status(404).send()
        else{
            res.send(result)
        }
    }catch(err){
        console.log(err)
        res.status(500).send(err)
    }
})

module.exports=router
