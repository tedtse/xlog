module.exports = {
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
  },
  
  on: function (el, evt, handler) {
    el.addEventListener ? el.addEventListener(evt, handler, false) : el.attachEvent('on' + evt, handler);
  },

  off: function () {
    el.removeEventListener ? el.removeEventListener(evt, handler, false) : el.detachEvent('on' + evt, handler);
  },
  
  extend (target, options) {
    for (name in options) {
      target[name] = options[name];
    }
    return target;
  }
}