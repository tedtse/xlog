; (function (root, doc) {
  var util = require('./util');
  var VirtualLi = require('./virtual-dom/virtual-li');
  var VirtualLiDetail = require('./virtual-dom/virtual-li-detail');
  var virtualRoot = require('./virtual-dom/virtual-document');
  var virtualEntity = virtualRoot.getElmentsByTagName('virtualentity')[0];
  
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
        result.html = util.htmlEncode(obj);
        break;
      default:
        result.instance = 'other';
        result.html = obj;
        break;
    }
    return result;
  };

  var _arrayToHTML = function (arr) {
    var html = 
      '<div class="xlog-list-detail"> \
        <span>[ ' + arr.join(', ') + ' ]</span> \
          <ul>';
    for (var i = 0, j = arr.length; i < j; i++) {
      html += '<li>' + arr[i] + '</li>';
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
        <span>{ ' + arr.join(', ') + ' }</span> \
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

    taskBar: null,

    dropBar: null,
    
    offsetWidth: 0,
    
    offsetHeight: 0,
    
    offsetLeft: 0,
    
    offsetTop: 0,
    
    marginLeft: 0,
    
    initDom: function () {
      var container = this.container;
      this.head = container.querySelector('[role="xlog-head"]');
      this.body = container.querySelector('[role="xlog-body"]');
      this.entity = container.querySelector('[role="xlog-entity"]');
      this.closeButton = container.querySelector('[role="xlog-close-button"]');
      this.cleanButton = container.querySelector('[role="xlog-clean-button"]');
      this.filterButton = container.querySelector('[role="xlog-filter-button"]');
      this.titleBar = container.querySelector('[role="xlog-titlebar"]');
      this.taskBar = container.querySelector('[role="xlog-taskbar"]');
      this.dropBar = container.querySelector('[role="xlog-dropbar"]');
      this.resetPosition();
    },
    
    resetPosition: function () {
      var container = doc.createElement('div');
      this.offsetWidth = container.offsetWidth;
      this.offsetHeight = container.offsetHeight;
      this.offsetLeft = container.offsetLeft;
      this.offsetTop = container.offsetTop;
      this.marginLeft = parseFloat(util.getStyle(container, 'marginLeft'));
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
      this.offsetWidth = container.offsetWidth;
      this.offsetHeight = container.offsetHeight;
      this.offsetLeft = container.offsetLeft;
      this.offsetTop = container.offsetTop;
      this.marginLeft = parseFloat(util.getStyle(container, 'marginLeft'));
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
        virtualEntity.clean();
      }
    },
    
    print: function (msg, level) {
      var entity = this.entity;
      if (!entity) {
        return;
      }
      level = level || 'log';
      var li = document.createElement('LI');
      var virtualLi = new VirtualLi(level);
      var fmt = _msgFormat(msg);
      li.setAttribute('data-virtual-id', virtualLi.id);
      li.className = level;
      li.innerHTML = fmt.html;
      entity.appendChild(li);
      virtualEntity.appendChild(virtualLi);
      virtualLi.map(li);
      if (fmt.instance === 'array' || fmt.instance === 'object') {
        var virtualLiDetail = new VirtualLiDetail();
        virtualLi.appendChild(virtualLiDetail);
        virtualLiDetail.fullMap(li.querySelector('.xlog-list-detail'));
      }
    },

    filter: function (level) {
      virtualEntity.eachChild(function (child) {
        if (level === 'all' || child.level === level) {
          if (child.display === 'hidden') {
            child.nativeElement.style.display = 'block';
            child.display = 'show';
          }
          return;
        }
        if (child.level !== level) {
          if (child.display === 'show') {
            child.nativeElement.style.display = 'none';
            child.display = 'hidden';
          }
        }
      });
    }
  };
}) (window, document);