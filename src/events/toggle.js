var util = require('../util');
var dom = require('../dom');
var setting = require('../setting');
var State = require('../state');

util.on(document, 'keydown', function (evt) {
  var e = evt || event;
  var keyCode = e.keyCode;
  if (keyCode === setting.launchKey) {
    if (State.containerDisplay === 'hidden') {
      dom.show();
      State.containerDisplay = 'show';
    } else {
      dom.hide();
      State.containerDisplay = 'hidden';
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

util.on(dom.closeButton, 'click', function () {
  dom.hide();
  State.containerDisplay = 'hidden';
});