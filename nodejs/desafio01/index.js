const express = require("express");

const server = express();

server.use(express.json());

let request = 1;
let id = 1;
const projects = [];

server.use((req, res, next) => {
  console.log(`Requisições feitas:`, request++);
  console.time("Request");
  console.log(`Método: ${req.method}; URL: ${req.url}`);
  next();
  console.timeEnd("Request");
});

function checkId(req, res, next) {
  const { id } = req.params;
  const project = projects.find(p => p.id == id);

  if (!project) {
    return res.status(400).json({ error: "Não existe o ID." });
  }

  return next();
}

server.get("/projects", (req, res) => {
  return res.json(projects);
});

server.post("/projects", (req, res) => {
  const { title } = req.body;

  const project = {
    id: id++,
    title,
    task: []
  };

  projects.push(project);

  return res.json(projects);
});

server.put("/projects/:id", checkId, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const project = projects.find(p => p.id == id);

  project.title = title;
  return res.json(projects);
});

server.delete("/projects/:id", checkId, (req, res) => {
  const { id } = req.params;

  const projectIndex = projects.findIndex(p => p.id == id);

  projects.splice(projectIndex, 1);

  return res.json(projects);
});

server.post("/projects/:id/tasks", checkId, (req, res) => {
  const { id } = req.params;
  const { task } = req.body;

  const project = projects.find(p => p.id == id);

  project.task = task;

  return res.json(projects);
});

server.listen(3001);
