const express = require('express');
const crypto = require('crypto');
const getKey = require('./getKey');
const telegramBot = require('../telegramBot/telegramBot');
const formatNotification = require('../formatMsg/formatNotification');

const app = express();

app.use(express.json());

app.post(
    '/webhook/:recipient',
    (req, res, next) => {
        const signature = req.headers['x-hub-signature'];
        const payload = JSON.stringify(req.body);
        console.log(JSON.stringify(req.body, null, 2));

        getKey(req.params.recipient)
            .then((secretKey) => {
                const hmac = crypto.createHmac('sha1', secretKey);
                const calculatedSignature = `sha1=${hmac.update(payload).digest('hex')}`;

                if (crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(calculatedSignature))) {
                    return next();
                } 
                return res.status(403).send('Forbidden');
            })
            .catch((err) => {
                console.error(err);
                return res.status(500).send('Internal Error');
            })
    },
    (req, res, next) => {
        const notification = formatNotification(req.body);
        telegramBot.telegram.sendMessage(req.params.recipient, notification);
        return res.status(200).send('Notification received and processed');
    }
);

module.exports = app;
