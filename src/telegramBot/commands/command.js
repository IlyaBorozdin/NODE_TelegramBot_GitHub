class Command {

    static NULL_STATE = undefined;
    static GH_USER_INPUT = 'user-input';

    constructor(bot) {
        this.bot = bot;
    }

    handle() {
        throw Error('Method not implemented');
    }
}

module.exports = Command;