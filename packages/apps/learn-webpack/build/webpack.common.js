const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { VueLoaderPlugin } = require('vue-loader')

const chalk = require('chalk')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')

module.exports = {
    // mode: 'development',
    // entry: path.resolve(__dirname, "../src/main.js"),
    entry: {
        main: path.resolve(__dirname, "../src/main.js"),
        // header: path.resolve(__dirname, "../src/header.js")  // 引入一个额外的header.js入口
    },
    output: {
        filename: '[name].[hash:8].js',
        path: path.resolve(__dirname, "../dist"),
        clean: true
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                use: ['vue-loader'], // 解析vue模板
                include: [path.resolve(__dirname, "../src")]
            },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader'] // 从右往左解析
            },
            {
                test: /\.less$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader']
            },
            {
                test: /(\.jsx|\.js)$/,
                // 由于 thread-loader 引入后，需要 0.6s 左右的时间开启新的 node 进程，本项目代码量小，可见引入 thread-loader 后，构建时间反而增加了。
                // 因此，我们应该仅在非常耗时的 loader 前引入 thread-loader。
                use: ['thread-loader', 'babel-loader'],
                exclude: /node_modules/
            },
            {
                test: /\.(jpe?g|png|gif|webp)$/i, //图片文件
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10240,
                            fallback: {
                                loader: 'file-loader',
                                options: {
                                    name: 'img/[name].[hash:8].[ext]'
                                }
                            }
                        }
                    }
                ]
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/, //媒体文件
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10240,
                            fallback: {
                                loader: 'file-loader',
                                options: {
                                    name: 'media/[name].[hash:8].[ext]'
                                }
                            }
                        }
                    }
                ]
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i, // 字体
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10240,
                            fallback: {
                                loader: 'file-loader',
                                options: {
                                    name: 'fonts/[name].[hash:8].[ext]'
                                }
                            }
                        }
                    }
                ]
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "../public/index.html"),
            filename: 'index.html',
            chunks: ['main'],
            title: 'main',
            inject: 'body' // script插入到HTML中的位置
        }),
        // new HtmlWebpackPlugin({
        //     filename: 'header.html',
        //     chunks: ['header'],
        //     title: 'header',
        //     minify: true // development 默认不压缩 production 默认压缩
        // }),

        // 将 css 单独提取出来加载
        new MiniCssExtractPlugin({
            filename: '[name].[hash].css',
            chunkFilename: '[id].css'
        }),
        new VueLoaderPlugin(),
        // 显示构建的进度条
        new ProgressBarPlugin({
            format: ` :msg [:bar] ${chalk.green.bold(':percent')} (:elapsed s)`
        })
    ],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "../src")
        },
        // 尝试按顺序解析这些后缀名。如果有多个文件有相同的名字，
        // 但后缀名不同，webpack 会解析列在数组首位的后缀的文件 并跳过其余的后缀。
        // 但是要确保同一个目录下面没有重名的 css 或者 js 文件
        extensions: ['.js', '.json', '.vue'],
    },
    externals: {
        vue: 'Vue',
        'vue-router': 'VueRouter'
    },
    cache: {
        type: 'filesystem'
    },
    optimization: {
        splitChunks: {
            chunks: 'all',
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    chunks: 'all',
                    priority: 10, //优先级
                    enforce: true
                }
            }
        }
    }
}