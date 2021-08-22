const path = require("path");
const Dotenv = require("dotenv-webpack");

module.exports = {
    configureWebpack: {
        plugins: [
            new Dotenv({
                path: ".env",
                systemvars: true
            })
        ]
    }
};
