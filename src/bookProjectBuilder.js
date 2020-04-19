const authenticate = require('./auth');
const { createProject, createTask } = require('./tasks');
const orchestrator = require('./orchestrator');
const Bundle = require('./bundle');

module.exports.buildBookProject = async (parameters, language) => {
    const authToken = await authenticate(parameters.userName, parameters.password);
    const bundle = new Bundle(language);

    const tasks = orchestrator.createTasks(parameters.percentagePerDay, parameters.startDate, bundle);

    const dueDate = tasks[tasks.length - 1].dueDate;
    const projectName = bundle.getValue('readBook', parameters.bookTitle);

    const projectId = await createProject({ authToken, projectName, dueDate, note: parameters.bookDescription });
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