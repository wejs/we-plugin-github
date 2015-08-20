var GitHubApi = require("github"),
    config = require('./config');
 
var github = new GitHubApi({
    version: config.version,
    debug: config.debug
});

github.authenticate(config.auth.token);

module.exports = github;