var incrementId = 0;
var VirtualUl = function () {
  this.children = [];
};
var VirtualLi = function (level) {
  this.id = incrementId++;
  this.level = level;
  this.display = 'show';
};
VirtualLi.prototype.map = function (el) {
  this.el = el;
};

module.exports = {
  container: new VirtualUl(),

  add: function (level) {
    var li = new VirtualLi(level);
    this.container.children.push(li);
    return li;
  },

  clean: function () {
    this.container.children.length = 0;
  },

  eachChild: function (callback) {
    if (typeof callback !== 'function') {
      return;
    }
    var children = this.container.children;
    for (var i = 0, j = children.length; i < j; i++) {
      callback(children[i]);
    }
  }
};