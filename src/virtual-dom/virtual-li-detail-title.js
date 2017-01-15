var VirtualElement = require('./virtual-element');

var VirtualLiDetailTitle = function () {
  VirtualElement.call(this);
  this.tagName = 'VIRTUALLIDETAILTITLE';
  this.toggle = 'off';
};
VirtualLiDetailTitle.prototype = new VirtualElement();

module.exports = VirtualLiDetailTitle;