const express = require('express');
const { uuid, isUuid } = require('uuidv4');

const app = express();
app.use(express.json());
app.use('/projects/:id', validateProjectId);

const projects = [];

function logRequests(req, res, next) {
  const { method, url } = req;

  const lobLabel = `[${method.toUpperCase()}] ${url}`;

  console.log("Executou middleware de log")
  console.time(lobLabel);

  next();

  console.log("Terminou middleware de log")
  console.timeEnd(lobLabel);
}

function validateProjectId(req, res, next) {
  const { id } = req.params;

  if (!isUuid(id)) {
    return res.status(400).json({ error: 'Invalid project ID.' })
  }

  return next();
}

app.get('/projects', logRequests, (req, res) => {
  console.log("Executou middleware de rota (GET)");
  const { title } = req.query;
  const results = title
    ? projects.filter(project => project.title.includes(title))
    : projects;

  return res.json(results)
});

app.post('/projects', (req, res) => {
  const { title, owner } = req.body;

  const project = { id: uuid(), title, owner };

  projects.push(project);

  return res.json(project);
});

app.put('/projects/:id', (req, res) => {
  const { id } = req.params;
  const { title, owner } = req.body;

  const projectIndex = projects.findIndex(project => project.id === id);

  if (projectIndex < 0) {
    return res.status(400).json({ error: "Project not found." });
  }

  const project = {
    id,
    title,
    owner
  }

  projects[projectIndex] = project;

  return res.json(projects)
});

app.delete('/projects/:id', (req, res) => {
  const { id } = req.params;

  const projectIndex = projects.findIndex(project => project.id === id);

  if (projectIndex < 0) {
    return res.status(400).json({ error: "Project not found." });
  }

  projects.splice(projectIndex, 1);

  // 204 = retorna uma requisação de sucess sem conteúdo.
  return res.status(204).send();
});

app.listen(3333, () => {
  console.log('🚀 Back-end started!');
})