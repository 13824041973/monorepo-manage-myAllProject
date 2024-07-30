const { merge } = require('webpack-merge')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')

const getBaseCfg = require('./webpack.base')

module.exports = merge(getBaseCfg(false), {
    mode: "production",

    optimization: {
        minimize: true,
        minimizer: [
            new CssMinimizerPlugin(),
            new TerserPlugin({
                parallel: true,
            })
        ],

        splitChunks: {
            cacheGroups: {
                vendors: {
                    name: "vendors",
                    test: /node_modules/
                },
                commons: {
                    name: "commons",
                }
            }
        }
    },

    plugins: []
})