var github = require('../../lib/'),
    _      = require('lodash');

module.exports = {
  getProjects: function(req, res) {
    //when don't have any data on Db
    req.we.db.models.github.findAndCountAll({
      where: {
        name: {$like: '%' + req.params.name + '%'}
      }
    })
    .then(function(data) {
      if (data.count === 0) {
        github.authenticate(req.we.config.github.token);
        github.repos.getFromOrg({org: 'wejs'}, function(err, resGitApi) {
          var result = resGitApi.filter(function(el) {
            return el.name.indexOf(req.params.name) >= 0;
          });

          _.forEach(result, function(item, key){
            req.we.db.models.github.create({
              name: item.name,
              description: item.description,
              url: item.html_url,
              expireDate: new Date(resGitApi.meta["x-ratelimit-reset"] * 1000)
            })
            .then(function() {
              console.log('New item has been created on githubs table.');
            })
          });

          res.locals.record = result;
          res.ok();
        });
      } else {
        req.we.db.models.github.findAll({
          where: {
            name: {$like: '%' + req.params.name + '%'}
          }
        })
        .then(function(data) {
          var filterData = data.filter(function(el) {
            return el.expireDate > new Date();
          });

          if (filterData.length > 0) {
            github.authenticate(req.we.config.github.token);
            github.repos.getFromOrg({org: 'wejs'}, function(err, resGitApi) {
              var filterGitApi = resGitApi.filter(function(el) {
                return el.name.indexOf(req.params.name) >= 0;
              });

              var result = filterData.filter(function(el) {
                filterGitApi.forEach(function(item) {
                  if (item.name !== el.name) return false;
                });
                return true;
              })
              .map(function(item) {
                return {
                  id: item.id,
                  name: item.name,
                  description: item.description,
                  url: item.url,
                  expireDate: new Date(resGitApi.meta["x-ratelimit-reset"] * 1000)
                };
              });

              result.forEach(function(item) {
                req.we.db.models.github.update(item, {
                  where: {id: item.id}
                })
                .then(function() {
                  console.log('New item has been updated on githubs table.');
                });
              });

              res.locals.record = result;
              res.ok();
            });
          } else {
            res.locals.record = data;
            res.ok();
          }
        });
      }
    });
  }
};
