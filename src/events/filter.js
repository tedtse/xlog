var util = require('../util');
var dom = require('../dom');
var State = require('../state');

var entity = dom.entity;
var dropBar = dom.dropBar;
var filterButton = dom.filterButton;

var map = {
  'all': 'xlog-filter-all',
  'error': 'xlog-filter-error',
  'warn': 'xlog-filter-warn',
  'info': 'xlog-filter-info',
  'log': 'xlog-filter-log'
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

util.on(filterButton, 'click', function () {
  if (State.dropbarDisplay === 'hidden') {
    dropBar.style.display = "block";
    util.addClass(filterButton, 'active');
    State.dropbarDisplay = 'show';
  } else {
    dropBar.style.display = "none";
    util.removeClass(filterButton, 'active');
    State.dropbarDisplay = 'hidden';
  }
});

util.on(dropBar, 'click', 'a', function (evt) {
  var e = evt || event;
  var target = e.target || e.srcElement;
  var role = target.getAttribute('role');
  var selected = findKey(role);
  if (selected === State.filterSelected) {
    return;
  }
  util.removeClass(dropBar.querySelector('[role="' + map[State.filterSelected] + '"]'), 'selected');
  util.addClass(dropBar.querySelector('[role="' + role + '"]'), 'selected');
  State.filterSelected = selected;
  dom.filter(selected);
});