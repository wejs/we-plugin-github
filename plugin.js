/**
 * Plugin.js file, set configs, routes, hooks and events here
 *
 * see http://wejs.org/docs/we/extend.plugin
 */
module.exports = function loadPlugin(projectPath, Plugin) {
  const plugin = new Plugin(__dirname);

  const we = plugin.we;

  plugin.setConfigs({
    github: {
      version: '3.0.0', // API version
      debug: true, // enable logs
      // github API token
      auth: null,
      expireDate: (60 * 60 * 60),
      log: {
        debug: function() {
          we.log.debug(...arguments);
        },
        info: function() {
          we.log.info(...arguments);
        },
        warn: function() {
          we.log.warn(...arguments);
        },
        error: function() {
          we.log.error(...arguments);
        }
      }
    }
  });

  // set we.github after load all plugins
  plugin.events.on('we:after:load:plugins', function (we) {
    // init
    we.github = require('./lib')(we);
    // cache object
    we.github.cacheTimes = {};
  });

  return plugin;
};