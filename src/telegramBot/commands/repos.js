const { ENTER_USER, REPOS_INFO } = require('../../formatMsg/commomMsg');
const gitHubAPI = require('../../gitHubAPI/gitHubAPI');
const Command = require('./command');

class ReposCommand extends Command {
    constructor(bot) {
        super(bot);
    }

    handle() {
        this.bot
            .command('repos', async (ctx, next) => {
                ctx.reply(ENTER_USER);
            })
            .on('text', async (ctx, next) => {
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
                    ctx.setState('repo');
                }
                catch (err) {
                    throw new InputError('username');
                }
            });
    }
}

module.exports = ReposCommand;