/**
 * Plugin.js file, set configs, routes, hooks and events here
 *
 * see http://wejs.org/docs/we/extend.plugin
 */
module.exports = function loadPlugin(projectPath, Plugin) {
	var plugin = new Plugin(__dirname);

	plugin.setConfigs({ 
		config: {
		    version: "3.0.0", // API version
		    debug: true, // console.log,
		    auth: { //type of authentication
		        token: { //via token (Personal acess token)
		            type: "token",
		            token: "<TOKEN>" 
		        },
		        basic: { //via username and password (do not recommend)
		            type: "basic",
		            username: "<USERNAME>",
		            password: "<PASSWORD>"
		        },
		        oauth: { //via oauth2
		            type: "oauth",
		            token: "<TOKEN>"
		        }
		    }
		}
	});

	plugin.setRoutes({
		'get /github/:name': {
 			controller   : 'github',
      action       : 'getProjects'
    },
	});
	
	return plugin;
};