const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer');
const {CleanWebpackPlugin} = require('clean-webpack-plugin')

const isDev = process.env.NODE_ENV === 'development'
const isProd = !isDev

const plugins = () => {
    base = [
        new HTMLWebpackPlugin({
            template: './index.html',
            minify: {
                collapseWhitespace: isProd
            }
        }),
        // new FaviconsWebpackPlugin({
        //     logo: './logo.png',
        //     prefix: 'assets/favicon/',
        //     emitStats: false,
        //     cache: true,
        //     inject: true
        // }),
        new MiniCssExtractPlugin({
            filename: '[name].[hash].css'
        }),
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin ({
            patterns: [
                {
                    from: path.resolve(__dirname, 'src/favicon.ico'),
                    to: path.resolve(__dirname, 'dist')
                },
            ]
        })
    ]

    // if (isProd){
    //     // base.push(new BundleAnalyzerPlugin())
    //     base.push(new ImageminPlugin({
    //         bail: false, // Ignore errors on corrupted images
    //         cache: true,
    //         imageminOptions: {
    //           // Before using imagemin plugins make sure you have added them in `package.json` (`devDependencies`) and installed them
    //           // Lossless optimization with custom option
    //           // Feel free to experiment with options for better result for you
    //           plugins: [
    //             ["mozjpeg", {
    //                 progressive: true,
    //                 quality: 50
    //             }],
    //             ["optipng", { optimizationLevel: 5 }],
    //           ]
    //         }
    //       }))
    // }

    return base
}

const optimization = () => {
    const config = {
        splitChunks: {
            chunks: 'all'
        }
    }
    if (isProd) {
        config.minimizer = [
            new OptimizeCssAssetsWebpackPlugin(),
            new TerserWebpackPlugin()
        ]
    }
    return config
}

module.exports = {
    mode: 'development',
    context: path.resolve(__dirname, 'src'),
    entry: {
        main: './index.ts'
    },
    output: {
        filename: '[name].[hash].js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: ''
    },
    optimization: optimization(),
    plugins: plugins(),
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 3000,
        hot: isDev,
        host: '0.0.0.0'
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            hmr: isDev,
                            reloadAll: true
                        }
                    },
                    'css-loader'
                ]
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                  // Creates `style` nodes from JS strings
                  'style-loader',
                  {
                    loader: MiniCssExtractPlugin.loader,
                    options: {
                        hmr: isDev,
                        reloadAll: true
                    }
                  },
                  // Translates CSS into CommonJS
                  'css-loader',
                  // Compiles Sass to CSS
                  'sass-loader',
                ],
            },
            {
                test:/\.(png|jpg|svg|jpeg)$/,
                use: [
                    'file-loader',
                    // {
                    //     loader: 'image-webpack-loader',
                    //     options: {
                    //         mozjpeg: {
                    //             progressive: true,
                    //             quality: 50
                    //           },
                    //           // optipng.enabled: false will disable optipng
                    //           optipng: {
                    //             enabled: false,
                    //           },
                    //           pngquant: {
                    //             quality: [0.65, 0.90],
                    //             speed: 4
                    //           },
                    //           gifsicle: {
                    //             interlaced: false,
                    //           },
                    //           // the webp option will enable WEBP
                    //           webp: {
                    //             quality: 75
                    //           }
                    //     },
                    // }
                ]
            },
            {
                test:/\.(ttf|woff|woff2|eot)$/,
                use: ['file-loader']
            },
            {
                test:/\.csv$/,
                use: ['csv-loader']
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    presets: [
                        '@babel/preset-env'
                    ]
                }
            },
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    }
}
