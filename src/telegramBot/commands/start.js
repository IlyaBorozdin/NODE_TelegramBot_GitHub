const Command = require("./command");

class StartCommand extends Command {
    constructor(bot) {
        super(bot);
    }

    handle() {
        this.bot.command('start', (ctx) => {
            const name = ctx.from.first_name;
            
            ctx.reply(`Hello, ${name}\nI'm a GitHub integration bot.\nShell we start?`);
        });
    }
}

module.exports = StartCommand;