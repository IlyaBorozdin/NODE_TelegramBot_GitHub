const axios = require('axios');
const path = require('path');

class GitHubAPI {
    constructor() {
        this.baseUrl = process.env.GITHUB_URL
        this.headers = {
            Authorization: `Bearer ${process.env.GITHUB_TOKEN}`
        };
    }

    getSmth(...paths) {
        return axios.get(
            path.join(this.baseUrl, ...paths),
            { headers: this.headers }
        )
            .then((res) => res.data)
            .catch((err) => Promise.reject(err));
    }

    getUser(user) {
        return this.getSmth('users', user);
    }

    getRepo(user, repo) {
        return this.getSmth('repos', user, repo);
    }

    getCommits(user, repo) {
        return this.getSmth('repos', user, repo, 'commits');
    }

    getPulls(user, repo) {
        return this.getSmth('repos', user, repo, 'pulls');
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
    
    async getRepoContent(user, repo) {
        
        const dirContent = async (content) => {
            await Promise.all(content.map(async (item) => {
                if (item.type === 'dir') {
                    const res = await axios.get(
                        item.url,
                        { headers: this.headers }
                    );
        
                    item.content = res.data;
                    await dirContent(item.content);
                }
            }));
        };

        const dirFormat = (content, level) => {
            let struct = '';
            const tab = '      ';

            const write = (item, level, isLast) => {
                struct += `${tab.repeat(level)}${isLast ? '└─' : '├─'} ${item.name}\n`;
            };

            const dirs = content.filter((item) => item.type === 'dir');
            const files = content.filter((item) => item.type === 'file');
            
            dirs.forEach((dir, index) => {
                const isLast = index === dirs.length - 1 && files.length === 0;
                write(dir, level, isLast);
                struct += dirFormat(dir.content, level + 1);
            });
        
            files.forEach((file, index) => {
                const isLast = index === files.length - 1;
                write(file, level, isLast);
            });

            return struct;
        };

        let content = [{
            name: `${user}/${repo}`,
            type: 'dir',
            url: path.join(this.baseUrl, 'repos', user, repo, 'contents')
        }];

        await dirContent(content);

        return dirFormat(content, 0);
    }
}

module.exports = new GitHubAPI();