const { COMMIT_INFO } = require('../../formatMsg/commomMsg');
const gitHubAPI = require('../../gitHubAPI/gitHubAPI');
const Command = require('./command');

class CommitsCommand extends Command {
    constructor(bot) {
        super(bot);
    }

    handle() {
        this.bot
            .command('commits', async (ctx) => {
                if (!ctx.session.lastViewedRepo.repo) {
                    await ctx.emitState('repo');
                }
                const ghRepo = ctx.session.lastViewedRepo.repo;
                const ghUser = ctx.session.lastViewedGitHub.login;
                const data = await gitHubAPI.getCommits(ghUser, ghRepo);

                for await (const commit of data) {
                    await ctx.reply(COMMIT_INFO(commit));
                }
                ctx.setState('default');
            });
    }
}

module.exports = CommitsCommand;
