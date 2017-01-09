var util = require('../util');
var dom = require('../dom');

var container = dom.container;
var xHead = dom.head;
var movable = false;
var winHeight = document.documentElement.clientHeight;
var initX, initY, initOffsetLeft, initOffsetTop;

util.on(xHead, 'mousedown', function (evt) {
  var e = evt || event;
  initX = e.clientX;
  initY = e.clientY;
  initOffsetLeft = dom.offsetLeft - dom.marginLeft;
  initOffsetTop = dom.offsetTop;
  movable = true;
});

util.on(document, 'mousemove', function (evt) {
  var e = evt || event;
  if (!movable) {
      return;
  }
  var x = initOffsetLeft + e.clientX - initX;
  var y = initOffsetTop + e.clientY - initY;
  y = Math.min(winHeight - container.offsetHeight, Math.max(0, y));
  container.style.left = x + 'px';
  container.style.top = y + 'px';
});

util.on(document, 'mouseup', function (evt) {
  var e = evt || event;
  movable = false;
});
