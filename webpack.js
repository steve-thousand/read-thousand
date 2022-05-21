const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
    mode: "production",
    entry: {
        background: path.resolve(__dirname, "src/background/index.js"),
        contentScript: path.resolve(__dirname, "src/contentScript/index.js")
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: "[name].js"
    },
    plugins: [
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: "manifest.json",
                    context: "src/"
                }
            ]
        })
    ],
    resolve: {
        extensions: [".js", ".mjs", ".json"]
    }
};
