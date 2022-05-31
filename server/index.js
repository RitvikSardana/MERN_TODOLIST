const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const morgan = require('morgan')
require('dotenv').config()

const api = require('./routes/api')

//middlewares
app.use(cors())
app.use(express.json())
app.use(morgan('dev'));

const URL = 'mongodb://localhost:27017/MERN_TODO'

mongoose.connect(URL)
    .then(()=>app.listen(1337,()=>{
        console.log("DB Connected and Server Running")
    }))

app.use('/api',api)