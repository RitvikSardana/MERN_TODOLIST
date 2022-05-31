const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name:{
        type:'String',
        required:true
    },
    email:{
        type:'String',
        required:true,
        unique:true
    },
    password:{
        type:'String',
        required:true
    },
    todoList:{
        type:Array,
        unique:true
    }
},{timestamps:true,collection:'Users'})

const User = mongoose.model("UserData",userSchema)

module.exports = User