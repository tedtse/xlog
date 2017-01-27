var util = require('../util');
var dom = require('../dom');
var Bus = require('../bus');
var container = dom.container;
var body = dom.body;
var dropbar = dom.dropbar;
var filterButton = dom.filterButton;
var virtualCache = require('../virtual-dom/virtual-cache');
var virtualContainer = virtualCache.container;
var virtualBody = virtualCache.body;
var virtualDropbar = virtualCache.dropbar;
var virtualEntity = virtualCache.entity;

var map = {
  'all': 'xlog-filter-all',
  'error': 'xlog-filter-error',
  'warn': 'xlog-filter-warn',
  'info': 'xlog-filter-info',
  'log': 'xlog-filter-log',
  'debug': 'xlog-filter-debug'
};

var findKey = function (role) {
  var result = null;
  for (var key in map) {
    if (map[key] === role) {
      result = key;
    }
  }
  return result;
};

var checkEveryOne = function (level) {
  virtualEntity.eachChild(function (child) {
    if (level === 'all' || child.level === level) {
      if (child.display === 'hidden') {
        child.nativeElement.style.display = 'block';
        child.display = 'show';
      }
      return;
    }
    if (child.level !== level) {
      if (child.display === 'show') {
        child.nativeElement.style.display = 'none';
        child.display = 'hidden';
      }
    }
  });
}

util.on(filterButton, 'click', function () {
  var bHeight;
  if (virtualDropbar.display === 'hidden') {
    dropbar.style.display = "block";
    util.addClass(filterButton, 'active');
    Bus.dispatch('DROPBAR_SHOW');
    bHeight = virtualBody.offsetHeight - virtualDropbar.offsetHeight;
    body.style.height = bHeight + 'px';
    virtualBody.offsetHeight = bHeight;
    virtualDropbar.display = 'show';
  } else {
    dropbar.style.display = "none";
    util.removeClass(filterButton, 'active');
    bHeight = virtualBody.offsetHeight + virtualDropbar.offsetHeight;
    body.style.height = bHeight + 'px';
    virtualBody.offsetHeight = bHeight;
    virtualDropbar.offsetHeight = 0;
    virtualDropbar.display = 'hidden';
  }
});

util.on(dropbar, 'click', 'a', function (evt) {
  var e = evt || event;
  var target = e.target || e.srcElement;
  var role = target.getAttribute('role');
  var selected = findKey(role);
  if (selected === virtualDropbar.filterSelected) {
    return;
  }
  util.removeClass(dropbar.querySelector('[role="' + map[virtualDropbar.filterSelected] + '"]'), 'selected');
  util.addClass(dropbar.querySelector('[role="' + role + '"]'), 'selected');
  virtualDropbar.filterSelected = selected;
  checkEveryOne(selected);
});