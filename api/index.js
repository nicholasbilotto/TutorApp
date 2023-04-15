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

// GET all subjects
app.get('/subjects', (req, res) => {
  const data = readData();
  res.json(data.subjects);
});

// GET a specific subject by id
app.get('/subjects/:id', (req, res) => {
  const data = readData();
  const subject = data.subjects.find((subject) => subject.id === parseInt(req.params.id));
  res.json(subject);
});

// POST a new subject
app.post('/subjects', (req, res) => {
  const data = readData();
  const newSubject = req.body;
  newSubject.id = Date.now();
  data.subjects.push(newSubject);
  writeData(data);
  res.json(newSubject);
});

// DELETE a subject by id
app.delete('/subjects/:id', (req, res) => {
  const data = readData();
  data.subjects = data.subjects.filter((subject) => subject.id !== parseInt(req.params.id));
  writeData(data);
  res.sendStatus(204);
});

// GET all categories
app.get('/categories', (req, res) => {
  const data = readData();
  res.json(data.categories);
});

// GET a specific category by id
app.get('/categories/:id', (req, res) => {
  const data = readData();
  const category = data.categories.find((category) => category.id === parseInt(req.params.id));
  res.json(category);
});

// POST a new category
app.post('/categories', (req, res) => {
  const data = readData();
  const newCategory = req.body;
  newCategory.id = Date.now();
  data.categories.push(newCategory);
  writeData(data);
  res.json(newCategory);
});


// DELETE a category by id
app.delete('/categories/:id', (req, res) => {
  const data = readData();
  data.categories = data.categories.filter((category) => category.id !== parseInt(req.params.id));
  writeData(data);
  res.sendStatus(204);
});

// PATCH a category by id
app.patch('/categories/:id', (req, res) => {
  const data = readData();
  const categoryIndex = data.categories.findIndex((category) => category.id === parseInt(req.params.id));
  data.categories[categoryIndex] = { ...data.categories[categoryIndex], ...req.body };
  writeData(data);
  res.json(data.categories[categoryIndex]);
});

// GET all questions
app.get('/questions', (req, res) => {
  const data = readData();
  res.json(data.questions);
});

// GET a specific question by id
app.get('/questions/:id', (req, res) => {
  const data = readData();
  const question = data.questions.find((question) => question.id === parseInt(req.params.id));
  res.json(question);
});

// POST a new question
app.post('/questions', (req, res) => {
  const data = readData();
  const newQuestion = req.body;
  newQuestion.id = Date.now();
  data.questions.push(newQuestion);
  writeData(data);
  res.json(newQuestion);
});

// DELETE a question by id
app.delete('/questions/:id', (req, res) => {
  const data = readData();
  data.questions = data.questions.filter((question) => question.id !== parseInt(req.params.id));
  writeData(data);
  res.sendStatus(204);
});

// PATCH a question by id
app.patch('/questions/:id', (req, res) => {
  const data = readData();
  const questionIndex = data.questions.findIndex((question) => question.id === parseInt(req.params.id));
  data.questions[questionIndex] = { ...data.questions[questionIndex], ...req.body };
  writeData(data);
  res.json(data.questions[questionIndex]);
});

// GET all answers
app.get('/answers', (req, res) => {
  const data = readData();
  res.json(data.answers);
});

// POST a new answer
app.post('/answers', (req, res) => {
  const data = readData();
  const newAnswer = req.body;
  newAnswer.id = Date.now();
  data.answers.push(newAnswer);
  writeData(data);
  res.json(newAnswer);
});

// Use process.env.PORT for Heroku or fallback to 5000 for local development
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});