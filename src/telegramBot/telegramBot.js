const { Telegraf } = require('telegraf');
const LocalSession = require('telegraf-session-local')

const StartCommand = require('./commands/start');
const UserCommand = require('./commands/user');

class TelegramBot extends Telegraf {
    constructor(token) {
        super(token);
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

        const commands = [
            StartCommand,
            UserCommand,
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
