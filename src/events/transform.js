var util = require('../util');
var dom = require('../dom');
var container = dom.container;
var head = dom.head;
var body = dom.body;
var virtualCache = require('../virtual-dom/virtual-cache');
var virtualContainer = virtualCache.container;
var virtualHead = virtualCache.head;
var virtualBody = virtualCache.body;

var dragable = false;
var transable = false;
var threshold = 10;
var initX, initY, curX, curY, initOffsetWidth, initOffsetHeight, initLeft, cursor;

util.on(container, 'mousedown', function (evt) {
  var e = evt || window.event;
  if (!dragable) {
      return;
  }
  transable = true;
  initX = e.clientX;
  initY = e.clientY;
  initOffsetWidth = virtualContainer.offsetWidth;
  initOffsetHeight = virtualContainer.offsetHeight;
  initLeft = virtualContainer.left;
});

util.on(document, 'mousemove', function (evt) {
  if (virtualContainer.display !== 'show') {
    return;
  }
  var e = evt || window.event;
  curX = e.clientX;
  curY = e.clientY;
  if (Math.abs(virtualContainer.left + virtualContainer.marginLeft + virtualContainer.offsetWidth - curX) <= threshold) {
    container.style.cursor = 'e-resize';
    cursor = 'e-resize';
    dragable = true;
  } else if (Math.abs(virtualContainer.left + virtualContainer.marginLeft - curX) <= threshold) {
    container.style.cursor = 'w-resize';
    cursor = 'w-resize';
    dragable = true;
  } else if (Math.abs(virtualContainer.top + virtualContainer.offsetHeight - curY) <= threshold) {
    container.style.cursor = 's-resize';
    cursor = 's-resize';
    dragable = true;
  // } else if (curX > virtualContainer.left && curX < virtualContainer.left + virtualContainer.offsetWidth && curY > virtualContainer.top && curY < virtualContainer.top + virtualContainer.offsetHeight) {
  } else {
    container.style.cursor = 'default';
    dragable = false;
  }
  if (!transable) {
    return;
  }
  
  if (cursor === 'e-resize') {
    var _width = initOffsetWidth + curX - initX;
    container.style.width = _width + 'px';
    virtualContainer.offsetWidth = _width;
  }
  if (cursor === 'w-resize') {
    var deltaX = curX - initX;
    var _width = initOffsetWidth - deltaX;
    var _left = initLeft + deltaX;
    container.style.width = _width + 'px';
    container.style.left = _left + 'px';
    virtualContainer.offsetWidth = _width;
    virtualContainer.left = _left;
  }
  if (cursor === 's-resize') {
    var _cHeight = initOffsetHeight + curY - initY;
    var _xbHeight = _cHeight - virtualHead.offsetHeight - virtualBody.paddingTop - virtualBody.paddingBottom;
    container.style.height = _cHeight + 'px';
    body.style.height = _xbHeight + 'px';
    virtualContainer.offsetHeight = _cHeight;
    virtualBody.height = _xbHeight;
  }
});

util.on(document, 'mouseup', function () {
  if (!transable) {
    return;
  }
  transable = false;
});
