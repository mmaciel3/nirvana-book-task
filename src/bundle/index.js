const defaultLanguage = 'pt_BR';
const requireDir = require('require-dir');

const languageFiles = requireDir('.', { extensions: ['.json'] });
const validLanguages = Object.keys(languageFiles);

module.exports = class Bundle {
    constructor(language) {
        let languageToUse = defaultLanguage;
        if (validLanguages.includes(language)) {
            languageToUse = language;
        }

        this.bundleFile = languageFiles[languageToUse];
    }

    getValue(key, ...variables) {
        let valueFromBundle = this.bundleFile[key];

        for (let i = 0; i < variables.length; i++) {
            valueFromBundle = valueFromBundle.replace('%s', variables[i]);
        }

        return valueFromBundle;
    }
}