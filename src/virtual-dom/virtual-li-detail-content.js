var VirtualElement = require('./virtual-element');

var VirtualLiDetailContent = function () {
  VirtualElement.call(this);
  this.tagName = 'VIRTUALLIDETAILCONTENT';
  this.display = 'show';
};
VirtualLiDetailContent.prototype = new VirtualElement();

module.exports = VirtualLiDetailContent;