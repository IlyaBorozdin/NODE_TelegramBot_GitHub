const { 
    SET_ACCOUNT,
    INPUT_ACCOUNT
} = require('../../formatMsg/commomMsg');

const Command = require('./command');

class SetGitHub extends Command {
    constructor(bot) {
        super(bot);
    }

    handle() {
        this.bot
            .command('set_GitHub', async (ctx, next) => {
                await ctx.reply(INPUT_ACCOUNT);
            })
            .on('text', async (ctx, next) => {
                await ctx.emitState('user');
        
                ctx.session.gitHubAccount = {
                    login: ctx.message.text.trim()
                };
        
                await ctx.reply(SET_ACCOUNT);
                ctx.setState('default');
            });
    }
}

module.exports = SetGitHub;
