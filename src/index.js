; (function (root, doc) {
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
  };

  var _initEvents = function () {
    require('./events/clean');
    require('./events/entity');
    require('./events/filter');
    require('./events/move');
    require('./events/toggle');
    require('./events/transform');
    require('./events/print');
  };

  var Xlog = {
    init: function (opts) {
      _initSetting(opts);
      _initUI();
      _initEvents();
    },

    log: function (msg) {
      dom.print(msg, 'log');
    },

    debug: function (msg) {
      dom.print(msg, 'debug');
    },
    
    info: function (msg) {
      dom.print(msg, 'info');
    },
    
    error: function (msg) {
      dom.print(msg, 'error');
    },
    
    warn: function (msg) {
      dom.print(msg, 'warn');
    }
  };

  if (__CONFIG__.codingMode === 'client') {
    root.Xlog = root.xlog = Xlog;
  } else {
    module.exports = Xlog;
  }
}) (window, document);