var dom = require('../dom');
var Bus = require('../bus');
var VirtualLi = require('../virtual-dom/virtual-li');
var VirtualLiDetail = require('../virtual-dom/virtual-li-detail');
var virtualCache = require('../virtual-dom/virtual-cache');
var virtualEntity = virtualCache.entity;

Bus.on('PRINT', function (level, fmt, li) {
  var virtualLi = new VirtualLi(level);
  virtualEntity.appendChild(virtualLi);
  virtualLi.map(li);
  li.setAttribute('data-virtual-id', virtualLi.id);
  if (fmt.instance === 'array' || fmt.instance === 'object') {
    var virtualLiDetail = new VirtualLiDetail();
    virtualLi.appendChild(virtualLiDetail);
    virtualLiDetail.fullMap(li.querySelector('.xlog-list-detail'));
  }
});