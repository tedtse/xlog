var util = require('../util');
var dom = require('../dom');

util.on(dom.cleanButton, 'click', function () {
  dom.clean();
});