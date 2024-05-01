
const express = require('express');
// const mysql = require('mysql');
const { Pool } = require('pg');
const cors = require('cors')
const bodyParser = require('body-parser');




const app = express()
app.use(cors())
app.use(express.json())
// app.use(bodyParser.json());

// const pool = mysql.createConnection({
//     host: "148.72.246.179",
//     user: "shaik",
//     password: "",
//     database: 'test'
// })
const pool = new Pool({
    user: 'oss_admin',
    host: '148.72.246.179',
    database: 'expense',
    password: 'Latitude77',
    schema:"public",
    port: '5432', 
});


app.post("/addtasks", (req, res) => {
    const {name, status, assigee } = req.body;
    console.log("Received data:", req.body);

    const sql = "INSERT INTO tasks (name, status, assigee) VALUES ($1, $2, $3)";
    const values = [name, status, assigee];
    console.log(values)

    pool.query(sql, values, (err, result) => {
        if (err) return res.json(err)
        return res.json(result)
        console.log(result)

    })
})


app.get('/gettasks', (req, res) => {


    const sql = "SELECT * from tasks";
    pool.query(sql,(err, data) => {
        console.log(err);
        console.log(data);
        if (err) return res.json(err);
        return res.json(data.rows)
    })
})

app.put("/updatetask", (req, res) => {
   
    const {status,taskId } = req.body;
  
    const sql = "UPDATE tasks SET status = $1 WHERE id = $2";
    const values = [status, taskId];
    console.log(values)
  
    pool.query(sql, values, (err, result) => {
      if (err) {
        console.error('Error updating task:', err);
        return res.status(500).json({ error: 'Error updating task' });
      }
      return res.json({ message: 'Task updated successfully' });
    });
  });

app.listen(3005, () => {
    console.log("listening on 3005")
})