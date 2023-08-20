'use strict';

require('dotenv').config();
const telegramBot = require('./src/telegramBot/telegramBot');
const app = require('./src/gitHubNotification/server');

const port = process.env.PORT || 80;

telegramBot.launch();

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    console.log('Use http://localhost:80/webhook/797527763');
});

