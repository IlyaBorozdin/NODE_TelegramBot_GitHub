const { Telegraf } = require('telegraf');
const LocalSession = require('telegraf-session-local')

const StartCommand = require('./commands/start');
const UserCommand = require('./commands/user');
const statesMiddleware = require('./widdlewares/states');
const SetGitHub = require('./commands/setGitHub');
const HelpCommand = require('./commands/help');
const ReposCommand = require('./commands/repos');
const errorsMiddleware = require('./widdlewares/errors');
const emiterMiddleware = require('./widdlewares/emiter');
const RepoCommand = require('./commands/repo');
const EmptyCommand = require('./commands/empty');
const CommitsCommand = require('./commands/commits');
const PullsCommand = require('./commands/pulls');
const NotificationCommand = require('./commands/notification');

class TelegramBot extends Telegraf {
    constructor(token) {
        super(token);

        this.hashListeners = [];
    }

    command(event, callback) {
        super.command(event, callback);

        this.on = (eventOn, callbackOn, stateOn = event) => {

            this.hashListeners.push({
                event: eventOn,
                state: stateOn,
                callback: callbackOn
            });

            super.on(eventOn, (ctx, next) => {

                if (ctx.isState(stateOn)) {
                    ctx.session.event = eventOn;
                    return callbackOn(ctx, next);
                }
                return next();
            });

            return this;
        };

        this.action = (eventAc, callbackAc) => {
            super.action(eventAc, callbackAc);
            return this;
        }

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
        this.use(emiterMiddleware(this.hashListeners));
        this.catch(errorsMiddleware);

        const commands = [
            StartCommand,
            HelpCommand,
            UserCommand,
            SetGitHub,
            ReposCommand,
            RepoCommand,
            CommitsCommand,
            PullsCommand,
            NotificationCommand,
            EmptyCommand
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
