var incrementId = 0;

var _getElementById = function (parent, id) {
  var result = null;
  var children = parent.children;
  if (!children.length) {
    return result;
  }
  for (var i = children.length; i--;) {
    var child = children[i];
    if (id === child.id) {
        return child;
    } else {
      result = _getElementById(child, id);
    }
    if (result) {
      return result;
    }
  }
  return result;
};

var _getElmentsByTagName = function (parent, tagName) {
  var result = [];
  var children = parent.children;
  tagName = tagName.toUpperCase();
  if (!children.length) {
    return result;
  }
  for (var i = children.length; i--;) {
    var child = children[i];
    if (tagName === child.tagName) {
      result.push(child);
    }
    result = result.concat(_getElmentsByTagName(child, tagName));
  }
  return result;
}

var VirtualElement = function (ignoreIncrement) {
  this.id = 'xlog-virtual-dom-' + incrementId++;
  this.parent = null;
  this.children = [];
};

VirtualElement.prototype = {
  map: function (el) {
    this.nativeElement = el;
  },
  appendChild: function () {
    Array.prototype.push.apply(this.children, arguments);
    for (var i = 0, j = arguments.length; i < j; i++) {
      var el = arguments[i];
      el.parent = this;
    }
  },
  eachChild: function (callback) {
    if (typeof callback !== 'function') {
      return;
    }
    var children = this.children;
    for (var i = 0, j = children.length; i < j; i++) {
      callback(children[i]);
    }
  },
  getElementById: function (id) {
    return _getElementById(this, id);
  },
  getElmentsByTagName: function (tagName) {
    return _getElmentsByTagName(this, tagName);
  }
};

module.exports = VirtualElement;