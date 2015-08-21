var github = require('../../lib/');

module.exports = {
  getProjects: function(req, res) {
    github.authenticate({type: "token", token: "1d49b24d32e9d25972d67d948c4ca68c5fea9b18"});

    github.repos.getFromOrg({org: 'wejs'}, function(err, res) {
      console.log(res);
    });

    return res.ok();
  }
}