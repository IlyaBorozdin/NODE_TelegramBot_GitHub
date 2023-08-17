const START_MSG = (from) =>
    `Hello, ${from.first_name}\n` +
    `I'm a GitHub integration bot.\n` +
    `Shell we start? Enter your name on GitHub.`;

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

const REPOS_INFO = (data, acc) =>
    data.map((repo, ind) => `${ind + acc}: ` + repo.name).join('\n');

const INCORRECT_DATA = (data) =>
    `Oops, something seems to be wrong.\n` +
    `Make sure you entered the ${data} correctly.`;

const ENTER_USER =
    'Enter the GitHub user you want to follow.';

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
    REPOS_INFO,
    INCORRECT_DATA,
    ENTER_USER,
    SET_ACCOUNT,
    SKIPED,
    HELP
};