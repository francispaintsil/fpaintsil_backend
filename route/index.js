const express = require('express')
const bodyParser = require('body-parser');
const { response } = require('express');
const db = require('./query')
const app = express()
const port = 5000;

app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({extended: true,
    })
)


app.get('/', (request, response) =>{
    response.json({info:'Portfolio API'})
})

app.get('/trainees/', db.getTrainees)

app.get('/trainees/:trainee_id', db.getTraineeById)

app.post('/trainees', db.createTrainee)

app.put('trainees/:id', db.updateTrainee)

app.delete('trainees/:id', db.deleteTrainee)



app.listen(port, () =>{
    console.log(`Server running on port ${port}`)
})