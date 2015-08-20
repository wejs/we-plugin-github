var config = {
    version: "3.0.0", // API version
    debug: true, // console.log,
    auth: {
        token: {
            type: "token",
            token: "bf76204ba92f681347ac7780d7a5003a714753db" // this token has: read:public_repo, read:org, read:public_key, read:repo_hook
        },
        basic: {
            type: "basic",
            username: "<USERNAME>",
            password: "<PASSWORD>"
        },
        oauth: {
            type: "oauth",
            token: "<TOKEN>"
        }
    }
};

module.exports = config;