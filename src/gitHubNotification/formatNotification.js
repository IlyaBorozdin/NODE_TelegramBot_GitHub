function formatNotification(data) {
    if (data.zen) {
        return formatWebhookConnected(data);
    } else if (data.action) {
        return formatGitHubAction(data);
    } else if (data.event) {
        return formatGitHubEvent(data);
    } else if (data.ref) {
        return formatCommit(data);
    } else {
        return 'Received an unknown notification format';
    }
}

function formatWebhookConnected(data) {
    return `"${data.zen}"\n` +
        `${data.sender.login}'s webhook in repository ${data.repository.name} connected successfully!\n` +
        `More details: ${data.repository.html_url}`;
}

function formatGitHubEvent(data) {
    switch (data.event) {
        case 'issues':
            return formatIssuesEvent(data);
        case 'pull_request':
            return formatPullRequestEvent(data);
        default:
            return `Received an unknown event type: ${data.event}`;
    }
}

function formatIssuesEvent(data) {
    const issue = data.payload.issue;
    return `New Issue in repository ${data.repository.name}\n` +
        `Issue: ${issue.title}\n` +
        `Description: ${issue.body}\n` +
        `Author: ${issue.user.login}\n` +
        `More details: ${issue.html_url}`;
}

function formatPullRequestEvent(data) {
    const pullRequest = data.payload.pull_request;
    return `New Pull Request in repository ${data.repository.name}\n` +
        `Pull Request: ${pullRequest.title}\n` +
        `Description: ${pullRequest.body}\n` +
        `Author: ${pullRequest.user.login}\n` +
        `More details: ${pullRequest.html_url}`;
}

function formatGitHubAction(data) {
    switch (data.action) {
        case 'deleted':
            return formatDeletedAction(data);
        default:
            return `Received an unknown action type: ${data.action}`;
    }
}

function formatDeletedAction(data) {
    return `Webhook is deleted in repository ${data.repository.name}\n` +
        `Author: ${data.sender.login}\n` +
        `More details: ${data.repository.html_url}`;
}

function formatCommit(data) {
    const commit = data.head_commit;
    return `New Commit in repository ${data.repository.name}\n` +
        `Message: ${commit.message}\n` +
        `Author: ${commit.author.username}\n` +
        `More details: ${data.repository.html_url}`;
}

module.exports = formatNotification;
