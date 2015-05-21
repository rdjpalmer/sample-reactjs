var path = require('path');

module.exports = function(config) {
  config.set({
    files: ['app/**/__tests__/*.js'],
    frameworks: ['mocha'],
    browsers: ['Chrome'],
    preprocessors: {
      'app/**/__tests__/*.js': ['webpack']
    },

    webpack: {
      output: {
        path: path.resolve('./dist'),
        filename: 'bundle.js',
        publicPath: '/',
      },
      module: {
        loaders: [{
          test: /\.js?$/,
          loaders: ['babel-loader'],
          exclude: /node_modules/
        }]
      }
    },
    webpackMiddleware: {
      noInfo: true
    },
    plugins: [
      require('karma-chrome-launcher'),
      require('karma-mocha'),
      require('karma-webpack')
    ]
  });
}