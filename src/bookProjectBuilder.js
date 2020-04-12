const authenticate = require('./auth');
const { createProject, createTask } = require('./tasks');
const orchestrator = require('./orchestrator');

module.exports.buildBookProject = async (parameters) => {
    const authToken = await authenticate(parameters.userName, parameters.password);

    const tasks = orchestrator.createTasks(parameters.percentagePerDay, parameters.startDate);
    const projectDueDate = tasks[tasks.length - 1].dueDate;

    const projectId = await createProject({ authToken, projectName: parameters.bookTitle, dueDate: projectDueDate, note: parameters.bookDescription });
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
}