require('dotenv').config()

const express = require('express')

const cors = require('cors')
const mongoose = require('mongoose')

const workoutRoutes = require('./routes/workouts')
const UserRoutes = require('./routes/user')


//express app
const app = express()

app.use(express.json())
app.use(express.static('public'))
app.use(express.static('files'))

app.use(cors({
    origin: ' https://workoutapi-v3lm.onrender.com', // Allow requests from this origin
    credentials: true, // Allow credentials (e.g. cookies) to be sent with the request
  }));

app.use((req, res, next) =>{
    console.log(req.path, req.method)
    next()
})



app.use('/api/workouts' ,workoutRoutes)
app.use('/api/user' ,UserRoutes)



mongoose.connect(process.env.URI).then(()=>{
    app.listen(process.env.PORT ,()=>{
        console.log("connected to db and listening to port 4000")
    })
}).catch((error)=>{
    console.log(error)
})


app.get('/' ,(req ,res) =>{
    res.json({messg:'welcome to app'})
})

