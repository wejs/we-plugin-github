# we-plugin-github

> Consuming GitHub API

# Requirements in your we.js project

- we-core

# Has support:
- Get repositories from organizations


### Conguration
In your locals.js add the config below to set different types of authentication:

```sh
  github: {
      version: "3.0.0", // API version
      debug: true, // console.log,
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
  },
  expireDate: (60 * 60 * 60), // an hour
  orgName: 'wejs'  
```

### How to test

After clone and install npm packages:

```sh
npm test
```

## Copyright and license

We.js Team

Copyright 2013-2014 Leonan Luppi <leonan.luppi@gmail.com> and contributors , under [the MIT license](LICENSE).