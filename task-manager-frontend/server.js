const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')

const app = express();
app.use(cors())

let tasks = [
  { id: 1, name: 'Task 1', description: 'Description 1', dueDate: '2024-05-10', status: 'todo', assignee: null },
  { id: 2, name: 'Task 2', description: 'Description 2', dueDate: '2024-05-15', status: 'in_progress', assignee: 1 },
  { id: 3, name: 'Task 3', description: 'Description 3', dueDate: '2024-05-20', status: 'done', assignee: 2 },
];
let nextTaskId = 4;



app.use(bodyParser.json());

app.get('/gettasks', (req, res) => {
  res.json(tasks);
});

app.post('/addtasks', (req, res) => {
    console.log('Received new task:', req.body);
  const newTask = { id: nextTaskId++, ...req.body };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

app.listen(3005, () => {
    console.log("listening on 3004")
})