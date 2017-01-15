var VirtualElement = require('./virtual-element');

var VirtualEntity = function () {
  VirtualElement.call(this);
  this.tagName = 'VIRTUALENTITY';
};
VirtualEntity.prototype = new VirtualElement();

VirtualEntity.prototype.clean = function () {
  this.children.length = 0;
};

module.exports = VirtualEntity;