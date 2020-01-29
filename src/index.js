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
        task: [],
    };

    projects.push(project);
    return res.json(projects);
});

app.listen(port, () => console.log(`App is listening on port ${port}`));
