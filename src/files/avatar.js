const axios = require('axios');
const path = require('path');
const fs = require('fs').promises;

const imgDir = path.join(__dirname, '..', '..', 'img');

function saveAvatar(userData) {
    return axios.get(
        userData.avatar_url,
        { responseType: 'arraybuffer' }
    )
        .then((res) => {
            return fs.writeFile(
                path.join(imgDir, `${userData.login}.jpg`),
                Buffer.from(res.data)
            );
        })
        .catch((err) => {
            return Promise.reject(null);
        });
}

function deleteAvatar(userData) {
    return fs.unlink(path.join(imgDir, `${userData.login}.jpg`));
}

function pathImg(userData) {
    return path.join(imgDir, `${userData.login}.jpg`)
}

module.exports = {
    saveAvatar,
    deleteAvatar,
    pathImg
};