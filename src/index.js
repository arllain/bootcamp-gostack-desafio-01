const express = require('express');
const app = express();
const port = 3000;
const projects = [];

app.use(express.json());

/**
 * Middleware to log the numbers of requests
 */
function logRequests(req, res, next) {
    console.count('Number of requests');

    return next();
}

app.use(logRequests);

//Middleware to check if a project exists
function checkProjectExists(req, res, next) {
    const { id } = req.params;
    if (!findProject(id)) {
        return res.status(400).json({ error: 'Project not found' });
    }
    return next();
}

//Middleware to check if a project doesn't exists
function checkProjectNotExists(req, res, next) {
    const { id } = req.body;
    if (findProject(id)) {
        return res.status(400).json({ error: 'Project already exists' });
    }
    return next();
}

function findProject(id) {
    const project = projects.find(p => p.id == id);
    return project;
}

// Creates a new project
app.post('/projects', checkProjectNotExists, (req, res, next) => {
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
app.put('/projects/:id', checkProjectExists, (req, res, next) => {
    const { id } = req.params;
    const { title } = req.body;
    const project = projects.find(proj => proj.id == id);
    project.title = title;
    return res.json(projects);
});

//Delete an existing project by id
app.delete('/projects/:id', checkProjectExists, (req, res, next) => {
    const { id } = req.params;
    const index = projects.findIndex(proj => proj.id == id);
    projects.splice(index, 1);
    return res.send();
});

// Creates a new task for a project
app.post('/projects/:id/tasks', checkProjectExists, (req, res, next) => {
    const { id } = req.params;
    const { title } = req.body;

    const project = projects.find(proj => proj.id == id);
    project.tasks.push(title);

    return res.json(projects);
});

app.listen(port, () => console.log(`App is listening on port ${port}`));
