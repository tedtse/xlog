var util = require('../util');
var dom = require('../dom');

var container = dom.container;
var titlebar = dom.titlebar;
var virtualCache = require('../virtual-dom/virtual-cache');
var virtualContainer = virtualCache.container;
var movable = false;
var winWidth = document.documentElement.clientWidth;
var winHeight = document.documentElement.clientHeight;
var initX, initY, initLeft, initTop, lastX, lastY;

util.on(titlebar, 'mousedown', function (evt) {
  var e = evt || window.event;
  initX = e.clientX;
  initY = e.clientY;
  initLeft = virtualContainer.left;
  initTop = virtualContainer.top;
  movable = true;
});

util.on(document, 'mousemove', function (evt) {
  var e = evt || window.event;
  if (!movable) {
      return;
  }
  lastX = initLeft + e.clientX - initX;
  lastY = initTop + e.clientY - initY;
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
  virtualContainer.left = lastX;
  virtualContainer.top = lastY;
});
