require('dotenv').config()

const express = require('express')

const cors = require('cors')
const mongoose = require('mongoose')

const workoutRoutes = require('./routes/workouts')
const UserRoutes = require('./routes/user')


//express app
const app = express()

app.use(express.json())

app.use(cors({
    origin: ' https://workoutapi-v3lm.onrender.com', // Allow requests from this origin
    credentials: true, // Allow credentials (e.g. cookies) to be sent with the request
  }));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'https://workoutapi-v3lm.onrender.com');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    console.log(req.path, req.method)
    next();
  });


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

