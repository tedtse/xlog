var VirtualElement = require('./virtual-element');
var VirtualLiDetailTitle = require('./virtual-li-detail-title');
var VirtualLiDetailContent = require('./virtual-li-detail-content');

var VirtualLiDetail = function () {
  VirtualElement.call(this);
  this.tagName = 'VIRTUALLIDETAIL';
  this.children = [];
  this.children.push(
    new VirtualLiDetailTitle(),
    new VirtualLiDetailContent()
  );
};
VirtualLiDetail.prototype = new VirtualElement();
VirtualLiDetail.prototype.fullMap = function (el) {
  this.nativeElement = el;
  var title = this.getElmentsByTagName('virtuallidetailtitle')[0];
  var content = this.getElmentsByTagName('virtuallidetailcontent')[0];
  title.nativeElement = el.querySelector('.figure');
  content.nativeElement = el.querySelector('ul');
};

module.exports = VirtualLiDetail;