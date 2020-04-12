const uuid = require('uuid4');
const constants = require('./constants');

module.exports = ({
    name,
    type,
    parentId = '',
    startDate = '',
    dueDate = '',
    tags = ',personal,',
    state = constants.state.next,
    projectType = constants.projectType.parallel,
    note = '',
    seqp = 0
}) => {

    const data = {
        id: uuid(),
        name,
        type,
        state,
        parentid: parentId,
        waitingfor: '',
        completed: 0,
        cancelled: 0,
        seq: 0,
        seqp,
        seqt: 0,
        tags,
        note,
        ps: projectType,
        etime: 0,
        energy: 0,
        startdate: startDate,
        duedate: dueDate,
        recurring: null
    };

    const currentDate = Math.floor(+ new Date() / 1000);

    Object.keys(data).forEach(key => {
        data[`_${key}`] = currentDate;
    });

    return data;
};