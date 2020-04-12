require('dotenv').config();
const authenticate = require('./src/auth.js');
const { createProject, createTask } = require('./src/tasks');

(async function () {
    const authToken = await authenticate(process.env.USER_NAME, process.env.PASSWORD);
    console.log(authToken);

    //dates should be in format 'YYYYMMDD'
    const projectId = await createProject(authToken, process.env.PROJECT_NAME, process.env.START_DATE, process.env.DUE_DATE);
    console.log(projectId);
})();