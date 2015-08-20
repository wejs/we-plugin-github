var github = require('../../config/authentication.js');

github.user.get({}, function(err, res) {
    if (err)
        return '403, Unauthorized'
    github.repos.getFromOrg({org: 'wejs'}, function(err, res) {
        var plugins = res.filter(filterPlugins)

        plugins.forEach(function(_plugin) {
            console.log('PLUGINS >>>>', _plugin.name)
        });
    });
});

function filterPlugins(searchTerm) {
    return searchTerm.name.indexOf('plugin') >= 0; 
}