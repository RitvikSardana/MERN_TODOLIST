const express = require('express')
const User = require('../models/user.model')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const router = express.Router()
require('dotenv').config()

const api_register_post = async (req,res)=>{
    const hashedPassword = await bcrypt.hash(req.body.password,10)
    const user = new User({
        name:req.body.name,
        email:req.body.email,
        password:hashedPassword,
    })
    await user.save()
        .then(()=>{
            res.json({status:"ok"})
        })
        .catch(err=>{
            console.log("Error is",err)
            res.json({status:err,error:"Duplicate Mail"})
        })
}

const api_login_post = async (req,res)=>{
    const user = await User.findOne({
        email:req.body.email,
    })
    if(!user){
        res.json({status:"error",error:"User not found"})
    }
    console.log(user)
    const isPasswordValid = await bcrypt.compare(req.body.password,user.password)

    if(isPasswordValid){
        const token = jwt.sign({
            email:user.email,
            userId:user._id,
        },process.env.TOKEN_SECRET)
        console.log(user._id)
        return res.json({status:"ok",user:token})
    }
    else{
        res.json({status:"error",error:false})
    }

}

const api_todos_post = async (req,res) =>{
    const token = req.headers['x-auth-token']
    try{
        const decoded = jwt.verify(token,process.env.TOKEN_SECRET)
        const email = decoded.email
        const user = await User.findOne({email})
        if(user.todoList.includes(req.body.todo)){
            res.json({status:"error",error:"Duplicate Todo"})
        }
        else{
            await User.updateOne(
                {email},
                {$push:{todoList:req.body.todo}}
            )
            res.json({status:"ok"})
        }
    }
    catch{
        console.log('error')
        res.json({status:'error',error:'invalid token'})
    }
}

const api_todos_get = async (req,res) =>{
    const token = req.headers['x-auth-token']
    try{
        const decoded = jwt.verify(token,process.env.TOKEN_SECRET)
        const email = decoded.email
        const user = await User.findOne({email})
        res.json({status:"ok",data:user.todoList})

    }
    catch{
        console.log('error')
        res.json({status:'error',error:'invalid token'})
    }
}

const api_todos_delete =  (req,res) =>{
    const token = req.headers['x-auth-token']
    const todo = req.body.todo
    try{
        const decoded = jwt.verify(token,process.env.TOKEN_SECRET)
        const email = decoded.email
        User.updateOne(
            {email},
            {$pull:{todoList:req.body.todo}}
        ).then((result)=>{
            // console.log(result)
            res.json({status:"ok"})
        })
    }
    catch{
        console.log('error')
        // res.json({status:'error',error:'invalid token'})
    }
}

const api_todos_put = async (req,res) =>{
    const token = req.body.headers['x-auth-token']
    const oldTodo = req.body.currentTodo;
    const newTodo = req.body.editTodoInput;
    // console.log(oldTodo,newTodo,token)
    try{
        const decoded = jwt.verify(token,process.env.TOKEN_SECRET)
        const email = decoded.email
        await User.updateOne(
            {email,todoList:oldTodo},
            {$set: {'todoList.$': newTodo}} // .$ acts as a placeholder for the match we got using first query
        ).then((result)=>{
        }).catch(err=>console.log(err))
        const updatedUser = await User.findOne({email})
        res.json({status:"ok",data:updatedUser.todoList})
    }
    catch{
        console.log('error')
        // res.json({status:'error',error:'invalid token'})
    }
}

module.exports = {
    api_register_post,
    api_login_post,
    api_todos_post,
    api_todos_get,
    api_todos_delete,
    api_todos_put
}