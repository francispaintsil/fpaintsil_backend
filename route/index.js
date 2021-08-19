const express = require('express')
const bodyParser = require("body-parser")
const cors = require("cors")
const { response } = require('express');
const db = require('./query');
const Pool  = require('pg').Pool;
const app = express()
const port = 5000;
// const {pool} = require('./db')

app.use(cors())
app.use(express.json())

// app.get('/trainees/:id',  cors(corsOptions),function (req, res, next) {
//   res.json({msg: 'This is CORS-enabled for all origins!'})
// })

const pool = new Pool({
  user: 'postgres',
  password: 'postgres',
  host: 'localhost',
  port:'5432',
  database:'postgres'
});

  app.get('/trainees', async(req, res) =>{

    const {rows} = await pool.query('SELECT * FROM trainees')
    //console.log(rows) 
    res.json(rows)
  });




// app.post('/trainees', db.createTrainee)

// app.put('trainees/:id', db.updateTrainee)

// app.delete('trainees/:id', db.deleteTrainee)




app.listen(port, function() {
    console.log(`Server running on port ${port}`)
})
