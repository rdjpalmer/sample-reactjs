/*
  Requires `--harmony` flag, 'cause I'm trying some ES6 syntax :)
 */
require('babel/register');

const path = require('path');
const gulp = require('gulp');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const argv = require('minimist')(process.argv.slice(2));

// gulp plugins
const util = require('gulp-util');
const preprocess = require('gulp-preprocess');

// environment
const env = {
  NODE_ENV: argv.production ? 'production' : 'development'
};

var webpackConfiguration = {
  entry: [
    'webpack/hot/only-dev-server',
    'webpack-dev-server/client?http://localhost:9090',
    './client.js'
  ],
  output: {
    path: path.resolve('./dist'),
    filename: 'bundle.js',
    publicPath: "http://localhost:9090/",
  },
  module: {
    loaders: [{
      test: /\.js?$/,
      loaders: ['react-hot', 'babel-loader'],
      exclude: /node_modules/
    }
    /**
     * For now, we're not going to use webpack for CSS, but rather do it with
     * gulp. Later we'll want to use webpack, so we can have truly
     * component specific CSS, but right now it's a huge pain getting that to
     * play nicely with the server aspect of the app.*
     */
    /*, {
      test: /\.less/,
      loader: ExtractTextPlugin.extract('style-loader', 'css-loader!less-loader')
    }*/]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    // see above*
    // new ExtractTextPlugin('styles.css')
  ]
};

var webpackCompiler;

gulp.task('webpack', function() {
  function handleBundle(err, stats) {
    if(err) {
      throw new util.PluginError('webpack', err);
    }

    util.log('[webpack]', stats.toString());
  }

  webpackCompiler = webpack(webpackConfiguration, handleBundle);
  webpackCompiler.run(handleBundle);
});

gulp.task('webpack-dev-server', function() {
  new WebpackDevServer(webpackCompiler, {
    hot: true,
    watchDelay: 200,
    contentBase: './dist'
  }).listen(9090, function(err) {
    if(err) console.error(err);
    util.log('webpack-dev-server', 'running');
  });
});

gulp.task('default', ['webpack', 'webpack-dev-server']);