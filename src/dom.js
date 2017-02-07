; (function (root, doc) {
  var util = require('./util');
  var setting = require('./setting');
  var Bus = require('./bus');
  
  var DETAIL_START_STRING = '<div class="xlog-list-detail">';
  var DETAIL_END_STRING = '</div>';
  var ARRAY_START_STRING = '<div class="figure">Array <i>[</i> <p>';
  var ARRAY_END_STRING = '</p> <i>]</i></div>';
  var OBJECT_START_STRING = '<div class="figure">Object <i>{</i> <p>';
  var OBJECT_END_STRING = '</p> <i>}</i></div>';

  var _msgFormat = function (obj) {
    var result = {};
    if (!obj) {
      return result;
    }
    switch (obj.constructor) {
      case Array:
        result.instance = 'array';
        result.html = DETAIL_START_STRING + _arrayToHTML(obj) + DETAIL_END_STRING;
        break;
      case Object:
        result.instance = 'object';
        result.html = DETAIL_START_STRING + _objectToHTML(obj) + DETAIL_END_STRING;
        break;
      case String:
        result.instance = 'string';
        result.html = DETAIL_START_STRING + util.htmlEncode(obj) + DETAIL_END_STRING;
        break;
      default:
        result.instance = 'other';
        result.html = DETAIL_START_STRING + obj + DETAIL_END_STRING;
        break;
    }
    result.content = obj;
    return result;
  };

  var _objectSummary = function (obj) {
    var result = '';
    if (!obj) {
      return result;
    }
    switch (obj.constructor) {
      case Array:
        result = DETAIL_START_STRING + ARRAY_START_STRING + obj.length + ARRAY_END_STRING + DETAIL_END_STRING;
        break;
      case Object:
        result = DETAIL_START_STRING + OBJECT_START_STRING + OBJECT_END_STRING + DETAIL_END_STRING;
        break;
      default:
        result = obj;
        break;
    }
    return result;
  };

  var _objectDetail = function (obj) {
    var html = '';
    if (!obj) {
      return html;
    }
    if (obj.constructor === Array) {
      html += '<ul>';
      for (var i = 0, j = obj.length; i < j; i++) {
        html += '<li><span class="xlog-key">' + i + '</span>: <span class="xlog-value">' + _objectSummary(obj[i]) + '</span></li>';
      }
      html += '</ul>';
    } else if (obj.constructor === Object) {
      html += '<ul>';
      for (var i in obj) {
        html += '<li><span class="xlog-key">' + i + '</span>: <span class="xlog-value">' + _objectSummary(obj[i]) + '</span></li>';
      }
      html += '</ul>';
    }
    return html;
  };

  var _arrayToHTML = function (arr) {
    var length = arr.length;
    var _arr = arr.slice(0, length);
    for (var i = _arr.length; i--;) {
      _arr[i] = _objectSummary(_arr[i]);
    }
    var html = 
      ARRAY_START_STRING + _arr.join(', ') + ARRAY_END_STRING;
    return html;
  };

  var _objectToHTML = function (obj) {
    var titleArray = [];
    var html = '';
    for (var key in obj) {
      titleArray.push('<span class="xlog-key">' + key + '</span>: <span class="xlog-value">' + _objectSummary(obj[key]) + '</span>'); 
    }
    html = 
      OBJECT_START_STRING + titleArray.join(', ') + OBJECT_END_STRING;
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
    
    write: function () {
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
        Bus.dispatch('WRITE', level, fmt, li);
      }
    },

    generateDetail: function (liDetail, content) {
      liDetail.innerHTML += _objectDetail(content);
      Bus.dispatch('WRITE_DETAIL', liDetail, content);
    }
  };
}) (window, document);