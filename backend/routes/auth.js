const express = require('express')
const router = express.Router()
const Teacher = require('../models/Teacher')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')

router.post("/register",async(req,res)=>{
    try{
        console.log(req.body)
        const username = req.body.username
        const email = req.body.email
        const password = req.body.password
        const salt=await bcrypt.genSalt(10)
        const hashedPassword=bcrypt.hashSync(password,salt)
        const newTeacher=new Teacher({username,email,password:hashedPassword})
        const savedUser=await newTeacher.save()
        res.status(200).json(savedUser)
    }
    catch(err){
        // console.error(err)
        res.status(500).json(err)
    }

})

router.post("/login",async (req,res)=>{
    try{
        const teacher=await Teacher.findOne({email:req.body.email})
       
        if(!teacher){
            return res.status(404).json("User not found!")
        }
        const match=await bcrypt.compare(req.body.password,teacher.password)
        
        if(!match){
            return res.status(401).json("Wrong credentials!")
        }
        const token=jwt.sign({_id:teacher._id,username:teacher.username,email:teacher.email},process.env.SECRET,{expiresIn:"3d"})
        const {password,...info}=teacher._doc
        res.cookie("token",token).status(200).json(info)
    }
    catch(err){
        console.error(err)
        res.status(500).json(err)
    }
})

router.get("/logout",async (req,res)=>{
    try{
        res.clearCookie("token",{sameSite:"none",secure:true}).status(200).send("User logged out successfully!")
    }
    catch(err){
        res.status(500).json(err)
    }
})

router.get("/refetch", (req,res)=>{
    const token=req.cookies.token
    jwt.verify(token,process.env.SECRET,{},async (err,data)=>{
        if(err){
            return res.status(404).json(err)
        }
        res.status(200).json(data)
    })
})


module.exports = router