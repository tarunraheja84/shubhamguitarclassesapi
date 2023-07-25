const express=require('express')
const users=require('../../models/userSchema')
const router=new express.Router()



//image routes
router.post('/storeUserImage',async (req,res)=>{
    try{
        const user =await users.findOne({phoneno:req.body.phoneno})
        user.image=req.body.image
        await user.save()
        res.status(200).send(user)
    }catch(err){
        console.log(err)
        res.send(err)
    }
})

router.delete('/deleteUserImage',async (req,res)=>{
try{
    const phoneno=req.body.phoneno;
    const result= await users.deleteOne({phoneno:phoneno})
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
