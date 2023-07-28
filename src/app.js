require('dotenv').config()
const express=require('express')
require('./db/conn.js')
const cors=require('cors')
const path=require('path')
const bodyParser = require('body-parser');

//userRoutes
const userRouters=require('./routes/user/userRoutes.js')
const userImageRouters=require('./routes/user/imageRoutes.js')
const userLoginRouters=require('./routes/user/loginRoutes.js')

//admin Routes
const adminRouters=require('./routes/admin/adminRoutes.js')
const adminImageRouters=require('./routes/admin/imageRoutes.js')
const adminLoginRouters=require('./routes/admin/loginRoutes.js')
const adminNotesRouters=require('./routes/admin/notesRoutes.js')

const PORT=process.env.PORT || 8000
const app=express()

// Increase payload size limit (e.g., 100MB)
const corsOptions = {
    origin: 'https://rad-mermaid-f9ffe7.netlify.app', // Replace this with your frontend's URL
    optionsSuccessStatus: 200 // Some legacy browsers (IE11, various SmartTVs) choke on 204
  };
  
app.use(cors(corsOptions)); 
app.use(bodyParser.json({ limit: '100mb' }));
app.use(bodyParser.urlencoded({ limit: '100mb', extended: true }));
app.use(express.json())


app.use(userImageRouters)
app.use(userLoginRouters)
app.use(userRouters)

app.use(adminImageRouters)
app.use(adminLoginRouters)
app.use(adminRouters)
app.use(adminNotesRouters)


app.listen(PORT,()=>{
    console.log("Server running at port "+PORT)
})
