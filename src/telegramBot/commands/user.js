const { Markup } = require('telegraf');

const Command = require("./command");
const gitHubAPI = require('../../gitHubAPI/gitHubAPI');

const {
    saveAvatar,
    deleteAvatar,
    pathImg
} = require('../../files/avatar');

class UserCommand extends Command {
    constructor(bot) {
        super(bot);
    }

    handle() {
        this.bot.command('user', (ctx) => {
            ctx.reply('Enter the GitHub user you want to follow.');
            ctx.session.state = this.GH_USER_INPUT;
        });

        this.bot.on('text', (ctx) => {
            if (ctx.session?.state === this.GH_USER_INPUT) {
                const user = ctx.message.text.trim();
                gitHubAPI.getUser(user)
                    .then(async (userData) => {
                        
                        const message = `Name: ${userData.name}\nUsername: @${userData.login}\nEmail: ${userData.email}\nURL: ${userData.html_url}\nID: ${userData.id}\nCompany: ${userData.company}\nCreated at: ${userData.created_at}\nFollowers: ${userData.followers}\nFollowing: ${userData.following}\nPublic Repos: ${userData.public_repos}`;

                        if (userData.avatar_url) {
                            await saveAvatar(userData);

                            await ctx.replyWithPhoto({
                                source: pathImg(userData)
                            }, {
                                caption: message
                            });

                            await deleteAvatar(userData);
                        }
                        else {
                            ctx.reply(message);
                        }
                    })
                    .catch((err) => {
                        ctx.reply('Oops, something seems to be wrong. Make sure you entered the username correctly.');
                    })
                    .finally(() => {
                        ctx.session.state = this.NULL_STATE;
                    });
            }
        });
    }
}

module.exports = UserCommand;