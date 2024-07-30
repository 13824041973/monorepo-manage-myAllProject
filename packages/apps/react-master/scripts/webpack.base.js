const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const path = require('path')

module.exports = function (isDev) {
    return {
        entry: path.resolve(__dirname, "../src/index.tsx"),
        output: {
            path: path.resolve(__dirname, "../dist"),
            // 输出的名字
            filename: "static/js/[name].[hash:8].js",
            clean: true,
            // 打包后的公共路径
            publicPath: '/'
        },
        stats: 'minimal',
        resolve: {
            extensions: ['.js', '.jsx', '.ts', '.tsx']
        },

        module: {
            rules: [
                {
                    test: /\.(tsx|ts|jsx|js)$/,
                    use: {
                        loader: 'babel-loader',
                    }
                },
                {
                    oneOf: [
                        {
                            test: /\.module\.(less|css)$/,
                            include: [path.resolve(__dirname, "../src")],
                            use: [
                                isDev ? "style-loader" : MiniCssExtractPlugin.loader,
                                {
                                    loader: "css-loader",
                                    options: {
                                        modules: {
                                            localIdentName: "[path]_[name]_[local]--[hash:base64:5]"
                                        }
                                    }
                                },
                                "less-loader",
                                "postcss-loader"
                            ]
                        },
                        {
                            test: /\.less$/,
                            use: [
                                isDev ? "style-loader" : MiniCssExtractPlugin.loader,
                                "css-loader",
                                "less-loader",
                                "postcss-loader"
                            ]
                        },
                        {
                            test: /\.css$/,
                            use: [
                                isDev ? "style-loader" : MiniCssExtractPlugin.loader,
                                "css-loader",
                                "postcss-loader"
                            ]
                        }
                    ]
                },

                {
                    // webpack5之前，要用 url | file-loader 
                    test: /\.(png|jpg|jpeg)$/,
                    generator: {
                        filename: "static/images/[name].[contenthash:8].[ext]"
                    }
                },
                {
                    // webpack5之前，要用 url | file-loader 
                    test: /\.(mp4|mp3|rvmb)$/,
                    generator: {
                        filename: "static/media/[name].[contenthash:8].[ext]"
                    }
                },
                {
                    // webpack5之前，要用 url | file-loader 
                    test: /\.(eot|ttf|otf)$/,
                    generator: {
                        filename: "static/fonts/[name].[contenthash:8].[ext]"
                    }
                }
            ]
        },

        plugins: [
            new HtmlWebpackPlugin({
                template: path.resolve(__dirname, "../public/index.html"),
            }),
            new MiniCssExtractPlugin({
                filename: isDev ? "static/css/[name].css" : "static/css/[name].[contenthash:8].css"
            })
        ]
    }
}