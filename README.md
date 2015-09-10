# We.js github plugin

> We.js plugin to connect and consume github data with Github API

# Requirements in your we.js project

- we-core

# Has support:

- Authentication (Basic, Token, oAuth2)
- add one authenticated instance of github npm module in ```we.github```

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

// link
npm link
// enter in your project
cd [project folder]
// then link it in your project 
npm link we-plugin-github
```

> add this config in you ```config/locals.js``` file and set the authentication configs

```js
  // ...
  github: {
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
  },
  // ...
```

### How to test

After clone and install npm packages:

```sh
npm test
```

## Copyright and license

We.js Team
Copyright 2013-2014 Leonan Luppi <leonan.luppi@gmail.com> and contributors , under [the MIT license](LICENSE).