var util = require('../util');
var dom = require('../dom');

var container = dom.container;
var titlebar = dom.titlebar;
var virtualCache = require('../virtual-dom/virtual-cache');
var virtualContainer = virtualCache.container;
var movable = false;
var winWidth = document.documentElement.clientWidth;
var winHeight = document.documentElement.clientHeight;
var initX, initY, initOffsetLeft, initOffsetTop, lastX, lastY;

util.on(titlebar, 'mousedown', function (evt) {
  var e = evt || event;
  initX = e.clientX;
  initY = e.clientY;
  initOffsetLeft = virtualContainer.offsetLeft - virtualContainer.marginLeft;
  initOffsetTop = virtualContainer.offsetTop;
  movable = true;
});

util.on(document, 'mousemove', function (evt) {
  var e = evt || event;
  if (!movable) {
      return;
  }
  lastX = initOffsetLeft + e.clientX - initX;
  lastY = initOffsetTop + e.clientY - initY;
  lastX = Math.min(winWidth - virtualContainer.marginLeft - virtualContainer.offsetWidth, Math.max(-virtualContainer.marginLeft, lastX));
  lastY = Math.min(winHeight - virtualContainer.offsetHeight, Math.max(0, lastY));
  container.style.left = lastX + 'px';
  container.style.top = lastY + 'px';
});

util.on(document, 'mouseup', function () {
  if (!movable) {
      return;
  }
  movable = false;
  virtualContainer.offsetLeft = lastX + virtualContainer.marginLeft;
  virtualContainer.offsetTop = lastY;
});
