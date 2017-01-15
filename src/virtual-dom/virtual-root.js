var VirtualElement = require('./virtual-element');

var VirtualRoot = function () {
  VirtualElement.call(this);
  this.tagName = 'VIRTUALROOT';
};
VirtualRoot.prototype = new VirtualElement();

module.exports = VirtualRoot;