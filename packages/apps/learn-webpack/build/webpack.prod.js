// 生产环境主要实现的是压缩代码、提取css文件、合理的sourceMap、分割代码
const { merge } = require('webpack-merge')
const common = require("./webpack.common.js")

// 打包体积分析
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

// js 代码压缩，webpack5 自带
const TerserWebpackPlugin = require('terser-webpack-plugin')

// css 压缩
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')

// 编译速度分析
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin')
const smp = new SpeedMeasurePlugin()

module.exports =
    // smp.wrap(
    merge(common, {
        mode: 'production',
        plugins: [
            new BundleAnalyzerPlugin()
        ],
        optimization: {
            minimizer: [
                new TerserWebpackPlugin({
                    parallel: true,
                }),
                new CssMinimizerPlugin()
            ]
        }
    })
    // )
