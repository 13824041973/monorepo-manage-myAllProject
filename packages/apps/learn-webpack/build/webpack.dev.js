// 开发环境主要实现热更新，不压缩代码，完整的sourceMap

const { merge } = require('webpack-merge')
const common = require('./webpack.common.js')
const path = require('path')

// 编译速度分析
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin')
const smp = new SpeedMeasurePlugin()

module.exports =
    // smp.wrap(
    merge(common, {
        mode: 'development',
        devtool: 'cheap-module-source-map',  //使用source map的这个模式
        optimization: {
            usedExports: true,  // 表示开启使用tree shaking
        },
        devServer: {
            hot: true,
            open: true,
            static: {
                // 告诉服务器从哪里提供内容。只有在你希望提供静态文件时才需要这样做。
                directory: path.resolve(__dirname, './public')
            }
        }
    })
    // )