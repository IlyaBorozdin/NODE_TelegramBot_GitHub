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
            .then((res) => res.data)
            .catch((err) => Promise.reject(err));
    }

    async *getRepos(user) {
        let page = 1;
    
        try {
            while (true) {
                const res = await axios.get(path.join(this.baseUrl, 'users', user, 'repos'), {
                    headers: this.headers,
                    params: {
                        per_page: 50,
                        page: page
                    }
                });
    
                if (res.data.length === 0) {
                    break;
                }

                yield res.data;
    
                page++;
            }
        } catch (err) {
            throw err;
        }
    }    
}

module.exports = new GitHubAPI();