# we-plugin-github

> We.js plugin to consuming Github API

# Requirements in your we.js project

- we-core

# Has support:

- Authentication (Basic, Token, oAuth2)
- Get repositories from organizations

### How to Setup (developer)
> after install npm and node.js
```js
// clone this project
git clone https://github.com/wejs/we-plugin-github.git
// enter in cloned folder
cd we-plugin-github
// install all dependencies
npm install
// test
npm test
```

> Add a file ``` locals.js ``` and add the config below to set different types of authentication:

```sh
  github: {
      version: "3.0.0", // API version
      debug: true, // console.log,
      token: { //via token (Personal access token)
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
  },
  expireDate: (60 * 60 * 60), // an hour
  orgName: 'wejs' //organization name
```

### How to test

After clone and install npm packages:

```sh
npm test
```

## Copyright and license

We.js Team
Copyright 2013-2014 Alberto Souza <contato@albertosouza.net> and contributors , under [the MIT license](LICENSE).