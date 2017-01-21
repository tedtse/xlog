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
        result.html = '<div class="xlog-list-detail">' + obj + '</div>';
        break;
    }
    return result;
  };

  var _objectSummary = function (obj) {
    var result = '';
    switch (obj.constructor) {
      case Array:
        result = 'Array<i>[</i>' + obj.length + '<i>]</i>';
        break;
      case Object:
        result = 'Object';
        break;
      default:
        result = obj;
        break;
    }
    return result;
  };

  var _arrayToHTML = function (arr) {
    var length = arr.length;
    var _arr = arr.slice(0, length);
    for (var i = _arr.length; i--;) {
      _arr[i] = _objectSummary(_arr[i]);
    }
    var html = 
      '<div class="xlog-list-detail"> \
        <div class="figure">Array <i>[</i> <p>' + _arr.join(', ') + '</p> <i>]</i></div> \
        <ul>';
    for (var i = 0; i < length; i++) {
      var item = arr[i];
      switch (item.constructor) {
        case Array:
          html += '<li><span class="xlog-key">' + i + '</span>: <span class="xlog-value">' + _arrayToHTML(item) + '</span></li>';
          break;
        case Object:
          html += '<li><span class="xlog-key">' + i + '</span>: <span class="xlog-value">' + _objectToHTML(item) + '</span></li>';
          break;
        default:
          html += '<li><span class="xlog-key">' + i + '</span>: <span class="xlog-value">' + item + '</span></li>';
          break;
      }
    }
    html += 
        '</ul> \
      </div>';
    return html;
  };

  var _objectToHTML = function (obj) {
    var titleArray = [];
    var entityArray = [];
    var html = '';
    for (var key in obj) {
      titleArray.push('<span class="xlog-key">' + key + '</span>: <span class="xlog-value">' + _objectSummary(obj[key]) + '</span>'); 
      entityArray.push({
        key: key,
        value: obj[key]
      }); 
    }
    html = 
      '<div class="xlog-list-detail"> \
        <div class="figure">Object <i>{</i> <p>' + titleArray.join(', ') + '</p> <i>}</i></div> \
        <ul>';
    for (var i = 0, j = entityArray.length; i < j; i++) {
      var item = entityArray[i];
      switch (item.value.constructor) {
        case Array:
          html += '<li><span class="xlog-key">' + item.key + '</span>: <span class="xlog-value">' + _arrayToHTML(item.value) + '</span></li>';
          break;
        case Object:
          html += '<li><span class="xlog-key">' + item.key + '</span>: <span class="xlog-value">' + _objectToHTML(item.value) + '</span></li>';
          break;
        default:
          html += '<li><span class="xlog-key">' + item.key + '</span>: <span class="xlog-value">' + item.value + '</span></li>';
          break;
      }
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