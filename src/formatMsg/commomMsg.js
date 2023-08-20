const START_MSG = (from) =>
    `Hello, ${from.first_name}\n` +
    `I'm a GitHub integration bot.\n` +
    `Shell we start?`;

const INPUT_ACCOUNT = 
    'Enter your name on GitHub.';

const USER_INFO = (data) =>
    `Name: ${data.name}\n` +
    `Username: @${data.login}\n` +
    `Email: ${data.email}\n` +
    `URL: ${data.html_url}\n` +
    `ID: ${data.id}\n` +
    `Company: ${data.company}\n` +
    `Created at: ${data.created_at}\n` +
    `Followers: ${data.followers}\n` +
    `Following: ${data.following}\n` +
    `Public Repos: ${data.public_repos}`;

const REPO_INFO = (data) =>
    `Name: ${data.name}\n` +
    `Description: @${data.description}\n` +
    `URL: ${data.html_url}\n` +
    `Stargazers count: ${data.stargazers_count}\n` +
    `Subscribers count: ${data.subscribers_count}\n` +
    `Open issues count: ${data.open_issues_count}\n` +
    `Created at: ${data.created_at}\n` +
    `Owner: ${data.owner.login}`;

const COMMIT_INFO = (data) =>
    `SHA: ${data.sha}\n` +
    `Message: ${data.commit.message}\n` +
    `Author: ${data.commit.author.name} <${data.commit.author.email}>\n` +
    `Date: ${data.commit.author.date}\n` +
    `URL: ${data.html_url}\n`;

const PULL_INFO = (data) =>
    `Title: ${data.title}\n` +
    `Description: ${data.body}\n` +
    `URL: ${data.html_url}\n` +
    `State: ${data.state}\n` +
    `Created at: ${data.created_at}\n` +
    `User: ${data.user.login}\n` +
    `Merged: ${data.merged ? 'Yes' : 'No'}\n` +
    `Merged at: ${data.merged_at || 'Not merged yet'}\n`;

const REPOS_INFO = (data, acc) =>
    data.map((repo, ind) => `${ind + acc}: ` + repo.name).join('\n');

const INCORRECT_DATA = (type) =>
    `Oops, something seems to be wrong.\n` +
    `Make sure you entered the ${type} correctly.`;

const NO_PULLS = (repo) => 
    `Repository ${repo} has no pull requests.`

const SET_NOTIFICSTION = (user, key) =>
    `Pass the following data to the user you want to receive notifications from\\.\n` +
    `*Webhook*: ${(process.env.WEBHOOK_URL + user).replace(/\./g, '\\.')}\n` +
    `*Secret Key*: ||${key.replace(/-/g, '\\-')}||`

const SOME_ERROR = 
    'An error occurred. Please try again later.';

const ENTER_USER =
    'Enter the GitHub user you want to follow.';

const ENTER_REPO =
    'Enter the GitHub repository you want to follow.';

const SET_ACCOUNT =
    'Made! Check if this is your account.';

const SKIPED =
    'Fine! You can return to this at any time.';

const HELP = 
    'By the way, you have several commands available, take a look.';

module.exports = {
    START_MSG,
    INPUT_ACCOUNT,
    USER_INFO,
    REPO_INFO,
    REPOS_INFO,
    COMMIT_INFO,
    PULL_INFO,
    INCORRECT_DATA,
    NO_PULLS,
    SET_NOTIFICSTION,
    SOME_ERROR,
    ENTER_USER,
    ENTER_REPO,
    SET_ACCOUNT,
    SKIPED,
    HELP
};