var VirtualElement = require('./virtual-element');

var VirtualDropbar = function () {
  VirtualElement.call(this);
  this.tagName = 'VIRTUALDROPBAR';
  this.display = 'hidden';
  this.filterSelected = 'all';
};
VirtualDropbar.prototype = new VirtualElement();

module.exports = VirtualDropbar;