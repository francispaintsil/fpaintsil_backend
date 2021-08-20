const express = require('express')
const bodyParser = require("body-parser")
const cors = require("cors")
const { response } = require('express');
const db = require('./query');
const Pool  = require('pg').Pool;
const app = express()
const port = 5000;


app.use(cors())
app.use(express.json())

const pool = new Pool({
  user: 'postgres',
  password: 'postgres',
  host: 'localhost',
  port:'5432',
  database:'postgres'
});

  app.get('/trainees', async(req, res) =>{

    const {rows} = await pool.query('SELECT * FROM trainees')
    console.log(rows) 
    res.json(rows)
  });


app.put('trainee/:trainee_id', async (req, res, {trainee_id, trainee_firstname, trainee_lastname, trainee_email, trainee_skill,trainee_specialty, traineeexperience, traineeback_detail}) => {
  const text = `UPDATE trainees SET trainee_firstname=$2, trainee_lastname=$3, trainee_email=$4, trainee_skill=$5, trainee_specialty=$6, traineeexperience=$7, traineeback_detail=$8 WHERE trainee_id = $1 RETURNING *`
  const values = [trainee_id, trainee_firstname, trainee_lastname, trainee_email, trainee_skill,trainee_specialty, traineeexperience, traineeback_detail]
  const rows = await pool.query(text, values);
 //console.log(rows)
  res.json(rows)
})

app.delete('trainee/:trainee_id', async (req, res) => {
  const {rows} = await pool.query('DELETE FROM trainee WHERE trainee_id = $1', [trainee_id])
  res.json(rows)
})

app.listen(port, function() {
    console.log(`Server running on port ${port}`)
})
