var dom = require('../dom');
var Bus = require('../bus');
var VirtualLi = require('../virtual-dom/virtual-li');
var VirtualLiDetail = require('../virtual-dom/virtual-li-detail');
var virtualCache = require('../virtual-dom/virtual-cache');
var virtualEntity = virtualCache.entity;

var _print = function (virtualContainer, level, fmt, li) {
  var virtualLi = new VirtualLi(level);
  virtualContainer.appendChild(virtualLi);
  virtualLi.map(li);
  li.setAttribute('data-virtual-id', virtualLi.id);
  if (fmt.instance === 'string' || fmt.instance === 'other') {
    return;
  }
  var virtualLiDetail = new VirtualLiDetail();
  var liDetail = li.querySelector('.xlog-list-detail');
  if (!liDetail) {
    return;
  }
  virtualLi.appendChild(virtualLiDetail);
  virtualLiDetail.fullMap(liDetail);
  var ul = liDetail.querySelector('ul')
  if (!ul) {
    return;
  }
  var lis = ul.childNodes;
  for (var i = 0, j = lis.length; i < j; i++) {

    _print(virtualLi, level, fmt, lis[i]);
  }
};

Bus.on('PRINT', function (level, fmt, li) {
  _print(virtualEntity, level, fmt, li);
});