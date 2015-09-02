/**
 * Plugin.js file, set configs, routes, hooks and events here
 *
 * see http://wejs.org/docs/we/extend.plugin
 */
module.exports = function loadPlugin(projectPath, Plugin) {
  var plugin = new Plugin(__dirname);

  plugin.setConfigs({});

  plugin.setRoutes({
    'get /github/:name': {
      controller : 'github',
      action     : 'getProjects',
      template   : 'github/index'
    },
  });

  return plugin;
};