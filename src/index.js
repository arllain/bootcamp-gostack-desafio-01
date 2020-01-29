const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

const projects = [];

// Creates a new project
app.post('/projects', (req, res) => {
    const { id, title } = req.body;

    const project = {
        id,
        title,
        tasks: [],
    };

    projects.push(project);
    return res.json(projects);
});

// List all projects
app.get('/projects', (req, res) => {
    return res.json(projects);
});

//Update an existing project
app.put('/projects/:id', (req, res) => {
    const { id } = req.params;
    const { title } = req.body;
    const project = projects.find(proj => proj.id == id);
    project.title = title;
    return res.json(projects);
});

//Delete an existing project by id
app.delete('/projects/:id', (req, res) => {
    const { id } = req.params;
    const index = projects.findIndex(proj => proj.id == id);
    projects.splice(index, 1);
    return res.send();
});

// Creates a new task for a project
app.post('/projects/:id/tasks', (req, res) => {
    const { id } = req.params;
    const { title } = req.body;

    const project = projects.find(proj => proj.id == id);
    project.tasks.push(title);

    return res.json(projects);
});

app.listen(port, () => console.log(`App is listening on port ${port}`));
