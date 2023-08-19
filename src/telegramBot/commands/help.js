const { Markup } = require('telegraf');

const { HELP } = require('../../formatMsg/commomMsg');
const Command = require('./command');

class HelpCommand extends Command {
    constructor(bot) {
        super(bot);
    }

    handle() {
        this.bot
            .command('help', async (ctx) => {
                const keyboard = Markup.keyboard([
                    ['/start', '/help'],
                    ['/user', '/set_GitHub'],
                    ['/repos', '/repo'],
                    ['/commits', '/pulls'],
                    ['/notification']
                ]);

                await ctx.reply(HELP, keyboard);
                ctx.setState('default');
            });
    }
}

module.exports = HelpCommand;
