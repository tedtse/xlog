var util = require('../util');
var dom = require('../dom');
var setting = require('../setting');

util.on(document, 'keydown', function (evt) {
  var e = evt || event;
  var keyCode = e.keyCode;
  if (keyCode === setting.launchKey) {
    util.getStyle(dom.container, 'display') === 'none' ? dom.show() : dom.hide();
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

util.on(dom.closeButton, 'click', function () {
  dom.hide();
});