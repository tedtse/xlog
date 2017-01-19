; (function (root, doc) {
  var util = require('./util');
  var setting = require('./setting');
  var Bus = require('./bus');
  
  var _msgFormat = function (obj) {
    var result = {};
    switch (obj.constructor) {
      case Array:
        result.instance = 'array';
        result.html = _arrayToHTML(obj);
        break;
      case Object:
        result.instance = 'object';
        result.html = _objectToHTML(obj);
        break;
      case String:
        result.instance = 'string';
        result.html = '<div class="xlog-list-detail">' + util.htmlEncode(obj) + '</div>';
        break;
      default:
        result.instance = 'other';
        result.html ='<div class="xlog-list-detail">' + obj + '</div>';
        break;
    }
    return result;
  };

  var _arrayToHTML = function (arr) {
    var html = 
      '<div class="xlog-list-detail"> \
        <p>Array [ <span>' + arr.join(', ') + '</span> ]</p> \
        <ul>';
    for (var i = 0, j = arr.length; i < j; i++) {
      html += '<li>' + i + ': ' + arr[i] + '</li>';
    }
    html += 
      '</ul> \
    </div>';
    return html;
  };

  var _objectToHTML = function (obj) {
    var arr = [];
    var html = '';
    for (var key in obj) {
      arr.push(key + ': ' + obj[key]); 
    }
    html = 
      '<div class="xlog-list-detail"> \
        <p>Object { <span>' + arr.join(', ') + '</span> }</p> \
        <ul>';
    for (var i = 0, j = arr.length; i < j; i++) {
      html += '<li>' + arr[i] + '</li>';
    }
    html += 
      '</ul> \
    </div>';
    return html;
  };
  
  module.exports = {
    container: null,

    head: null,
    
    body: null,
    
    entity: null,
    
    closeButton: null,
    
    cleanButton: null,

    filterButton: null,

    titlebar: null,

    taskbar: null,

    dropbar: null,
    
    initDom: function () {
      var container = this.container;
      this.head = container.querySelector('[role="xlog-head"]');
      this.body = container.querySelector('[role="xlog-body"]');
      this.entity = container.querySelector('[role="xlog-entity"]');
      this.closeButton = container.querySelector('[role="xlog-close-button"]');
      this.cleanButton = container.querySelector('[role="xlog-clean-button"]');
      this.filterButton = container.querySelector('[role="xlog-filter-button"]');
      this.titlebar = container.querySelector('[role="xlog-titlebar"]');
      this.taskbar = container.querySelector('[role="xlog-taskbar"]');
      this.dropbar = container.querySelector('[role="xlog-dropbar"]');
      require('./virtual-dom/virtual-document');
    },
    
    generate: function () {
      var container = doc.createElement('div');
      // 引入css
      require('./css/xlog.css');
      container.id = 'xlog';
      container.setAttribute('role', 'xlog-container');
      container.innerHTML = require('./tpl/xlog.tpl');
      doc.body.appendChild(container);
      this.container = container;
      this.initDom();
    },
    
    show: function () {
      var container = this.container;
      if (!container) {
        return;
      }
      container.style.display = 'block';
    },

    hide: function () {
      var container = this.container;
      if (container) {
          container.style.display = 'none';
      }
    },
    
    clean: function () {
      var entity = this.entity;
      if (entity) {
        entity.innerHTML = '';
      }
    },
    
    print: function () {
      var args = Array.prototype.slice.call(arguments);
      var entity = this.entity;
      if (!args.length || !entity) {
        return;
      }
      var level = args[0] || 'log';
      var _args = args.slice(1);
      for (var i = 0, j = _args.length; i < j; i++) {
        var li = document.createElement('LI');
        var fmt = _msgFormat(_args[i]);
        li.className = level;
        li.innerHTML = fmt.html;
        entity.appendChild(li);
        Bus.dispatch('PRINT', level, fmt, li);
      }
    }
  };
}) (window, document);