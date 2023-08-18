const Command = require("./command");
const gitHubAPI = require('../../gitHubAPI/gitHubAPI');
const Avatar = require('../../formatMsg/avatar');

const {
    USER_INFO,
    ENTER_USER
} = require('../../formatMsg/commomMsg');
const InputError = require("../error/input");

class UserCommand extends Command {
    constructor(bot) {
        super(bot);
    }

    handle() {
        this.bot
            .command('user', async (ctx, next) => {
                await ctx.reply(ENTER_USER);
            })
            .on('text', async (ctx, next) => {
                try {
                    const ghUser = ctx.message.text.trim();
                    const data = await gitHubAPI.getUser(ghUser);
                    const avatar = new Avatar(data);
        
                    await avatar.temporaryUse(async (path) => {
                        await ctx.replyWithPhoto({
                            source: path
                        }, {
                            caption: USER_INFO(data)
                        });
                    });
        
                    ctx.session.lastViewedGitHub = {
                        login: ghUser
                    };
                }
                catch (err) {
                    throw new InputError('username');
                }
            });
    }
}

module.exports = UserCommand;