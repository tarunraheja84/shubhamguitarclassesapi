const mongoose=require('mongoose')
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')

const adminSchema=new mongoose.Schema({
    email:{
        type:String,
        unique:true
    },
    password:String,
    image:String,
    tokens:[{
        token:{
            type:String,
            // required:true
        }
    }]
})

//generating token
adminSchema.methods.generateAuthToken=async function(){
    try{
        const token=jwt.sign({_id:this._id},process.env.SECRET_KEY)
        this.tokens=this.tokens.concat({token:token})
        return token
    }catch(err){
        console.log(err)
    }
}

//encrypyt password
adminSchema.pre("save",async function (next){
    if(this.isModified("password")){
        this.password=await bcrypt.hash(this.password,10)
        this.cpassword=this.password
    }
    next()
})

const admins=mongoose.model('admins',adminSchema)

module.exports=admins