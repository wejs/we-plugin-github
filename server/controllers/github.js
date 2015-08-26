var github = require('../../lib/');

module.exports = {
  getProjects: function(req, res) {
    github.authenticate(req.we.config.github.token);
    github.repos.getFromOrg({org: 'wejs'}, function(err, resGitApi) {
      var result = resGitApi.filter(function(el) {
        return el.name.indexOf(req.params.name) >= 0;
      });

      res.locals.record = result;
      res.ok();
    });
  }
};
