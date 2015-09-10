/**
 * npm module file
 */

var GitHubModule = require('github');

module.exports = function init(we) {
  var githubAPI = new GitHubModule(we.config.github)

  githubAPI.saveCache = function saveCache(opts, cb) {
    we.db.models['github-cache'].create({
      name: opts.params,
      response: opts.res
    }).then(function (r){
      cb(null, r);
    }).catch(cb);
  }

  githubAPI.getFromCache = function getFromCache(opts, cb) {
    we.db.models['github-cache'].findOne({
      name: JSON.stringify(opts.params)
    }).then(function (r){
      if (!r) return cb();

      cb(null, r);
    }).catch(cb);
  }

  return githubAPI;
}