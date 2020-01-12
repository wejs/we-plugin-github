/**
 * npm module file
 */

const GitHubModule = require('@octokit/rest');

module.exports = function init(we) {
  const githubAPI = new GitHubModule(we.config.github)

  githubAPI.saveCache = function (opts, cb) {
    we.db.models['github-cache']
    .create({
      name: opts.params,
      response: opts.res
    })
    .then(function (r) {
      cb(null, r);
    })
    .catch(cb);
  }

  githubAPI.getFromCache = function (opts, cb) {
    we.db.models['github-cache']
    .findOne({
      where: {
        name: opts.params
      }
    })
    .then(function (r) {
      if (!r) return cb();

      cb(null, r);
    })
    .catch((err)=> {
      we.log.error(err);
      return err;
    });
  }

  return githubAPI;
}