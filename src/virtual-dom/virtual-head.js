var VirtualElement = require('./virtual-element');

var VirtualHead = function () {
  VirtualElement.call(this);
  this.tagName = 'VIRTUALHEAD';
};
VirtualHead.prototype = new VirtualElement();
VirtualHead.prototype.getWidth = function () {
  var head = this.nativeElement;
  this.offsetWidth = head.offsetWidth;
};
VirtualHead.prototype.getHeight = function () {
  var head = this.nativeElement;
  this.offsetHeight = head.offsetHeight;
};

module.exports = VirtualHead;