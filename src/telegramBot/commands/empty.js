const Command = require('./command');

class EmptyCommand extends Command {
    constructor(bot) {
        super(bot);
    }

    handle() {
        this.bot
            .on('text', async (ctx, next) => {
                await ctx.replyWithSticker('CAACAgIAAxkBAALKLmTfubODe1BYeWNvOTK7a50VsSJ9AAJJGAAC4HwRSGDdkS2OuEGDMAQ');
            }, 'default');
    }
}

module.exports = EmptyCommand;
