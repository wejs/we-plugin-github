/**
 * Plugin.js file, set configs, routes, hooks and events here
 *
 * see http://wejs.org/docs/we/extend.plugin
 */
module.exports = function loadPlugin(projectPath, Plugin) {
  var plugin = new Plugin(__dirname);

  plugin.setConfigs({
   github: {
      version: '3.0.0', // API version
      debug: true, // enable logs
      authentication: {
        //
        //  // Example authentication configs
        //
        //  //via token (Personal access token)
        //  type: 'token',
        //  token: '<token>'
        //
        //  // via username and password (do not recommend)
        //  type: 'basic',
        //  username: '<USERNAME>',
        //  password: '<PASSWORD>'
        //
        //  //via oauth2
        //  type: 'oauth',
        //  token: '<TOKEN>'
      },
      expireDate: (60 * 60 * 60) // an hour
    }
  });

  // set we.github after load all plugins
  plugin.events.on('we:after:load:plugins', function (we) {
    // init
    we.github = require('./lib')(we);
    // authenticate
    we.github.authenticate(we.config.github.authentication);
    // cache object
    we.github.cacheTimes = {};
  });

  return plugin;
};