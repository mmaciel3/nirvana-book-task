const payload = require('./payload');
const constants = require('./constants');
const uuid4 = require('uuid4');
const fetch = require('node-fetch');
const { URLSearchParams } = require('url');

module.exports.createProject = async ({ authToken, projectName, dueDate, note }) => {
    const url = buildUrl(authToken);

    const data = payload({
        name: projectName,
        type: constants.type.project,
        dueDate,
        state: constants.state.activeProject,
        projectType: constants.projectType.sequential,
        note
    });

    const body = [
        {
            'method': 'task.save',
            ...data
        }
    ];

    return fetch(url, { method: 'POST', body: JSON.stringify(body), headers: { 'Content-Type': 'application/json' } })
        .then(res => body[0].id)
};


module.exports.createTask = ({ authToken, projectId, name, scheduleDate, dueDate, seqp }) => {
    const url = buildUrl(authToken);

    const data = payload({
        name,
        parentId: projectId,
        type: constants.type.task,
        dueDate,
        startDate: scheduleDate,
        seqp,
        state: constants.state.scheduled,
        projectType: constants.projectType.sequential
    });

    const body = [
        {
            'method': 'task.save',
            ...data
        }
    ];

    return fetch(url, { method: 'POST', body: JSON.stringify(body), headers: { 'Content-Type': 'application/json' } })
        .then(res => res.json())
        .then(res => body[0].id)

};

function buildUrl(authToken) {
    const urlParameters = new URLSearchParams();
    urlParameters.append('api', 'json');
    urlParameters.append('requestid', uuid4());
    urlParameters.append('clienttime', +new Date());
    urlParameters.append('authtoken', authToken);
    urlParameters.append('appid', 'n2desktop');
    urlParameters.append('appversion', '1582066800');
    return `https://api.nirvanahq.com?${urlParameters.toString()}`;
}
