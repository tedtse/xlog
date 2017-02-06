var VirtualElement = require('./virtual-element');

var VirtualBody = function () {
  VirtualElement.call(this);
  this.tagName = 'VIRTUALBODY';
};
VirtualBody.prototype = new VirtualElement();

module.exports = VirtualBody;