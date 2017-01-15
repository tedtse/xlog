var VirtualElement = require('./virtual-element');

var VirtualLi = function (level) {
  VirtualElement.call(this);
  this.tagName = 'VIRTUALLI';
  this.level = level;
  this.display = 'show';
};
VirtualLi.prototype = new VirtualElement();

module.exports = VirtualLi;