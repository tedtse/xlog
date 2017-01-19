var util = require('../util');
var dom = require('../dom');
var virtualCache = require('../virtual-dom/virtual-cache');
var virtualContainer = virtualCache.container;

var _detailToggle = function (evt, selector) {
  var e = evt || event;
  var target = e.target || e.srcElement;
  var li = util.closest(target, 'li');
  var virtualId = li.getAttribute('data-virtual-id');
  var virtualLi = virtualContainer.getElementById(virtualId);
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
};

util.on(dom.entity, 'click', 'p', function (evt) {
  _detailToggle(evt, 'p');
});
util.on(dom.entity, 'click', 'span', function (evt) {
  _detailToggle(evt, 'span');
});