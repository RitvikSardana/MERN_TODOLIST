const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const morgan = require('morgan')
const User = require('./models/user.model')
const bcrypt = require('bcryptjs')
const { auth,requiresAuth } = require('express-openid-connect');
require('dotenv').config()

//AUTH DETAILS
const config = {
    authRequired: false,
    auth0Logout: true,
    issuerBaseURL: process.env.ISSUER_BASE_URL ,
    baseURL: process.env.BASE_URL,
    clientID: process.env.CLIENT_ID ,
    secret: process.env.SECRET,
};

//middlewares
app.use(cors())
app.use(express.json())
app.use(morgan('dev'));
//Setting up Auth
app.use(auth(config));
const URL = 'mongodb://localhost:27017/MERN_TODO'

mongoose.connect(URL)
    .then(()=>app.listen(1337,()=>{
        console.log("DB Connected and Server Running")
    }))

app.get('/',(req,res)=>{
    // req.oidc.isAuthenticated() ?res.redirect('http://localhost:3000/todos') : res.redirect('http://localhost:1337/login')
    res.send("Hello")
})

// app.get('/todos',requiresAuth(),(req,res)=>{
//     res.send(JSON.stringify(req.oidc.user))
// })

// app.post('/api/register',async (req,res)=>{
//     const hashedPassword = await bcrypt.hash(req.body.password,10)
//     const user = new User({
//         name:req.body.name,
//         email:req.body.email,
//         password:hashedPassword,
//     })
//     await user.save()
//         .then(()=>{
//             res.json({status:"ok"})
//         })
//         .catch(err=>{
//             console.log("Error is",err)
//             res.json({status:err,error:"Duplicate Mail"})
//         })
// })

// app.post('/api/login',async (req,res)=>{
//     const user = await User.findOne({
//         email:req.body.email,
//     })
//     console.log(req.oidc.isAuthenticated)
//     console.log(user)
//     console.log(req.body)
//     const isPasswordValid = await bcrypt.compare(req.body.password,user.password)

//     if(isPasswordValid){
//         res.json({status:"ok"})
//     }
//     else{
//         res.json({status:"error",error:"Invalid Email or Password"})
//     }

//     // await user.save()
//     //     .then(()=>{
//     //         res.json({status:"ok"})
//     //     })
//     //     .catch(err=>{
//     //         console.log("Error is",err)
//     //         res.json({status:err,error:"Duplicate Mail"})
//     //     })
// })
