var VirtualElement = require('./virtual-element');
var VirtualLiDetailTitle = require('./virtual-li-detail-title');
var VirtualLiDetailContent = require('./virtual-li-detail-content');

var VirtualLiDetail = function (key, value) {
  VirtualElement.call(this);
  this.tagName = 'VIRTUALLIDETAIL';
  this.key = key;
  this.value = value;
  this.appendChild(
    new VirtualLiDetailTitle(),
    new VirtualLiDetailContent()
  );
};
VirtualLiDetail.prototype = new VirtualElement();
VirtualLiDetail.prototype.mapTitle = function () {
  var el = this.nativeElement;
  var title = this.getElmentsByTagName('virtuallidetailtitle')[0];
  title.nativeElement = el.querySelector('.figure');
};
VirtualLiDetail.prototype.mapContent = function () {
  var el = this.nativeElement;
  var content = this.getElmentsByTagName('virtuallidetailcontent')[0];
  content.nativeElement = el.querySelector('ul');
};

module.exports = VirtualLiDetail;