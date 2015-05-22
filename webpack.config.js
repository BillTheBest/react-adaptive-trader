var ExtractTextPlugin = require('extract-text-webpack-plugin');
var webpack = require('webpack');
var dependencies = require('./getVendorDependencies.js');
var fs = require('fs');

// Copy index to served folder.
var copyDirs = ['./dev-server', './dist'];
copyDirs.forEach(function (dir) {
  if(!fs.existsSync(dir)) { fs.mkdirSync(dir); }
  fs.writeFileSync(dir + '/index.html', fs.readFileSync('./src/index.html'), {flag: 'w+'});
});

var env = process.env.NODE_ENV || 'development'
var isProduction = env.trim().toUpperCase() === 'PRODUCTION'
var isDevelopment = !isProduction;

console.log('Running in ' + env);

var entryPoints = [
  ExtractTextPlugin.extract('style', 'css!less!bootstrap-webpack/bootstrap-styles!./bootstrap.config.js'),
  'bootstrap-webpack/bootstrap-scripts!./bootstrap.config.js',
  './src/app.jsx'
];
if(isDevelopment) {
  entryPoints.push('webpack/hot/dev-server?http://localhost:8080');
}

var loaders = [
  {
    test: /(gif|jpg|jpeg|tiff|png)$/i,
    loader: 'file-loader'
  },
  {
    test: /\.js$/,
    exclude: /(node_modules|config)/,
    loader: 'babel-loader?optional=runtime'
  },
  {
    test: /\.(css|less)$/,
    loader: ExtractTextPlugin.extract('style', 'css!less')
  },
  {
    test: /\.(otf|eot|png|svg|ttf|woff|woff2)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
    loader: 'url-loader?limit=10000&minetype=application/font-woff'
  },
  {
    test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
    loader: 'file-loader'
 }
];

if(isProduction) {
  loaders.push({
    test: /\.jsx$/,
    exclude: /node_modules/,
    loaders: ['babel-loader?optional=runtime']
  });
} else {
  loaders.push({
    test: /\.jsx$/,
    exclude: /node_modules/,
    loaders: ['react-hot', 'babel-loader?optional=runtime']
  });
}

var envPluginString = isProduction ? '"production"' : '"development"';

var plugins = [
  new webpack.ProvidePlugin({
      jQuery: 'jquery'
  }),
  new webpack.optimize.CommonsChunkPlugin(/* chunkName= */'vendor', /* filename= */'vendor.bundle.js'),
  new ExtractTextPlugin('styles.css'),
  new webpack.NoErrorsPlugin(),
  new webpack.DefinePlugin({ 'process.env.NODE_ENV': envPluginString })
 ]

module.exports = {
  entry: {
    app: entryPoints,
    vendor: dependencies
  },
  output: {
    path: './dist',
    filename: 'bundle.js'
  },
  resolve: {
    alias: {
      services: __dirname + '/src/services',
      common: __dirname + '/src/common',
      react$: 'react/addons'
    }
  },
  module: {
    loaders: loaders
  },
  devServer: {
    contentBase: './dev-server',
    hot: isDevelopment,
    inline: true
  },
  plugins: plugins
};
