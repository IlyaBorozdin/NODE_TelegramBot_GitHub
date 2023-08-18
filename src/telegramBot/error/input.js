const { INCORRECT_DATA } = require('../../formatMsg/commomMsg');
const TelegramError = require('./telegram');

class InputError extends TelegramError {
    constructor(type) {
        super(INCORRECT_DATA(type || 'data'));
    }
}

module.exports = InputError;