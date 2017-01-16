var VirtualElement = require('./virtual-element');
var util = require('../util');

var VirtualContainer = function () {
  VirtualElement.call(this);
  this.tagName = 'VIRTUALCONTAINER';
  this.display = 'hidden';
  this.isInitializedOffset = false;
  this.offsetWidth = 0;
  this.offsetHeight = 0;
  this.offsetLeft = 0;
  this.offsetTop = 0;
  this.marginLeft = 0;
};
VirtualContainer.prototype = new VirtualElement();
VirtualContainer.prototype.getOffset = function () {
  var container = this.nativeElement;
  this.offsetWidth = container.offsetWidth;
  this.offsetHeight = container.offsetHeight;
  this.offsetLeft = container.offsetLeft;
  this.offsetTop = container.offsetTop;
  this.marginLeft = parseFloat(util.getStyle(container, 'marginLeft'));
};

module.exports = VirtualContainer;