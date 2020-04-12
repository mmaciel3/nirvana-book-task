require('dotenv').config();
const bookProjectBuilder = require('./src/bookProjectBuilder');

(async function () {
    const credentials = {
        userName: process.env.USER_NAME,
        password: process.env.PASSWORD
    };

    const parameters = {
        bookTitle: process.env.BOOK_TITLE,
        bookDescription: process.env.BOOK_DESCRIPTION,
        percentagePerDay: process.env.PERCENTAGE_PER_DAY,
        startDate: process.env.START_DATE
    }; 

    bookProjectBuilder.buildBookProject(credentials, parameters);
})();