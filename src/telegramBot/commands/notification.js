const crypto = require('crypto');
const uuid = require('uuid');

const Command = require("./command");
const { SET_NOTIFICSTION } = require('../../formatMsg/commomMsg');

class NotificationCommand extends Command {
    constructor(bot) {
        super(bot);
    }

    handle() {
        this.bot
            .command('notification', async (ctx, next) => {
                const secretKey = uuid.v4();
                ctx.session.notifications = {
                    secretKey: secretKey
                };

                await ctx.replyWithMarkdownV2(SET_NOTIFICSTION(
                    ctx.from.id,
                    secretKey
                ));
                ctx.setState('default');
            });
    }
}

module.exports = NotificationCommand;
