var util = require('../util');
var dom = require('../dom');
var Bus = require('../bus');
var setting = require('../setting');
var virtualCache = require('../virtual-dom/virtual-cache');
var virtualContainer = virtualCache.container;

var _show = function () {
  dom.show();
  virtualContainer.display = 'show';
  Bus.dispatch('CONTAINER_SHOW');
};

var _hide = function () {
  dom.hide();
  virtualContainer.display = 'hidden';
};

if (setting.display) {
  _show();
}

util.on(document, 'keydown', function (evt) {
  var e = evt || event;
  var keyCode = e.keyCode;
  if (keyCode === setting.launchDirect) {
    if (virtualContainer.display === 'hidden') {
      _show();
    } else {
      _hide();
    }
  }
  if (keyCode === 123) {
    if (e.preventDefault){  
      e.preventDefault();  
    }  
    else{  
       e.returnValue = false;  
    }  
  }
});

util.on(dom.closeButton, 'click', _hide);