const express = require('express');

const app = express();
app.use(express.json());

const projects = [{ "id": 1, "title": "nova tarafe", "tasks": [] }, { "id": 2, "title": "nova tarafa", "tasks": [] }];

app.use((req, res, next) => {

  console.count("Número de requisições: ");
  return next();
});

function checkProjectExist(req, res, next) {
  const id = projects.find(p => p.id == req.params.id);

  if (!id) {
    return res.status(404).json({ error: 'Project not found' });
  }
  next();
}

app.get('/projects', (req, res) => {
  return res.json(projects);
});

app.get('/projects/:id', checkProjectExist, (req, res) => {
  const { id } = req.params;

  return res.send(projects[id]);
});

app.post('/projects', (req, res) => {
  const { id, title } = req.body;

  const project = {
    id,
    title,
    task: []
  }

  projects.push(project);

  return res.send().status(200);
});

app.post('/projects/:id/tasks', checkProjectExist, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const project = projects.find(p => p.id == id);

  project.tasks.push(title);

  return res.send(project);
});


app.put('/projects/:id', checkProjectExist, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const project = projects.find(p => p.id == id);
  project.title = title;

  return res.json(projects);
});

app.delete('/projects/:id', checkProjectExist, (req, res) => {
  const { id } = req.params;

  const project = projects.findIndex(p => p.id == id);

  projects.splice(project, 1);

  return res.json(projects);
});

app.listen(3000)