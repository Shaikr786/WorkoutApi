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
    origin: 'http://localhost:3000',
    credentials: true,
    exposedHeaders: ['Content-Disposition'],
    headers: ['Content-Type', 'Authorization'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    preflightContinue: false,
    optionsSuccessStatus: 204,
    allowedHeaders: ['Content-Type', 'Authorization'],
    maxAge: 86400
  }));
  
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Credentials', true);
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

