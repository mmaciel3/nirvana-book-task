require('dotenv').config();

const PORT = process.env.PORT || 3000;
const bookProjectBuilder = require('./src/bookProjectBuilder');

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());

const validateRequiredFields = (req, res) => {
    const requiredFields = [
        'userName',
        'password',
        'bookTitle',
        'percentagePerDay',
        'startDate'
    ];

    let failure = false;

    for (field of requiredFields) {
        if (!req.body[field]) {
            res.status(400).send(`${field} is required`);
            failure = true;
            break;
        }
    }

    return failure;
}

app.post('/create-project', async (req, res) => {
    console.log('API was called');

    if (validateRequiredFields(req, res)) {
        return;
    }

    bookProjectBuilder.buildBookProject(req.body, req.headers['accept-language'])
        .then(() => {
            console.log('API finished successfully.');
            res.sendStatus(200);
        })
        .catch(err => {
            console.error(err);
            res.sendStatus(500);
        });
});

app.listen(PORT, () =>  {
    console.log('App is listening on port ' + PORT);
});