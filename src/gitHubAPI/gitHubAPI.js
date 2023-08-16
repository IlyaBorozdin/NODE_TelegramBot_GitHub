const axios = require('axios');
const path = require('path');

class GitHubAPI {
    constructor() {
        this.baseUrl = process.env.GITHUB_URL
        this.headers = {
            Authorization: `Bearer ${process.env.GITHUB_TOKEN}`
        };
    }

    getUser(user) {
        return axios.get(
            path.join(this.baseUrl, 'users', user),
            { headers: this.headers }
        )
            .then((res) => {
                return res.data;
            })
            .catch((err) => {
                throw err;
            });
    }
}

module.exports = new GitHubAPI();