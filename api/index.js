const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();

app.use(bodyParser.json());
app.use(cors());

// Read data from db.json
const readData = () => {
  const data = fs.readFileSync(path.join(__dirname, 'db.json'), 'utf-8');
  return JSON.parse(data);
};

// Write data to db.json
const writeData = (data) => {
  fs.writeFileSync(path.join(__dirname, 'db.json'), JSON.stringify(data));
};

// GET all students
app.get('/students', (req, res) => {
  const data = readData();
  res.json(data.students);
});

// GET a specific student by id
app.get('/students/:id', (req, res) => {
  const data = readData();
  const student = data.students.find((student) => student.id === parseInt(req.params.id));
  res.json(student);
});

// POST a new student
app.post('/students', (req, res) => {
  const data = readData();
  const newStudent = req.body;
  newStudent.id = Date.now();
  data.students.push(newStudent);
  writeData(data);
  res.json(newStudent);
});

// DELETE a student by id
app.delete('/students/:id', (req, res) => {
  const data = readData();
  data.students = data.students.filter((student) => student.id !== parseInt(req.params.id));
  writeData(data);
  res.sendStatus(204);
});

// Use process.env.PORT for Heroku or fallback to 5000 for local development
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});