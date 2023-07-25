const mongoose=require('mongoose')


const notesSchema=new mongoose.Schema({
    filename:String,
    numPages:{
        type:Number,
        required:true
    },
    numChunks:Number,
    file:{
        type:[String],
        required:true
    },
})

const notes=mongoose.model('notes',notesSchema)

module.exports=notes