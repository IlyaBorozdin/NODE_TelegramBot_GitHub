const axios = require('axios');
const path = require('path');
const fs = require('fs').promises;

class Avatar {
    constructor(data) {
        this.avatarUrl = data.avatar_url;
        this.imgPath = path.join(__dirname, 'img', `${data.login}.jpg`);
    }

    temporaryUse(callback) {
        return this.saveAvatar()
            .then(callback)
            .then(this.deleteAvatar.bind(this))
            .catch((err) => {
                return Promise.reject(err);
            });
    }

    saveAvatar() {
        return axios.get(
            this.avatarUrl,
            { responseType: 'arraybuffer' }
        )
            .then((res) => {
                return fs.writeFile(
                    this.imgPath,
                    Buffer.from(res.data)
                );
            })
            .then (() => {
                return this.imgPath;
            })
            .catch((err) => {
                return Promise.reject(err);
            });
    }

    deleteAvatar() {
        return fs.unlink(this.imgPath);
    }
}

module.exports = Avatar;