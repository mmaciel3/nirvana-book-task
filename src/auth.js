const fetch = require('node-fetch');
const uuid4 = require('uuid4');
const md5 = require('md5');
const { URLSearchParams } = require('url');

module.exports = (userName, password) => {
    const urlParameters = new URLSearchParams();
    urlParameters.append('api', 'rest');
    urlParameters.append('requestid', uuid4());
    urlParameters.append('clienttime', +new Date());
    urlParameters.append('authtoken', false);
    urlParameters.append('appid', 'n2desktop');
    urlParameters.append('appversion', '1582066800');

    const url = `https://api.nirvanahq.com?${urlParameters.toString()}`;

    const body = new URLSearchParams();
    body.append('u', userName);
    body.append('p', md5(password));
    body.append('method', 'auth.new');

    return fetch(url, { method: 'POST', body })
        .then(res => res.json())
        .then(result => result.results[0].auth.token);
};