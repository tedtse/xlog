var util = require('../util');
var dom = require('../dom');
var virtualRoot = require('../virtual-dom/virtual-document');

util.on(dom.entity, 'click', 'span', function (evt) {
  var e = evt || event;
  var target = e.target || e.srcElement;
  var li = target.parentNode.parentNode;
  var virtualId = li.getAttribute('data-virtual-id');
  var virtualLi = virtualRoot.getElementById(virtualId);
  var virtualDetailTitle = virtualLi.getElmentsByTagName('virtuallidetailtitle')[0];
  var virtualDetailContent = virtualLi.getElmentsByTagName('virtuallidetailcontent')[0];
  var title = virtualDetailTitle.nativeElement;
  var content = virtualDetailContent.nativeElement;
  if (virtualDetailTitle.toggle === 'on') {
    util.removeClass(title, 'on');
    content.style.display = 'none';
    virtualDetailTitle.toggle = 'off';
    virtualDetailContent.display = 'hidden';
  } else {
    util.addClass(title, 'on');
    content.style.display = 'block';
    virtualDetailTitle.toggle = 'on';
    virtualDetailContent.display = 'show';
  }
});