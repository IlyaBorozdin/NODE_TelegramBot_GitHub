function emiterMiddleware(listeners) {
    return (ctx, next) => {
        ctx.emitState = async (state) => {
            const lastState = ctx.session.state;
            const event = ctx.session.event;
            ctx.setState(state);

            try {
                await Promise.all(
                    listeners
                        .filter((listener) => {
                            return listener.event === event && ctx.isState(listener.state);
                        })
                        .map(async (listener) => {
                            await listener.callback(ctx, next);
                        })
                );
            }
            finally {
                ctx.setState(lastState);
            }
        };
        return next();
    }
}

module.exports = emiterMiddleware;