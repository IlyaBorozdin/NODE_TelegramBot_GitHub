const { ENTER_REPO, REPO_INFO } = require('../../formatMsg/commomMsg');
const InputError = require('../error/input');
const Command = require('./command');
const gitHubAPI = require('../../gitHubAPI/gitHubAPI');

class RepoCommand extends Command {
    constructor(bot) {
        super(bot);
    }

    handle() {
        this.bot
            .command('repo', async (ctx, next) => {
                await ctx.reply(ENTER_REPO);
            })
            .on('text', async (ctx, next) => {
                try {
                    const ghRepo = ctx.message.text.trim();
                    if (!ctx.session.lastViewedGitHub.login) {
                        await ctx.emitState('user');
                    }
                    const ghUser = ctx.session.lastViewedGitHub.login;

                    const data = await gitHubAPI.getRepo(ghUser, ghRepo);
                    await ctx.reply(REPO_INFO(data));

                    const content = await gitHubAPI.getRepoContent(ghUser, ghRepo);
                    await ctx.reply(content);

                    ctx.session.lastViewedRepo = {
                        repo: ghRepo
                    };
                }
                catch (err) {
                    throw new InputError('repository/username');
                }
            });
    }
}

module.exports = RepoCommand;
