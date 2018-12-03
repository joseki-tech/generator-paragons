const path = require('path')
const webpack = require('webpack')
const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const {ReactLoadablePlugin} = require("react-loadable/webpack")
const devMode = process.env.NODE_ENV !== 'production'
const _ = require('lodash')

let config = [
    {
        name: 'client',
        target: 'web',
        entry: {
            app: ['./src/client/client.js']
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    include: path.resolve(__dirname, 'src'),
                    use: {
                        loader: "babel-loader",
                        options: {
                            cacheDirectory: true,
                            "presets": [
                                '@babel/preset-react',
                                [
                                    "@babel/preset-env",
                                    {
                                        "targets": {
                                            "browsers": ["last 1 version", "ie >= 11"]
                                        }
                                    }
                                ]
                            ],
                            "plugins": [
                                'lodash',
                                '@babel/plugin-transform-runtime',
                                "@babel/plugin-proposal-class-properties",
                                "@babel/plugin-syntax-dynamic-import",
                                "react-loadable/babel",
                                "react-hot-loader/babel"
                            ]
                        }
                    }
                },
                {
                    test: /\.(sa|sc|c)ss$/,
                    include: path.resolve(__dirname, 'src'),
                    use: [
                      'css-hot-loader',
                        MiniCssExtractPlugin.loader,
                        {
                            loader: 'css-loader',
                            options: {
                                modules: true,
                                importLoaders: 2,
                                sourceMap: false
                            }
                        },
                        {
                          loader: "postcss-loader",
                          options: {
                            plugins: () => [require('autoprefixer')({
                              'browsers': ['> 1%', 'last 2 versions']
                            })],
                          },
                        },
                        'sass-loader',
                    ],
                }
            ]
        },
        plugins: [
            new webpack.HotModuleReplacementPlugin(),
            new MiniCssExtractPlugin({
                filename: devMode ? '[name].css' : '[name].[hash].css',
                chunkFilename: devMode ? '[id].css' : '[id].[hash].css',
            }),
            new BundleAnalyzerPlugin({
                "reportFilename": "client.report.html",
                "statsFilename": "client.stats.json",
                "generateStatsFile": !devMode, // don't enable for dev because it is REALLY costly
                "openAnalyzer": false,
                "analyzerMode": "static"
            }),
            new ReactLoadablePlugin({
                filename: './dist/react-loadable.json',
            })
        ],
        optimization: {
            runtimeChunk: 'single',
            splitChunks: {
                chunks: 'all'
            }
        },
        output: {
            pathinfo: false,
            publicPath: '/',
            filename: devMode ? '[name].js' : '[name].[hash].js',
            chunkFilename: devMode ? '[name].js' : '[name].[chunkhash].js',
            path: path.resolve(__dirname, 'dist')
        }
    }, {
        name: 'server',
        target: 'node',
        entry: './src/server/serverRenderer.js',
        externals: [require('webpack-node-externals')()],
        module: {
            rules: [
                {
                    test: /\.js$/,
                    include: path.resolve(__dirname, 'src'),
                    use: {
                        loader: "babel-loader",
                        options: {
                            cacheDirectory: true,
                            "presets": [
                                '@babel/preset-react',
                                ["@babel/preset-env", {
                                    "targets": {
                                        "node": "current"
                                    }
                                }
                                ]
                            ]
                            ,
                            "plugins": [
                                'lodash',
                                '@babel/plugin-transform-runtime',
                                "@babel/plugin-proposal-class-properties",
                                "dynamic-import-node",
                                "react-loadable/babel"
                            ]
                        }
                    }
                },
                {
                    test: /\.(sa|sc|c)ss$/,
                    include: path.resolve(__dirname, 'src'),
                    use: [
                        {
                            loader: "css-loader/locals", // translates CSS into CommonJS
                            options: {
                                modules: true,
                                importLoaders: 2,
                                sourceMap: false
                            }
                        },
                        {
                          loader: "postcss-loader",
                          options: {
                            plugins: () => [require('autoprefixer')({
                              'browsers': ['> 1%', 'last 2 versions']
                            })],
                          },
                        },
                        {
                            loader: "sass-loader" // compiles Sass to CSS
                        }
                    ]
                }
            ]
        },
        plugins: [
            new webpack.IgnorePlugin(/react-loadable.json/)
        ],
        output: {
            pathinfo: false,
            // publicPath: '/',
            filename: 'server.js',
            path: path.resolve(__dirname, 'dist'),
            libraryTarget: 'commonjs2'
        }
    }
]


const env = process.env.NODE_ENV
// console.log(`=========> env:[${env}]`)

let configClient = config[0]
let configServer = config[1]

// mode
configClient.mode = env
configServer.mode = env

// special development configurations
if (env === 'development') {

    // devtool
    configClient.devtool = 'cheap-module-eval-source-map'
    // configServer.devtool = 'cheap-module-eval-source-map'

    // 2. Add 'webpack-hot-middleware/client' into the entry array. This connects to the server to receive notifications when the bundle rebuilds and then updates your client bundle accordingly.
    configClient.entry.app.push('webpack-hot-middleware/client?reload=true')
}

// special production configurations
if (env === 'production') {

    // devtool
    configClient.devtool = 'source-map'
    // configServer.devtool = 'source-map'

    // uglification
    const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
    _.set(configClient, 'optimization.minimizer', [new UglifyJsPlugin(
        {
            extractComments: true,
            sourceMap: true,
            uglifyOptions: {
                output: {
                    comments: false
                }
            }
        }
    )])
}

// un-comment me to see the final config
// console.log(JSON.stringify(config, null, 2))

module.exports = config
