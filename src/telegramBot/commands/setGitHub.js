const { 
    SET_ACCOUNT,
    INPUT_ACCOUNT
} = require('../../formatMsg/commomMsg');

const Command = require('./command');
const UserCommand = require('./user');

class SetGitHub extends Command {
    constructor(bot) {
        super(bot);
    }

    static listener = async (ctx, next) => {
        const isCorrect = await UserCommand.listener(ctx, next);

        if (isCorrect) {
            ctx.session.gitHubAccount = {
                login: ctx.message.text.trim()
            };
    
            await ctx.reply(SET_ACCOUNT);
            ctx.setState(undefined);

            return true;
        }

        return false;
    };

    handle() {
        this.bot
            .command('set_GitHub', async (ctx) => {
                await ctx.reply(INPUT_ACCOUNT);
            })
            .on('text', SetGitHub.listener);
    }
}

module.exports = SetGitHub;