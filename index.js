const express= require('express');
const mongoose =require('mongoose');
const app= express();
const PORT = 3002;

// Connection 
mongoose
.connect("mongodb://127.0.0.1:27017/RegistationForm")
.then(()=>console.log("MongoDB Connected"))
.catch((err)=>console.log("Mongo Error", err));

//Schema
const userSchema= new mongoose.Schema({
    name: {
      type : String,
      required: true,
    },
    email:{
      type:String,
      required: true,
      unique:true,
    },
    contact: {
      type: String,
      required: true,
      
    },
    college: {
      type:String,
    }, 
    branch: {
        type:String,
      },
    gradYear: {
        type:String,
      }, 
    gender:{
      type:String,
    },
  },{timestamps: true} 
  );

  const User = mongoose.model("user", userSchema);

app.set("view engine", "ejs");
app.use(express.static('./public'));
app.use(express.urlencoded({extended:false}));

app.get('/',(req,res)=>{
    res.render("index");
});
app.post('/',async(req ,res)=>{
    const body = req.body;
    
    const result=await User.create({
        name:body.name,
        email:body.email,
        contact:body.contact,
        college:body.college,
        branch:body.branch,
        gradYear:body.gradYear,
        gender:body.gender
      });
    // console.log("result", result);
    return res.status(201).json({msg: "success"});
})
app.listen(PORT, ()=> console.log(`Server is running at PORT ${PORT}`));