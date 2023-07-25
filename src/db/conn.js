const mongoose=require('mongoose')

mongoose.connect('mongodb+srv://tarun:Tarun%40123@cluster0.srw7o.mongodb.net/test', {
    dbName: 'shubhamdb',
  }).then(()=>{
    console.log("mongodb connected")
}).catch((err)=>{
    console.log(err)
})