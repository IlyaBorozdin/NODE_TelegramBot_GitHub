function formatNotification(data) {
    if (data.zen) {
        return formatWebhookConnected(data);
    } else if (data.ref) {
        return formatCommit(data);
    } else if (data.issue && data.action === 'opened') {
        return formatIssue(data);
    } else if (data.issue && data.action === 'created') {
        return formatIssueComment(data);
    } else if (data.issue && data.action === 'locked') {
        return formatLockedIssue(data);
    } else if (data.issue && data.action === 'unlocked') {
        return formatUnlockedIssue(data);
    } else if (data.issue && data.action === 'deleted') {
        return formatDeletedIssue(data);
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
        case 'pull_request':
            return formatPullRequestEvent(data);
        default:
            return `Received an unknown event type: ${data.event}`;
    }
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

function formatIssue(data) {
    return `New Issue in repository ${data.repository.name}\n` +
        `Issue: ${data.issue.title}\n` +
        `Description: ${data.issue.body}\n` +
        `Author: ${data.issue.user.login}\n` +
        `More details: ${data.issue.html_url}`;
}

function formatIssueComment(data) {
    return `New comment to Issue in repository ${data.repository.name}\n` +
        `Issue: ${data.issue.title}\n` +
        `Comment: ${data.comment.body}\n` +
        `Author: ${data.comment.user.login}\n` +
        `More details: ${data.comment.html_url}`;
}

function formatLockedIssue(data) {
    return `The issue is locked in repository ${data.repository.name}\n` +
        `Issue: ${data.issue.title}\n` +
        `Description: ${data.issue.body}\n` +
        `Author: ${data.issue.user.login}\n` +
        `More details: ${data.issue.html_url}`;
}

function formatUnlockedIssue(data) {
    return `The issue is unlocked in repository ${data.repository.name}\n` +
        `Issue: ${data.issue.title}\n` +
        `Description: ${data.issue.body}\n` +
        `Author: ${data.issue.user.login}\n` +
        `More details: ${data.issue.html_url}`;
}

function formatDeletedIssue(data) {
    return `The issue is deleted in repository ${data.repository.name}\n` +
        `Issue: ${data.issue.title}\n` +
        `Description: ${data.issue.body}\n` +
        `Author: ${data.issue.user.login}\n` +
        `More details: ${data.issue.html_url}`;
}

module.exports = formatNotification;
