var util = require('../util');
var dom = require('../dom');

var container = dom.container;
var titlebar = dom.titlebar;
var virtualCache = require('../virtual-dom/virtual-cache');
var vritualContainer = virtualCache.container;
var movable = false;
// var winWidth = document.documentElement.clientWidth;
var winHeight = document.documentElement.clientHeight;
var initX, initY, initOffsetLeft, initOffsetTop, lastX, lastY;

util.on(titlebar, 'mousedown', function (evt) {
  var e = evt || event;
  initX = e.clientX;
  initY = e.clientY;
  initOffsetLeft = vritualContainer.offsetLeft - vritualContainer.marginLeft;
  initOffsetTop = vritualContainer.offsetTop;
  movable = true;
});

util.on(document, 'mousemove', function (evt) {
  var e = evt || event;
  if (!movable) {
      return;
  }
  lastX = initOffsetLeft + e.clientX - initX;
  lastY = initOffsetTop + e.clientY - initY;
  // x = Math.min(winWidth - container.offsetWidth, Math.max(0, x));
  lastY = Math.min(winHeight - container.offsetHeight, Math.max(0, lastY));
  container.style.left = lastX + 'px';
  container.style.top = lastY + 'px';
});

util.on(document, 'mouseup', function () {
  movable = false;
  vritualContainer.offsetLeft = lastX + vritualContainer.marginLeft;
  vritualContainer.offsetTop = lastY;
});
