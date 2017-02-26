var ora = require('ora');
var utils = require('./utils');
var umdConfig = require('./webpack.umd.conf');
var clientConfig = require('./webpack.client.conf');

var spinner = ora('build for production...');

spinner.start();
utils.webpackToPromise(umdConfig, 'xlog-umd')
  .then(function () {
    return utils.webpackToPromise(clientConfig, 'xlog-client');
  })
  .then(function () {
    spinner.stop();
  });