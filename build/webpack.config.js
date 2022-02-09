const path = require('path'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    CleanWebpackPlugin = require('clean-webpack-plugin');
module.exports = {
    mode: 'development',
    entry: path.join(__dirname, '../src', 'index.ts'),
    output: {
        filename: "main.js",
    },
    module: {
        rules: [{
            test: /.tsx?$/,
            loader: 'ts-loader',
            include: /src/,
            exclude: /node_modules/
        }, {
            test: /.jsx?$/,
            loader: 'babel-loader',
            query: {
                presets :[
                    [
                        "@babel/preset-env",
                        {
                            "targets": "> 0.5%, not dead"
                        }
                    ]
                ],
                plugins :['@babel/plugin-proposal-class-properties', '@babel/plugin-transform-classes', 'transform-class-properties']
            },
            include: /src/,
            exclude: /node_modules/
        }]
    },
    resolve: {
        extensions: ['.json', '.js', '.jsx', '.ts', '.tsx']
    },
    devtool: process.env.NODE_ENV === 'production' ? false : 'inline-source-map',
    devServer: {
        contentBase: './dist',
        stats: 'errors-only',
        compress: false,
        host: 'localhost',
        port: 8080,
    },
    plugins: [
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: ['./dist']
        }),
        new HtmlWebpackPlugin({
            template: './src/template/index.html'
        })
    ]
};