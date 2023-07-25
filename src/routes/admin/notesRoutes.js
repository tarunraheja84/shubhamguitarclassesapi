const express=require('express')
const notes=require('../../models/notesSchema')
const router=new express.Router()

router.post('/storeFirstChunk',async (req,res)=>{
    try{
        const note=new notes(req.body)
        await note.save()
        res.send("File uploaded")
    }
    catch(err){
        console.log(err)
        res.status(500).send(err)
    }
})

router.post('/storeOtherChunks', async (req, res) => {
    try {
      const filter = { filename: req.body.filename };
      const update = { $push: { file: req.body.chunk } };
  
       await notes.findOneAndUpdate(filter, update, {
        new: true, 
        versionKey: false, 
      });
  
      res.send("File uploaded");
    } catch (err) {
      console.log(err);
      res.status(500).send(err);
    }
  });
  

router.get('/retrieveNotes',async (req,res)=>{
        try{
            const allNotes=await notes.find({},{file:0})
            res.send(allNotes)
        }
        catch(err){           
            console.log(err)
            res.status(500).send(err)
        }
})

router.post('/fetchChunk', async (req,res)=>{
    try{
        const result=await notes.findOne({filename:req.body.filename}).select('file')
        res.send(result)
    }
    catch(err){
        console.log(err)
        res.status(500).send(err)
    }
})
router.post('/fetchNumChunks', async (req,res)=>{
    try{
        const result=await notes.findOne({filename:req.body.filename}).select('numChunks')
        res.send(result)
    }
    catch(err){
        console.log(err)
        res.status(500).send(err)
    }
})

router.delete('/deleteNote/:filename',async (req,res)=>{
    try{
        const note=await notes.findOne({filename:req.params.filename})
        await note.deleteOne()
        res.send(note)
    }
    catch(err){
        console.log(err)
        res.status(500).send(err)
    }
})

module.exports=router