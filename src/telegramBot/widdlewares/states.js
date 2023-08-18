const statesMiddleware = (ctx, next) => {

    const entities = ctx.message?.entities?.[0];

    if (entities?.type === 'bot_command') {
        ctx.session.state = ctx.message.text.slice(
            entities.offset + 1,
            entities.offset + entities.length
        );
    }
    ctx.session.state = ctx.session.state || 'default';

    ctx.isState = (state) => state === ctx.session.state;

    ctx.setState = (state) => ctx.session.state = state;

    return next();
}

module.exports = statesMiddleware;