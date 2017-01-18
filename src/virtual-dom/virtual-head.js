var VirtualElement = require('./virtual-element');

var VirtualHead = function () {
  VirtualElement.call(this);
  this.tagName = 'VIRTUALHEAD';
};
VirtualHead.prototype = new VirtualElement();

module.exports = VirtualHead;