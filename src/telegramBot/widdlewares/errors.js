const TelegramError = require("../error/telegram");

const errorsMiddleware = async (err, ctx) => {
    console.log(err);
    const tErr = err instanceof TelegramError ? err : new TelegramError();

    await ctx.reply(tErr.message);
};

module.exports = errorsMiddleware;