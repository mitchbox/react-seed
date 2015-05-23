var path = require('path');
var util = require('util');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var webpack = require('webpack');
var pkg = require('../package.json');

var DEBUG = process.argv[process.argv.length-1] === '-dev';
var TEST = process.argv[process.argv.length-1] === '-test';

var cssBundle = path.join('css', util.format('[name].%s.css', pkg.version));
var vendorJSBundle = path.join('js', util.format('vendors.js'));
var vendorCSSBundle = path.join('css', util.format('vendors.css'));

var plugins = [
  new webpack.optimize.OccurenceOrderPlugin(),
  new webpack.optimize.CommonsChunkPlugin('vendors', vendorJSBundle),
  new ExtractTextPlugin('vendors', vendorCSSBundle),
  new webpack.ProvidePlugin({$:'jquery', jQuery:'jquery', 'windows.jQuery':'jquery', 'root.jQuery':'jquery'})
];
if (DEBUG) {
  plugins.push(
    new webpack.HotModuleReplacementPlugin()
  );
} else if (!TEST) {
  plugins.push(
    new ExtractTextPlugin(cssBundle, {
      allChunks: true
    }),
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new webpack.NoErrorsPlugin()
  );
}

module.exports = plugins;
