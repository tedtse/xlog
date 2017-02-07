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
    dom.generateDetail(liDetail, virtualDetail.content);
    virtualDetail.mapContent();
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

Bus.on('WRITE_DETAIL', function (liDetail, content) {
  var virtualLiDetail = new VirtualLiDetail(content);
  virtualLiDetail.map(liDetail);
  liDetail.setAttribute('data-virtual-id', virtualLiDetail.id);
  virtualLiDetail.mapTitle();
});

Bus.on('WRITE', function (level, fmt, li) {
  var virtualLi = new VirtualLi(level);
  virtualEntity.appendChild(virtualLi);
  virtualLi.map(li);
  if (fmt.instance === 'string' || fmt.instance === 'other') {
    return;
  }
  var virtualLiDetail = new VirtualLiDetail(fmt.content);
  var liDetail = li.querySelector('.xlog-list-detail');
  if (!liDetail) {
    return;
  }
  liDetail.setAttribute('data-virtual-id', virtualLiDetail.id);
  virtualLi.appendChild(virtualLiDetail);
  virtualLiDetail.map(liDetail);
  virtualLiDetail.mapTitle();
});