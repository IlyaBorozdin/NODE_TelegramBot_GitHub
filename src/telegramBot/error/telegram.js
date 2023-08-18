const { SOME_ERROR } = require("../../formatMsg/commomMsg");

class TelegramError extends Error {
    constructor(message) {
        super(message || SOME_ERROR);
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = TelegramError;