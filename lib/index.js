/**
 * npm module file
 */

var GitHubApi = require("github");

module.exports = new GitHubApi({
                  version: "3.0.0",
                  debug: true,
                 });