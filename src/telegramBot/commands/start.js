const { Markup } = require('telegraf');

const { START_MSG, SKIPED } = require('../../formatMsg/commomMsg');
const Command = require('./command');
const SetGitHub = require('./setGitHub');

class StartCommand extends Command {
    constructor(bot) {
        super(bot);
    }

    handle() {
        this.bot
            .command('start', async (ctx) => {
                const inline = Markup.inlineKeyboard([
                    Markup.button.callback('Skip', 'skip')
                ]);

                await ctx.reply(START_MSG(ctx.from), inline);
                ctx.setState('set_GitHub');
            })
            .action('skip', async (ctx) => {
                await ctx.reply(SKIPED);
                ctx.setState(undefined);
            });
    }
}

module.exports = StartCommand;