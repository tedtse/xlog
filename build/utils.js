var webpack = require('webpack');
var chalk = require('chalk');

exports.webpackToPromise = function (config, alias) {
  return new Promise(function (resolve, reject) {
      webpack(config, function (err, stats) {
      if (err) {
        throw err;
        reject();
      }
      process.stdout.write(stats.toString({
        colors: true,
        modules: false,
        children: false,
        chunks: false,
        chunkModules: false
      }) + '\n\n');

      console.log(chalk.cyan('  ' + alias + ' Build complete.\n'));
      resolve();
    });
  });
}