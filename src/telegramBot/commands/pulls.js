const { PULL_INFO, NO_PULLS } = require('../../formatMsg/commomMsg');
const gitHubAPI = require('../../gitHubAPI/gitHubAPI');
const Command = require('./command');

class PullsCommand extends Command {
    constructor(bot) {
        super(bot);
    }

    handle() {
        this.bot
            .command('pulls', async (ctx, next) => {
                if (!ctx.session.lastViewedRepo.repo) {
                    await ctx.emitState('repo');
                }
                const ghRepo = ctx.session.lastViewedRepo.repo;
                const ghUser = ctx.session.lastViewedGitHub.login;
                const data = await gitHubAPI.getPulls(ghUser, ghRepo);

                if (data.length === 0) {
                    await ctx.reply(NO_PULLS(`${ghUser}/${ghRepo}`));
                }

                for await (const pull of data) {
                    await ctx.reply(PULL_INFO(pull));
                }
                ctx.setState('default');
            });
    }
}

module.exports = PullsCommand;
