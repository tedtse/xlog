; (function (root, doc) {
  var util = require('./util');
  var setting = require('./setting');
  var dom = require('./dom');
  
  var Xlog = {
    init: function (opts) {
      this.initUI(opts);
      this.initEvents();
    },
    
    initUI: function (opts) {
      setting = util.extend(setting, opts);
      if (!root.console) {
        root.console = {};
      }
      if (setting.isGlobalParameter) {
        window.Xlog = window.xlog = Xlog;
      }
      if (setting.overwriteConsole) {
        root.console.log = Xlog.log;
        root.console.info = Xlog.info;
        root.console.warn = Xlog.warn;
        root.console.error = Xlog.error;
      }
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
  
  // module.exports = Xlog;
  root.Xlog = Xlog;
}) (window, document);