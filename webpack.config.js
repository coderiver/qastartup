var webpack            = require('webpack');
var CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');
var config             = require('./gulp/config');
var path               = require('path');

module.exports = {
    context: __dirname + '/app/js',
    entry: {
        'main-page': './controllers/index',
        'course-page': './controllers/course',
        'preloader': './preloader'
    },
    output: {
        path: path.join(__dirname, config.dest.js),
        filename: '[name].js'
    },
    devtool: config.production ? 'source-map' : 'cheap-inline-module-source-map',
    plugins: [
        new webpack.NoErrorsPlugin(),
        new CommonsChunkPlugin({
            name: 'common',
            filename: '[name].js',
            minChunks: 2,
            chunks: ['main-page', 'course-page']
        })
    ],
    resolve: {
        extensions: ['', '.js', '.coffee']
    },
    module: {
        loaders: [
            {
                test: /\.coffee$/,
                exclude: /node_modules/,
                loader: 'coffee'
            }
        ]
    }
};
