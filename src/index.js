; (function (root) {
  var util = require('./util');
  var setting = require('./setting');
  var dom = require('./dom');
  
  var _initSetting = function (opts) {
    setting = util.extend(setting, opts);
    if (!root.console) {
      root.console = {};
    }
    if (setting.overwriteConsole) {
      root.console.log = Xlog.log;
      root.console.debug = Xlog.debug;
      root.console.info = Xlog.info;
      root.console.warn = Xlog.warn;
      root.console.error = Xlog.error;
    }
    if (setting.isGlobalParameter) {
      root.Xlog = root.xlog = Xlog;
    }
  };

  var _initUI = function () {
    dom.generate();
    require('./virtual-dom/virtual-document');
  };

  var _initEvents = function () {
    require('./events/clean');
    require('./events/entity');
    require('./events/filter');
    require('./events/move');
    require('./events/toggle');
    require('./events/transform');
  };

  var Xlog = {
    init: function (opts) {
      _initSetting(opts);
      _initUI();
      _initEvents();
    },

    log: function () {
      var args = Array.prototype.slice.call(arguments);
      args.splice(0, 0, 'log');
      dom.write.apply(dom, args);
    },

    debug: function () {
      var args = Array.prototype.slice.call(arguments);
      args.splice(0, 0, 'debug');
      dom.write.apply(dom, args);
    },
    
    info: function () {
      var args = Array.prototype.slice.call(arguments);
      args.splice(0, 0, 'info');
      dom.write.apply(dom, args);
    },
    
    error: function () {
      var args = Array.prototype.slice.call(arguments);
      args.splice(0, 0, 'error');
      dom.write.apply(dom, args);
    },
    
    warn: function () {
      var args = Array.prototype.slice.call(arguments);
      args.splice(0, 0, 'warn');
      dom.write.apply(dom, args);
    }
  };

  if (__CONFIG__.codingMode === 'client') {
    root.Xlog = root.xlog = Xlog;
  } else {
    module.exports = Xlog;
  }
}) (window);