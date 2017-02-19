var util = require('../util');
var dom = require('../dom');
var Bus = require('../bus');
var virtualCache = require('../virtual-dom/virtual-cache');
var VirtualLi = require('../virtual-dom/virtual-li');
var VirtualLiDetail = require('../virtual-dom/virtual-li-detail');
var VirtualLiDetailTitle = require('../virtual-dom/virtual-li-detail-title');
var VirtualLiDetailContent = require('../virtual-dom/virtual-li-detail-content');
var virtualContainer = virtualCache.container;
var virtualEntity = virtualCache.entity;

var _generateVirtualTree = function (parent, key, value) {
  var virtualLiDetail = new VirtualLiDetail(key, value);
  var virtualDetailTitle = virtualLiDetail.getElmentsByTagName('virtuallidetailtitle')[0];
  var virtualDetailContent = virtualLiDetail.getElmentsByTagName('virtuallidetailcontent')[0];
  if (value.constructor === Array) {
    for (var i = 0, j = value.length; i < j; i++) {
      _generateVirtualTree(virtualDetailContent, i, value[i]);
    }
  } else if (value.constructor === Object) {
    for (var i in value) {
      _generateVirtualTree(virtualDetailContent, i, value[i]);
    }
  }
  parent.appendChild(virtualLiDetail);
};

util.on(dom.entity, 'click', '.figure', function (evt) {
  var e = evt || event;
  var target = e.target || e.srcElement;
  var liDetail = util.closest(target, '.xlog-list-detail');
  var virtualId = liDetail.getAttribute('data-virtual-id');
  var virtualDetail = virtualContainer.getElementById(virtualId);
  var virtualDetailTitle = virtualDetail.getElmentsByTagName('virtuallidetailtitle')[0];
  var virtualDetailContent = virtualDetail.getElmentsByTagName('virtuallidetailcontent')[0];
  var title = virtualDetailTitle.nativeElement;
  var content = virtualDetailContent.nativeElement;
  if (!content) {
    dom.generateDetail(liDetail, virtualDetail);
    virtualDetail.map(liDetail);
    virtualDetail.mapTitle();
    virtualDetail.mapContent();
    title = virtualDetailTitle.nativeElement;
    content = virtualDetailContent.nativeElement;
  }
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

Bus.on('WRITE', function (level, fmt, li) {
  var virtualLi = new VirtualLi(level);
  virtualEntity.appendChild(virtualLi);
  virtualLi.map(li);
  if (fmt.instance === 'string' || fmt.instance === 'other') {
    return;
  }
  var liDetail = li.querySelector('.xlog-list-detail');
  if (!liDetail) {
    return;
  }
  _generateVirtualTree(virtualLi, null, fmt.content);
  var virtualLiDetail = virtualLi.getElmentsByTagName('virtualLiDetail')[0];
  liDetail.setAttribute('data-virtual-id', virtualLiDetail.id);
  virtualLiDetail.map(liDetail);
  virtualLiDetail.mapTitle();
});