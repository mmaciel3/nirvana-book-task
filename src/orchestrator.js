const moment = require('moment');

module.exports.createTasksByPages = (pagesInBook, pagesPerDay, startDate, bundle) => {
    const numberOfTasks = Math.floor(pagesInBook / pagesPerDay);
    const requires100PerCentTask = pagesInBook % pagesPerDay !== 0;

    const taskTitleGenerator = (count) => bundle.getValue('readUpToPage', (pagesPerDay * count));
    const finalTaskTitle = bundle.getValue('readUpToPage', pagesInBook);

    return createTasks(numberOfTasks, requires100PerCentTask, startDate, taskTitleGenerator, finalTaskTitle, bundle);
}

module.exports.createTasks = (percentagePerDay, startDate, bundle) => {
    const numberOfTasks = Math.floor(100 / percentagePerDay);
    const requires100PerCentTask = 100 % percentagePerDay !== 0;

    const taskTitleGenerator = (count) => bundle.getValue('readUpToPercentage', (percentagePerDay * count));
    const finalTaskTitle = bundle.getValue('readUpToPercentage', 100);

    return createTasks(numberOfTasks, requires100PerCentTask, startDate, taskTitleGenerator, finalTaskTitle, bundle);
};

function createTasks(numberOfTasks, requires100PerCentTask, startDate, taskTitleGenerator, finalTaskName, bundle) {
    const tasks = [];

    const date = moment(startDate, 'YYYYMMDD');
    let seqp = 1;

    for (var i = 1; i <= numberOfTasks; i++) {
        const task = {
            name: taskTitleGenerator(i),
            scheduleDate: date.format('YYYYMMDD'),
            dueDate: date.format('YYYYMMDD'),
            seqp: seqp++
        };
        tasks.push(task);
        date.add(1, 'days');
    }

    if (requires100PerCentTask) {
        const hundredPerCentTask = {
            name: finalTaskName,
            scheduleDate: date.format('YYYYMMDD'),
            dueDate: date.format('YYYYMMDD'),
            seqp: seqp++
        };
        tasks.push(hundredPerCentTask);
    }

    const updateBooksReadTask = {
        name: bundle.getValue('updateBooksRead'),
        scheduleDate: date.format('YYYYMMDD'),
        dueDate: date.format('YYYYMMDD'),
        seqp: seqp++
    };
    tasks.push(updateBooksReadTask);

    return tasks;
}
