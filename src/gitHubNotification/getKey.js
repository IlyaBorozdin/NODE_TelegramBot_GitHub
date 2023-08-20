const appRoot = require('app-root-path');
const path = require('path');
const fs = require('fs').promises;

function getKey(id) {
    const file = path.join(appRoot.toString(), process.env.STORAGE);

    return fs.readFile(file, 'utf8')
        .then((data) => {
            const storage = JSON.parse(data);
            return storage.sessions
                .find((session) => session.id.split(':')[0] === id)
                .data.notifications.secretKey;
        })
        .catch((err) => {
            throw err;
        });
}

module.exports = getKey;