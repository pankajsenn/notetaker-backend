const mongoose = require("mongoose");
const express = require("express");
const app = express();
const cors = require("cors")
const port = 3001;
const User = require("./model/User");
const Note = require("./model/Note");
const connectionUrl = `mongodb+srv://pankajsentheking11:NoteTaker@cluster0.83lkxxg.mongodb.net/?retryWrites=true&w=majority`
app.use(express.json());
app.use(cors());

mongoose.set('strictQuery', true);
mongoose.connect(connectionUrl).then(()=>console.log("mongo connected")).catch((e)=>{console.log(e)})

//register
app.post("/signup",async(req,res)=>{
 try{
    let user = await User.create(req.body);
    res.json({
        statusCode:200,
        status:"Success",
        user
    })
 }
 catch(e){
    res.json({
        statusCode:400,
        message:e.message
    })
 }
 

})


//login
app.post("/signin",async(req,res)=>{
    let {email,password} = req.body;
    let user = await User.findOne({email,password})
    if(user){
       res.json({
        statusCode:200,
        status:"Success"
       })
    }
    else{
        res.json({
            statusCode:404,
            status:"Failed"
           })
    }
})


//creating notes
app.post("/postnotes",async(req,res)=>{
    console.log(req.body)
    try{
        let note= await Note.create(req.body);
        res.json({
            statusCode:200,
            status:"Success",
            note
        })
        }
    catch(e){
        res.json({
            statusCode:500,
            message:e.message
        })
    }
    
})

//sending all notes

app.get("/getnotes",async(req,res)=>{
    try{
     let notes = await Note.find();
     console.log(notes)
     res.json({
        statusCode:200,
        status:"Success",
        notes
     })
    }
    catch(e){
        res.json({
            statusCode:500,
            message:e.message
        })
    }
})

//deleting all notes
app.delete("/deletenotes",async(req,res)=>{
    try{
     await Note.deleteMany()
     res.json({
        statusCode:200,
        status:"Success"
    })
    }
    catch(e){
        res.json({
            statusCode:500,
            message:e.message
        })
    }
})
app.listen(port,()=>{console.log(`server is up at port ${3001}`)})

