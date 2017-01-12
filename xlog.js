; (function (root, doc) {
  var winWidth = document.documentElement.clientWidth
  var winHeight = document.documentElement.clientHeight

  var Util = {
    getThunderVersion: function () {
      var result = 'unknow'
      try {
        result = root.external.GetThunderVersion()
      } catch (e) { }
      return result
    },

    getStyle: function (el, prop) {
      if (el.currentStyle) {
        return el.currentStyle[prop]
      } else {
        return getComputedStyle(el, false)[prop]
      }
    },

    outWidth: function (el) {
      return el.offsetWidth + parseFloat(this.getStyle(el, 'paddingLeft')) + parseFloat(this.getStyle(el, 'paddingRight'))
    },

    outHeight: function (el) {
      return el.offsetHeight + parseFloat(this.getStyle(el, 'paddingTop')) + parseFloat(this.getStyle(el, 'paddingBottom'))
    }
  }

  var Xlog = {
    _launchKey: 123,
    
    setLaunchKey: function (keyCode) {
      this._launchKey = keyCode
    },

    getContainer: function () {
      var container = doc.getElementById('xlog')
      if (!container) {
        container = this.generate()
      }
      return container
    },

    init: function () {
      var _this = this
      var _version = Util.getThunderVersion()
      var container = _this.getContainer()
      _this.addCssByLink()
      if (!root.console) {
        root.console = {}
      }
      root.console.log = root.console.info = root.console.warn = root.console.error = Xlog.log
      _this.on(doc, 'keydown', function (evt) {
        var e = evt || event
        var keyCode = e.keyCode
        if (keyCode === _this._launchKey) {
          Util.getStyle(container, 'display') === 'none' ? _this.show() : _this.close()
        }
      })
    },

    initEvents: function () {
      this.closeEvents()
      this.cleanEvents()
      this.moveEvents()
      this.transformEvents()
    },

    addCssByLink: function () {
      var link = doc.createElement('link')
      var head = doc.querySelector('head')
      link.setAttribute('type', 'text/css')
      link.setAttribute('rel', 'stylesheet')
      link.setAttribute('href', 'http://misc.xl9.xunlei.com/client/static/1.0/css/xlog.css')
      if (head) {
        head.appendChild(link)
      } else {
        doc.documentElement.appendChild(link)
      }
    },

    generate: function () {
      var container = doc.createElement('div')
      container.id = 'xlog'
      container.setAttribute('role', 'xlog-container')
      container.innerHTML = 
        '<div role="xlog-head"> \
          <h3 class="clearfix" role="xlog-head">XLog<a class="close" href="javascript:">x</a></h3> \
          <div class="xlog-taskbar" role="xlog-taskbar"> \
            <b role="xlog-clean">?</b> \
          </div> \
        </div> \
        <div class="xlog-body" role="xlog-body"> \
          <ul></ul> \
        </div>'
      doc.body.appendChild(container)
      this.initEvents()
      return container
    },

    show: function () {
      var container = this.getContainer()
      container.style.display = 'block'
      this.offsetWidth = container.offsetWidth
      this.offsetHeight = container.offsetHeight
      this.offsetLeft = container.offsetLeft
      this.offsetTop = container.offsetTop
      this.marginLeft = parseFloat(Util.getStyle(container, 'marginLeft'))
    },

    close: function () {
      var container = this.getContainer()
      if (container) {
          container.style.display = 'none'
      }
    },

    log: function (msg) {
      var container = Xlog.getContainer()
      var ul = container.querySelector('ul')
      ul.innerHTML += '<li>' + msg + '</li>'
    },
    
    clean: function () {
      var container = Xlog.getContainer()
      var ul = container.querySelector('ul')
      ul.innerHTML = ''
    },

    on: function (el, evt, handler) {
      el.addEventListener ? el.addEventListener(evt, handler, false) : el.attachEvent('on' + evt, handler)
    },

    off: function () {
      el.removeEventListener ? el.removeEventListener(evt, handler, false) : el.detachEvent('on' + evt, handler)
    },
    
    cleanEvents: function () {
      var _this = this
      var closeBtn = doc.querySelector('#xlog [role="xlog-taskbar"]')
      _this.on(closeBtn, 'click', function () {
        _this.clean()
      })
    },
    
    closeEvents: function () {
      var _this = this
      var closeBtn = doc.querySelector('#xlog a.close')
      _this.on(closeBtn, 'click', function () {
        _this.close()
      })
    },

    moveEvents: function () {
      var _this = this
      var container = _this.getContainer()
      var xHead = container.querySelector('[role="xlog-head"]')
      var movable = false
      var initX, initY, initOffsetLeft, initOffsetTop
      _this.on(xHead, 'mousedown', function (evt) {
        var e = evt || event
        initX = e.clientX
        initY = e.clientY
        initOffsetLeft = _this.offsetLeft - _this.marginLeft
        initOffsetTop = _this.offsetTop
        movable = true
      })
      _this.on(doc, 'mousemove', function (evt) {
        var e = evt || event
        if (!movable) {
            return
        }

        var x = initOffsetLeft + e.clientX - initX
        var y = initOffsetTop + e.clientY - initY
        // x = Math.min(winWidth - container.offsetWidth, Math.max(0, x)) - _this.marginLeft
        y = Math.min(winHeight - container.offsetHeight, Math.max(0, y))
        container.style.left = x + 'px'
        container.style.top = y + 'px'
      })
      _this.on(doc, 'mouseup', function (evt) {
        var e = evt || event
        movable = false
      })
    },

    transformEvents: function () {
      var _this = this
      var container = _this.getContainer()
      var xHead = container.querySelector('[role="xlog-head"]')
      var xBody = container.querySelector('[role="xlog-body"]')
      var dragable = false
      var transable = false
      var threshold = 10
      var headHeight
      var initX, initY, moveX, moveY, initOffsetWidth, initOffsetHeight, initOffsetLeft, initOffsetTop, resizePos
      _this.on(doc, 'mousemove', function (evt) {
        var e = evt || event
        moveX = e.clientX
        moveY = e.clientY
        initOffsetLeft = container.offsetLeft
        initOffsetTop = container.offsetTop
        initOffsetWidth = container.offsetWidth
        initOffsetHeight = container.offsetHeight
        if (Math.abs(initOffsetLeft + initOffsetWidth - moveX) <= threshold) {
          container.style.cursor = 'e-resize'
          resizePos = 'e'
          dragable = true
        } else if (Math.abs(initOffsetLeft - moveX) <= threshold) {
          container.style.cursor = 'w-resize'
          resizePos = 'w'
          dragable = true
        } else if (Math.abs(initOffsetTop + initOffsetHeight - moveY) <= threshold) {
          container.style.cursor = 's-resize'
          resizePos = 's'
          dragable = true
        } else {
          container.style.cursor = 'default'
          dragable = false
        }

        if (!transable) {
          return
        }

        if (resizePos === 'e') {
          var _width = _this.offsetWidth + moveX - initX
          container.style.width = _width + 'px'
        }
        if (resizePos === 'w') {
          var deltaX = moveX - initX
          var _width = _this.offsetWidth - deltaX
          var _left = _this.offsetLeft + deltaX - _this.marginLeft
          container.style.width = _width + 'px'
          container.style.left = _left + 'px'
        }
        if (resizePos === 's') {
          var _cHeight = _this.offsetHeight + moveY - initY
          if (headHeight === undefined) {
            headHeight = xHead.offsetHeight
          }
          var _xbHeight = _cHeight - headHeight - parseFloat(Util.getStyle(xBody, 'paddingTop')) - parseFloat(Util.getStyle(xBody, 'paddingBottom'))
          container.style.height = _cHeight + 'px'
          xBody.style.height = _xbHeight + 'px'
        }
      })
      _this.on(container, 'mouseout', function (evt) {
        var e = evt || event
        container.style.cursor = 'default'
      })
      _this.on(container, 'mousedown', function (evt) {
        var e = evt || event
        if (!dragable) {
            return
        }

        transable = true
        initX = e.clientX
        initY = e.clientY
      })
      _this.on(doc, 'mouseup', function () {
        transable = false
        _this.offsetWidth = container.offsetWidth
        _this.offsetHeight = container.offsetHeight
        _this.offsetLeft = container.offsetLeft
        _this.offsetTop = container.offsetTop
      })
    }
  }

  Xlog.init()
  root.xlog = root.Xlog = Xlog
}) (window, document)