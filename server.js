const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());

app.use(express.json());

let projects = [
  { id: 1, title: "Semantic HTML", category: "html", description: "Uses proper semantic tags." },
  { id: 2, title: "Responsive Styling", category: "css", description: "CSS Grid and Flexbox layouts." }
];

app.get('/projects', (req, res) => {
  return res.status(200).json({
    status: "success",
    data: projects
  });
});

app.post('/projects', (req, res) => {
  const { title, category, description } = req.body;

  if (!title || typeof title !== 'string' || title.trim() === '') {
    return res.status(400).json({
      status: "error",
      message: "Bad Request: 'title' is required and must be a non-empty string."
    });
  }

  if (!category || typeof category !== 'string' || category.trim() === '') {
    return res.status(400).json({
      status: "error",
      message: "Bad Request: 'category' is required."
    });
  }

  const newProject = {
    id: projects.length + 1,
    title: title.trim(),
    category: category.trim(),
    description: description ? description.trim() : ""
  };

  projects.push(newProject);

  return res.status(201).json({
    status: "success",
    message: "Project created successfully",
    data: newProject
  });
});

app.use((req, res) => {
  return res.status(404).json({
    status: "error",
    message: "Route not found"
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});