
module.exports = {
  getProjects: function(req, res) {
    github.repos.getFromOrg({org: 'wejs'}, function(res, err) {
    })
    return res.ok();
  }
}