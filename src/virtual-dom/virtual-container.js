var VirtualElement = require('./virtual-element');

var VirtualContainer = function () {
  VirtualElement.call(this);
  this.tagName = 'VIRTUALCONTAINER';
  this.display = 'hidden';
  this.offsetWidth = 0;
  this.offsetHeight = 0;
  this.offsetLeft = 0;
  this.offsetTop = 0;
  this.marginLeft = 0;
};
VirtualContainer.prototype = new VirtualElement();

module.exports = VirtualContainer;