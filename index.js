require('dotenv').config();
const authenticate = require('./src/auth.js');
const { createProject, createTask } = require('./src/tasks');
const orchestrator = require('./src/orchestrator');

(async function () {
    const authToken = await authenticate(process.env.USER_NAME, process.env.PASSWORD);
    console.log(authToken);

    const tasks = orchestrator.createTasks(process.env.PERCENTAGE_PER_DAY, process.env.START_DATE);
    const projectDueDate = tasks[tasks.length - 1].dueDate;

    const projectId = await createProject({ authToken, projectName: process.env.BOOK_TITLE, dueDate: projectDueDate, note: process.env.BOOK_DESCRIPTION });
    console.log(`Project created with ID ${projectId}`);

    for (task of tasks) {
        const id = await createTask(
            {
                authToken,
                projectId,
                ...task
            }
        );

        console.log(`Task ${task.name} was created with id ${id}`);
    }
})();