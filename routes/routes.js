const express = require('express')
const router = express.Router()
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const User = require('../userSchema/userSchema')
const authMiddleware = require("../middleware/authMiddleware")

router.get("/", (req,res)=>{
 res.status(200).send("Login Routes")
})


// register route
router.post('/register', async(req,res)=>{
 try{
  const {username,email,password} = req.body

  // Check existing User
  const existingUser = await User.findOne({email});
  if(existingUser){
    return res.status(409).json({ message: 'User already exists' });
  }

  // hash password 
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt) 

  const newUser = new User({username, email, password:hashedPassword})
  const saveUser = await newUser.save();

  return res.status(201).json({message:"User created successfully"});
  

 }catch(err){
  res.status(500).json({message:err})
 }
})


// login route
router.post("/login", async(req,res)=>{
 try {
  const {email, password} = req.body;
  const user = await User.findOne({email})
  if(!user){
   return res.status(400).json({message:"Incorrect Credentials"})
  }

  const checkPassword = await bcrypt.compare(password, user.password);
  if(!checkPassword){
   return res.status(400).json({message:"Incorrect Credentials"})
  }

  // generate jwt token
  const jwtToken = jwt.sign(
    { id: user._id, username: user.username },
    process.env.JWT_SECRET_TOKEN,
    { expiresIn: process.env.Expires_In }
  );



  res.json({jwtToken})


 } catch (error) {
  res.status(500).json({message:error})
 }
})

// get route

router.get("/user", authMiddleware, (req,res)=>{
 res.json({message:"Access granted", user: req.user})
})

module.exports = router;