var util = require('../util');
var dom = require('../dom');
var virtualCache = require('../virtual-dom/virtual-cache');

util.on(dom.cleanButton, 'click', function () {
  dom.clean();
  virtualCache.entity.clean();
});