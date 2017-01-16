; (function (root, doc) {
  var util = require('./util');
  var setting = require('./setting');
  var dom = require('./dom');
  
  var Xlog = {
    init: function (opts) {
      this.initSetting(opts);
      this.initUI();
      this.initEvents();
    },
    
    initSetting: function (opts) {
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
    },

    initUI: function () {
      dom.generate();
    },
    
    initEvents: function () {
      require('./events/clean');
      require('./events/entity');
      require('./events/filter');
      require('./events/move');
      require('./events/toggle');
      require('./events/transform');
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

  // root.Xlog = root.xlog = Xlog;
  module.exports = Xlog;
}) (window, document);