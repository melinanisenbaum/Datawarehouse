const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const devMode = process.env.NODE_ENV !== 'production';
console.log(devMode);

module.exports = {
    entry: './frontend/scripts/app.js',
    output: {
        path: path.join(__dirname, 'bundles'),
        filename: 'js/bundle.js'
    },
    mode:"development",
    devtool: 'source-map',
    devServer: {
        port: 5000
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './frontend/index.html',
            minify: {
                collapseWhitespace: true,
                removeRedundantAttributes: true,
                removeScriptTypeAttributes: true,
                removeStyleLinkTypeAttributes:true,
                useShortDoctype: true
            }
        }),
        new MiniCssExtractPlugin({
            filename: 'css/bundle.css',
        })
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [ 
                    //devMode ? 
                    'style-loader',
                    //  : MiniCssExtractPlugin.loader,
                    'css-loader'
                ]
            }
        ]
    }
};