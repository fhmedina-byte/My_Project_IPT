
const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json()); 

const students = [
  { id: 1, name: "Mae",  course: "BSIT" },
  { id: 2, name: "Larra", course: "BSHM" },
  { id: 3, name: "Mabel",  course: "BSCS" }
];


app.get("/students", (req, res) => {
  res.json(students);
});


app.get("/students/:id", (req, res) => {
  const student = students.find(s => s.id === parseInt(req.params.id));
  student ? res.json(student) : res.status(404).json({ error: "Student not found" });
});


app.get("/students/filter", (req, res) => {
  const { course } = req.query;
  if (course) {
    const filtered = students.filter(s => s.course.toLowerCase() === course.toLowerCase());
    return res.json(filtered);
  }
  res.json(students);
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

