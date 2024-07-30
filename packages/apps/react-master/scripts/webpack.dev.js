const { merge } = require('webpack-merge')
const path = require('path')

const getBaseCfg = require('./webpack.base')

module.exports = merge(getBaseCfg(true), {
    mode: "development",
    devtool: "eval-cheap-module-source-map",
    devServer: {
        port: 3000,
        compress: false,
        hot: true,
        historyApiFallback: true,
        static: {
            directory: path.join(__dirname, "../public")
        }
    }
})