const express = require("express");
const cors = require("cors");
const Pool = require("pg").Pool;
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

const pool = new Pool({
  user: "postgres",
  password: "postgres",
  host: "localhost",
  port: "5432",
  database: "postgres",
});

app.post("/admin/login", (req, res) => {
  const { email, pword } = req.body;
  // console.log(email, pword);
  const { rows } = pool
    .query(
      `select * from users where email = '${email}' and pass_word = '${pword}' `
    )
    .then((d) => {
      console.log("data => ", d);
      res.json(d);
    })
    .catch((e) => {
      console.log(res.json(e));
    });
});

app.get("/trainees", async (req, res) => {
  const { rows } = await pool.query("SELECT * FROM trainees");
  console.log(rows);
  res.json(rows);
});

app.put("/trainee/:trainee_id", async (req, res) => {
  const {trainee_id} = req.params;
  const {fname, lname, email, skill, speciality, detail } = req.body;   
  console.log(fname, lname, email, skill, trainee_id)
   let sql = `
    UPDATE trainees SET 
    trainee_firstname='${fname}', 
    trainee_lastname='${lname}' , 
    trainee_email='${email}' , 
    trainee_skill='${skill}' ,  
    trainee_specialty = '${speciality}' , 
    traineeback_detail = '${detail}'
    WHERE 
    trainees.trainee_id = ${trainee_id} RETURNING * `;
  await pool.query(sql)
  .then(row=>{
    console.log(row.rows)
    res.json(row.rows);
  }).catch(err=>{
    console.log(err)
  })
  // console.log(fname, lname, id);
  
});

app.delete("/trainee/delete/:id", async (req, res) => {
  const { id } = req.params;
  console.log(id);
  await pool
    .query("DELETE FROM trainees WHERE trainee_id = $1 RETURNING *", [id])
    .then(async (e) => {
      // console.log(e.rows)
      const { rows } = await pool.query("select * from trainees");
      res.json(rows);
      console.log("After Dev ==>> ", rows);
    });
});

app.post("/trainees/search", async (req, res) => {
  const { value } = req.body;
  let sql = `
  select * from trainees where trainee_firstname like '%${value}%' 
   or trainee_lastname like '%${value}%'
   or trainee_email like '%${value}%'`;
  try {
    const { rows } = await pool.query(sql);
    res.json(rows);
  } catch (error) {
    console.log(error);
  }
});

app.listen(port, function () {
  console.log(`Server running on port ${port}`);
});
