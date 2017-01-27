var VirtualElement = require('./virtual-element');
var util = require('../util');

var VirtualBody = function () {
  VirtualElement.call(this);
  this.tagName = 'VIRTUALBODY';
};
VirtualBody.prototype = new VirtualElement();
VirtualBody.prototype.getPadding = function () {
  var body = this.nativeElement;
  this.paddingTop = parseFloat(util.getStyle(body, 'paddingTop'));
  this.paddingRight = parseFloat(util.getStyle(body, 'paddingRight'));
  this.paddingBottom = parseFloat(util.getStyle(body, 'paddingBottom'));
  this.paddingLeft = parseFloat(util.getStyle(body, 'paddingLeft'));
};
VirtualBody.prototype.getWidth = function () {
  var body = this.nativeElement;
  this.offsetWidth = body.offsetWidth;
};
VirtualBody.prototype.getHeight = function () {
  var body = this.nativeElement;
  this.offsetHeight = body.offsetHeight - parseFloat(util.getStyle(body, 'borderTopWidth')) - parseFloat(util.getStyle(body, 'borderBottomWidth'));
};

module.exports = VirtualBody;