function formatNotification(data) {
    if (data.ref) {
        return commit(data);
    } else if (data.hook_id) {
        if (data.action === 'deleted') {
            return webhookDeleted(data);
        } else if (data.zen) {
            return webhookConnected(data);
        }
    } else if (data.issue) {
        if (data.action === 'opened') {
            return issueOpened(data);
        } else if (data.action === 'created') {
            return issueCreared(data);
        } else if (data.action === 'locked') {
            return issueLocked(data);
        } else if (data.action === 'unlocked') {
            return issueUnlocked(data);
        } else if (data.action === 'deleted') {
            return issueDeleted(data);
        }
    }
    return 'Received an unknown notification format';
}

const webhookConnected = (data) =>
    `"${data.zen}"\n` +
    `${data.sender.login}'s webhook in repository ${data.repository.name} connected successfully!\n` +
    `More details: ${data.repository.html_url}`;

const webhookDeleted = (data) =>
    `Webhook is deleted in repository ${data.repository.name}\n` +
    `Author: ${data.sender.login}\n` +
    `More details: ${data.repository.html_url}`;

const commit = (data) =>
    `New Commit in repository ${data.repository.name}\n` +
    `Message: ${data.head_commit.message}\n` +
    `Author: ${data.head_commit.author.username}\n` +
    `More details: ${data.repository.html_url}`;

const issueOpened = (data) =>
    `New Issue in repository ${data.repository.name}\n` +
    `Issue: ${data.issue.title}\n` +
    `Description: ${data.issue.body}\n` +
    `Author: ${data.issue.user.login}\n` +
    `More details: ${data.issue.html_url}`;

const issueCreared = (data) =>
    `New comment to Issue in repository ${data.repository.name}\n` +
    `Issue: ${data.issue.title}\n` +
    `Comment: ${data.comment.body}\n` +
    `Author: ${data.comment.user.login}\n` +
    `More details: ${data.comment.html_url}`;

const issueLocked = (data) =>
    `The issue is locked in repository ${data.repository.name}\n` +
    `Issue: ${data.issue.title}\n` +
    `Description: ${data.issue.body}\n` +
    `Author: ${data.issue.user.login}\n` +
    `More details: ${data.issue.html_url}`;

const issueUnlocked = (data) =>
    `The issue is unlocked in repository ${data.repository.name}\n` +
    `Issue: ${data.issue.title}\n` +
    `Description: ${data.issue.body}\n` +
    `Author: ${data.issue.user.login}\n` +
    `More details: ${data.issue.html_url}`;

const issueDeleted = (data) =>
    `The issue is deleted in repository ${data.repository.name}\n` +
    `Issue: ${data.issue.title}\n` +
    `Description: ${data.issue.body}\n` +
    `Author: ${data.issue.user.login}\n` +
    `More details: ${data.issue.html_url}`;

module.exports = formatNotification;
