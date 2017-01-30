var VirtualElement = require('./virtual-element');
var util = require('../util');

var VirtualDropbar = function () {
  VirtualElement.call(this);
  this.tagName = 'VIRTUALDROPBAR';
  this.display = 'hidden';
  this.filterSelected = 'all';
};
VirtualDropbar.prototype = new VirtualElement();
VirtualDropbar.prototype.getWidth = function () {
  var dropbar = this.nativeElement;
  this.offsetWidth = dropbar.offsetWidth;
};
VirtualDropbar.prototype.getHeight = function () {
  var dropbar = this.nativeElement;
  this.offsetHeight = dropbar.offsetHeight;
};

module.exports = VirtualDropbar;