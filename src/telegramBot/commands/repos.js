const { ENTER_USER, INCORRECT_DATA, REPOS_INFO } = require('../../formatMsg/commomMsg');
const gitHubAPI = require('../../gitHubAPI/gitHubAPI');
const Command = require('./command');

class ReposCommand extends Command {
    constructor(bot) {
        super(bot);
    }

    static listener = async (ctx, next) => {
        try {
            const ghUser = ctx.message.text.trim();
            const dataGen = gitHubAPI.getRepos(ghUser);

            let startInd = 1;
            for await (const chunk of dataGen) {
                await ctx.reply(REPOS_INFO(chunk, startInd));
                startInd += chunk.length;
            }

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
            .command('repos', async (ctx) => {
                ctx.reply(ENTER_USER);
            })
            .on('text', ReposCommand.listener);
    }
}

module.exports = ReposCommand;