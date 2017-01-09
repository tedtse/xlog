; (function (root, doc) {
  var util = require('./util');
  
  module.exports = {
    container: null,
    
    head: null,
    
    body: null,
    
    entity: null,
    
    closeButton: null,
    
    cleanButton: null,
    
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
      }
    },
    
    print: function (msg, level) {
      var entity = this.entity;
      if (!entity) {
        return;
      }
      
      switch (level) {
        case 'warn':
        case 'error':
        case 'info':
        case 'log':
        default:
          entity.innerHTML += '<li>' + msg + '</li>';
          break;
      }
    }
  };
}) (window, document);