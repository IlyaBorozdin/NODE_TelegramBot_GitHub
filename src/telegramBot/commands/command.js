class Command {
    constructor(bot) {
        this.bot = bot;
    }

    handle() {
        throw Error('Method not implemented');
    }
}

module.exports = Command;
