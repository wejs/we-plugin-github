var github = require('../../lib/'),
    _ = require('lodash');

module.exports = {
  getProjects: function(req, res) {
    github.authenticate(req.we.config.auth.token);
    github.repos.getFromOrg({org: 'wejs'}, function(err, res) {
      var result = _.filter(res, function(n){
        return _.indexOf(res[0].name, req.params);
      });

      res.locals.record = result;
    });
    return res.ok();
  }
}
