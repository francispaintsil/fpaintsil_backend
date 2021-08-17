const express = require('express')
const bodyParser = require("body-parser")
const cors = require("cors")
const { response } = require('express');
const db = require('./query')
const app = express()
const port = 5000;

app.use(cors())

var corsOptions = {
    origin: 'http://localhost/3000',
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  }
   
 
app.get('/trainees/:id',  cors(corsOptions),function (req, res, next) {
  res.json({msg: 'This is CORS-enabled for all origins!'})
})
 
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended: true}));



app.get('/trainees/', db.getTrainees)

app.get('/trainees/:trainee_id', db.getTraineeById) 

app.post('/trainees', db.createTrainee)

app.put('trainees/:id', db.updateTrainee)

app.delete('trainees/:id', db.deleteTrainee)



app.listen(port, function() {
    console.log(`Server running on port ${port}`)
})