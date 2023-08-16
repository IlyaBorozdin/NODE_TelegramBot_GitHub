'use strict';

require('dotenv').config();
const telegramBot = require('./src/telegramBot/telegramBot');

telegramBot.launch();
