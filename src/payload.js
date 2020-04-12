const uuid = require('uuid4');
const constants = require('./constants');

module.exports = ({ projectName, type, startdate = "", duedate = "", tags = ',personal,', state = constants.state.next }) => {
    const data = {
        id: uuid(),
        name: projectName,
        type,
        state,
        parentid: "",
        waitingfor: "",
        completed: 0,
        cancelled: 0,
        seq: 0,
        seqp: 0,
        seqt: 0,
        tags,
        note: "",
        ps: '0',
        etime: 0,
        energy: 0,
        startdate,
        duedate,
        recurring: null
    };

    const currentDate = Math.floor(+ new Date() / 1000);

    Object.keys(data).forEach(key => {
        data[`_${key}`] = currentDate;
    });

    return data;
};