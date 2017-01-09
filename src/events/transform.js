var util = require('../util');
var dom = require('../dom');

var container = dom.container;
var xHead = dom.head;
var xBody = dom.body;
var dragable = false;
var transable = false;
var threshold = 10;
var headHeight;
var initX, initY, moveX, moveY, initOffsetWidth, initOffsetHeight, initOffsetLeft, initOffsetTop, resizePos;

util.on(document, 'mousemove', function (evt) {
  var e = evt || event;
  moveX = e.clientX;
  moveY = e.clientY;
  initOffsetLeft = container.offsetLeft;
  initOffsetTop = container.offsetTop;
  initOffsetWidth = container.offsetWidth;
  initOffsetHeight = container.offsetHeight;
  if (Math.abs(initOffsetLeft + initOffsetWidth - moveX) <= threshold) {
    container.style.cursor = 'e-resize';
    resizePos = 'e';
    dragable = true;
  } else if (Math.abs(initOffsetLeft - moveX) <= threshold) {
    container.style.cursor = 'w-resize';
    resizePos = 'w';
    dragable = true;
  } else if (Math.abs(initOffsetTop + initOffsetHeight - moveY) <= threshold) {
    container.style.cursor = 's-resize';
    resizePos = 's';
    dragable = true;
  } else {
    container.style.cursor = 'default';
    dragable = false;
  }

  if (!transable) {
    return;
  }

  if (resizePos === 'e') {
    var _width = dom.offsetWidth + moveX - initX;
    container.style.width = _width + 'px';
  }
  if (resizePos === 'w') {
    var deltaX = moveX - initX;
    var _width = dom.offsetWidth - deltaX;
    var _left = dom.offsetLeft + deltaX - dom.marginLeft;
    container.style.width = _width + 'px';
    container.style.left = _left + 'px';
  }
  if (resizePos === 's') {
    var _cHeight = dom.offsetHeight + moveY - initY;
    if (headHeight === undefined) {
      headHeight = xHead.offsetHeight;
    }
    var _xbHeight = _cHeight - headHeight - parseFloat(util.getStyle(xBody, 'paddingTop')) - parseFloat(util.getStyle(xBody, 'paddingBottom'));
    container.style.height = _cHeight + 'px';
    xBody.style.height = _xbHeight + 'px';
  }
});

util.on(container, 'mouseout', function (evt) {
  var e = evt || event;
  container.style.cursor = 'default';
});

util.on(container, 'mousedown', function (evt) {
  var e = evt || event;
  if (!dragable) {
      return;
  }
  transable = true;
  initX = e.clientX;
  initY = e.clientY;
});

util.on(document, 'mouseup', function () {
  transable = false;
  dom.offsetWidth = container.offsetWidth;
  dom.offsetHeight = container.offsetHeight;
  dom.offsetLeft = container.offsetLeft;
  dom.offsetTop = container.offsetTop;
});
