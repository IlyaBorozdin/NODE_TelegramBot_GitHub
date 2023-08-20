const { Markup } = require('telegraf');

const { START_MSG, SKIPED } = require('../../formatMsg/commomMsg');
const Command = require('./command');

class StartCommand extends Command {
    constructor(bot) {
        super(bot);
    }

    handle() {
        this.bot
            .command('start', async (ctx, next) => {
                const inline = Markup.inlineKeyboard([
                    Markup.button.callback('Skip', 'skip'),
                    Markup.button.callback('Let\'s go', 'setting')
                ]);

                await ctx.reply(START_MSG(ctx.from), inline);
            })
            .action('skip', async (ctx, next) => {
                await ctx.reply(SKIPED);
                ctx.setState('default');
            })
            .action('setting', async (ctx, next) => {
                await ctx.reply('Click: /set_GitHub');
                await ctx.reply('Click: /notification');
            });
    }
}

module.exports = StartCommand;
