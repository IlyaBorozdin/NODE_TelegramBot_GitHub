const { Telegraf } = require('telegraf');
const LocalSession = require('telegraf-session-local')

const StartCommand = require('./commands/start');
const UserCommand = require('./commands/user');
const statesMiddleware = require('./states/middleware');
const SetGitHub = require('./commands/setGitHub');
const HelpCommand = require('./commands/help');
const ReposCommand = require('./commands/repos');

class TelegramBot extends Telegraf {
    constructor(token) {
        super(token);
    }

    command(event, callback) {
        super.command(event, callback);

        this.on = (eventOn, callbackOn, stateOn = event) => {

            super.on(eventOn, (ctx, next) => {
                if (ctx.isState(stateOn)) {
                    return callbackOn(ctx, next);
                }
                return next();
            });
            return this;
        };
        return this;
    }

    launch() {
        
        this.use((new LocalSession({
            database: 'telegramStorage.json',
            property: 'session',
            storage: LocalSession.storageFileAsync,
            format: {
                serialize: (obj) => JSON.stringify(obj, null, 2),
                deserialize: (str) => JSON.parse(str),
              },
        })).middleware());

        this.use(statesMiddleware);

        const commands = [
            StartCommand,
            HelpCommand,
            UserCommand,
            SetGitHub,
            ReposCommand
        ];

        commands.forEach((command) => {
            (new command(this)).handle();
        });

        super.launch();

        process.once('SIGINT', () => this.stop('SIGINT'));
        process.once('SIGTERM', () => this.stop('SIGTERM'));
    }
}

module.exports = new TelegramBot(process.env.BOT_TOKEN);
