var github = require('../../lib/');

module.exports = {
  getProjects: function(req, res) {
    var we = req.we;

    we.utils.async.waterfall([
      function(cb) {
        we.db.models.github.findAll(res.locals.query)
        .then(function(repositories){
          cb(null, repositories);
        });
      },
      function(cache, cb) {
        var filtered = cache.filter(function(el) {
          return el.expireDate > new Date();
        });

        cb(null, (cache || []));
      }
    ], function(err, cache) {
      we.utils.async.waterfall([
        function(cb) {
          cb(github.authenticate(we.config.github.token));
        },
        function(cb) {
          github.repos.getFromOrg({org: we.config.github.orgName}, function(err, res) {
            var repositories = res.filter(function(item) {
              return item.name.indexOf(req.params.name) >= 0;
            });

            cb(null, repositories);
          });
        },
        function(repositories, cb) {
          if (cache.length === 0) {
            repositories.forEach(function(repo) {
              we.db.models.github.create({
                name: repo.name,
                description: repo.description,
                url: repo.html_url,
                expireDate: new Date() + we.config.github.expireDate
              })
              .then(function() {
                console.log('New item has been created on githubs table.');
              });

              cb(null, repositories);
            });
          } else {
            var matchRepoToDb = cache.filter(function(item) {
              repositories.forEach(function(repo) {
                return item.name !== repo.name ? false : true
              });
              return true;
            })
            .map(function(item) {
              return {
                id: item.id,
                name: item.name,
                description: item.description,
                url: item.url,
                expireDate: new Date() + we.config.github.expireDate
              };
            });

            matchRepoToDb.forEach(function(repo) {
              we.db.models.github.update(repo, {
                where: {id: repo.id}
              })
              .then(function() {
                console.log('New item has been updated on githubs table.');
              });

              cb(null, matchRepoToDb);
            });
          }
        }
      ], function(err, result) {
        res.locals.record = result;
        res.ok();
      });
    });
  }
};