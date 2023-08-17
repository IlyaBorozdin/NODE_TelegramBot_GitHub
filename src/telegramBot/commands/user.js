const Command = require("./command");
const gitHubAPI = require('../../gitHubAPI/gitHubAPI');
const Avatar = require('../../formatMsg/avatar');

const {
    USER_INFO,
    INCORRECT_DATA,
    ENTER_USER
} = require('../../formatMsg/commomMsg');

class UserCommand extends Command {
    constructor(bot) {
        super(bot);
    }

    static listener = async (ctx, next) => {
        try {
            const ghUser = ctx.message.text.trim();
            const data = await gitHubAPI.getUser(ghUser);
            const message = USER_INFO(data);
            const avatar = new Avatar(data);

            await avatar.temporaryUse(async (path) => {
                await ctx.replyWithPhoto({
                    source: path
                }, {
                    caption: message
                });
            });

            ctx.session.lastViewedGitHub = {
                login: ghUser
            };

            return true;
        }
        catch (err) {
            await ctx.reply(INCORRECT_DATA('username'));
            return false;
        }
    };

    handle() {
        this.bot
            .command('user', async (ctx) => {
                await ctx.reply(ENTER_USER);
            })
            .on('text', UserCommand.listener);
    }
}

module.exports = UserCommand;