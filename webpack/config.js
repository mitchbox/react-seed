var path = require('path');
var util = require('util');
var autoprefixer = require('autoprefixer-core');
var pkg = require('../package.json');

var loaders = require('./loaders');
var plugins = require('./plugins');

var DEBUG = process.env.NODE_ENV === 'development';
var TEST = process.env.NODE_ENV === 'test';

var jsBundle = path.join('js', util.format('[name].%s.js', pkg.version));

var entry = {
  app: ['./app.js'],
  vendors: ['jquery', 'bootstrap', 'bootstrap-css', 'cookies', 'moment', 'i18next']
};

if (DEBUG) {
  entry.app.push(
    util.format(
      'webpack-dev-server/client?http://%s:%d',
      pkg.config.devHost,
      pkg.config.devPort
    )
  );
  entry.app.push('webpack/hot/dev-server');
}

var bower_dir = path.resolve(__dirname, '../app/bower_components');

var config = {
  addVendor: function(name, path) {
    this.resolve.alias[name] = path;
    this.module.noParse.push(new RegExp('^'+name+'$'));
  },
  context: path.join(__dirname, '../app'),
  cache: DEBUG,
  debug: DEBUG,
  target: 'web',
  devtool: DEBUG || TEST ? 'inline-source-map' : false,
  entry: entry,
  output: {
    path: path.resolve(pkg.config.buildDir),
    publicPath: '/',
    filename: jsBundle,
    pathinfo: false
  },
  module: {
    noParse: [],
    loaders: loaders
  },
  postcss: [
    autoprefixer
  ],
  plugins: plugins,
  resolve: {
    extensions: ['', 'css', '.js', '.json', '.jsx'],
    alias: {}
  },
  devServer: {
    contentBase: path.resolve(pkg.config.buildDir),
    hot: true,
    noInfo: false,
    inline: true,
    stats: { colors: true }
  }
};

config.addVendor('jquery', bower_dir+'/jquery/dist/jquery.min.js');
config.addVendor('bootstrap', bower_dir+'/bootstrap/dist/js/bootstrap.min.js');
config.addVendor('bootstrap-css', bower_dir+'/bootstrap/dist/css/bootstrap.min.css');
config.addVendor('cookies', bower_dir+'/Cookies/dist/cookies.min.js');
config.addVendor('moment', bower_dir+'/moment/moment.js');
config.addVendor('i18next', bower_dir+'/i18next/i18next.amd.js');

module.exports = config;
