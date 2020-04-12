const payload = require('./payload');
const constants = require('./constants');
const uuid4 = require('uuid4');
const fetch = require('node-fetch');
const { URLSearchParams } = require('url');

const createProject = async (authToken, projectName, startDate, dueDate) => {
    const urlParameters = new URLSearchParams();
    urlParameters.append('api', 'json');
    urlParameters.append('requestid', uuid4());
    urlParameters.append('clienttime', +new Date());
    urlParameters.append('authtoken', authToken);
    urlParameters.append('appid', 'n2desktop');
    urlParameters.append('appversion', '1582066800');

    const url = `https://api.nirvanahq.com?${urlParameters.toString()}`;

    const body = [
        {
            'method': 'task.save',
            ...payload({ projectName, type: constants.type.project, startDate, dueDate, state: constants.state.activeProject })
        }
    ];

    await fetch(url, { method: 'POST', body: JSON.stringify(body), headers: { 'Content-Type': 'application/json'} })
        .then(res => res.json());

    return body[0].id;
};

const createTask = () => {

};

module.exports = {
    createProject,
    createTask
};