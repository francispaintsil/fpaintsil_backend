const Pool = require('pg').Pool
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: 'postgres',
    port: 5432
})

const getTrainees = (request, response) =>{
    pool.query('SELECT * FROM trainees ORDER BY trainee_id ASC',(error, results) =>{
        if(error){
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const getTraineeById = (request, response) => {
    const trainee_id = parseInt(request.params.trainee_id)

    pool.query('SELECT * FROM trainees WHERE trainee_id = $1', [trainee_id], (error, results) =>{
        if(error){
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const createTrainee = (request, response) => {
    const { trainee_id, trainee_firstname, trainee_lastname, trainee_email,  trainee_skill,  trainee_specialty, traineeexperience, traineeback_detail } = request.body
  
    pool.query('INSERT INTO trainees (trainee_id, trainee_firstname, trainee_lastname, trainee_email,  trainee_skill,  trainee_specialty, traineeexperience, traineeback_detail) values VALUES ($1, $2, $3, $4, $5, $6, $7, $8)', [trainee_id, trainee_firstname, trainee_lastname, trainee_email,  trainee_skill,  trainee_specialty, traineeexperience, traineeback_detail], (error, results) => {
      if (error) {
        throw error
      }
      response.status(201).send(`User added with ID: ${results.insertId}`)
    })
  }
  
  const updateTrainee = (request, response) => {
    const trainee_id = parseInt(request.params.trainee_id)
    const { trainee_firstname, trainee_lastname, trainee_email } = request.body
  
    pool.query(
      'UPDATE trainees SET trainee_firstname = $1, trainee_lastname = $2, trainee_email = $3 WHERE trainee_id = $3',
      [trainee_firstname, trainee_lastname, trainee_email, trainee_id],
      (error, results) => {
        if (error) {
          throw error
        }
        response.status(200).send(`Trainee modified with ID: ${trainee_id}`)
      }
    )
  }
  
  const deleteTrainee = (request, response) => {
    const trainee_id = parseInt(request.params.trainee_id)
  
    pool.query('DELETE FROM trainees WHERE trainee_id = $1', [trainee_id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`Trainee deleted with ID: ${trainee_id}`)
    })
  }
  
  module.exports = {
    getTrainees,
    getTraineeById,
    createTrainee,
    updateTrainee,
    deleteTrainee,
  }