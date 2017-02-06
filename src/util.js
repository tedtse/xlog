var WHITESPACE = '[\\x20\\t\\r\\n\\f]';
var IDENTIFIER = '(?:\\\\.|[\\w-]|[^\0-\\xa0])+';
var ATTRIBUTES = "\\[" + WHITESPACE + "*(" + IDENTIFIER + ")(?:" + WHITESPACE +
		"*([*^$|!~]?=)" + WHITESPACE +
		"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + IDENTIFIER + "))|)" + WHITESPACE +
		"*\\]";
var matchExpr = {
		'ID': new RegExp( '^#(' + IDENTIFIER + ')' ),
		'CLASS': new RegExp( '^\\.(' + IDENTIFIER + ')' ),
		'TAG': new RegExp( '^(' + IDENTIFIER + '|[*])' ),
		'ATTR': new RegExp( '^' + ATTRIBUTES )
};

module.exports = {
  getStyle: function (el, prop) {
    if (el.currentStyle) {
      return el.currentStyle[prop];
    } else {
      return getComputedStyle(el, false)[prop];
    }
  },

  is: function (el, selector) {
    var result = false;
    if (matchExpr.ID.test(selector)) {
      selector = selector.replace(/^#/, '');
      var patt = new RegExp(selector);
      result = patt.test(el.id);
    } else if (matchExpr.CLASS.test(selector)) {
      selector = selector.replace(/^\./, '');
      var patt = new RegExp(selector);
      result = patt.test(el.className);
    } else if (matchExpr.TAG.test(selector)) {
      var match = el.nodeName.match(matchExpr.TAG);
      if (match && match[1].toLowerCase() === selector.toLowerCase()) {
        result = true;
      }
    }
    return result;
  },

  closest: function (el, selector) {
    var pNode = el.parentNode;
    while (pNode) {
      if (this.is(pNode, selector)) {
        return pNode;
      } else {
        pNode = pNode.parentNode;
      }
    }
    return null;
  },

  trim: function (str) {
    return str.replace(/^\s*|\s*$/, '');
  },

  outWidth: function (el) {
    return el.offsetWidth + parseFloat(this.getStyle(el, 'paddingLeft')) + parseFloat(this.getStyle(el, 'paddingRight'));
  },

  outHeight: function (el) {
    return el.offsetHeight + parseFloat(this.getStyle(el, 'paddingTop')) + parseFloat(this.getStyle(el, 'paddingBottom'));
  },

  addClass: function (el, className) {
    if (el.classList) {
      return el.classList.add(className);
    }
    var _className = el.className;
		var arr = className.split(' ');
		_className = this.trim(_className);
		for (var i = arr.length; i--;) {
			arr[i] = this.trim(arr[i]);
			var patt = new RegExp('^' + arr[i] + WHITESPACE + '*|' + WHITESPACE + '+' +arr[i] + WHITESPACE + '+|' + WHITESPACE + '*' + arr[i] + '$');
			if (!patt.test(_className)) {
				_className += ' ' + arr[i];
			}
		}
    el.className = this.trim(_className);
  },

  removeClass: function (el, className) {
    if (el.classList) {
      return el.classList.remove(className);
    }
    var _className = el.className;
		var arr = className.split(' ');
		_className = this.trim(_className);
		for (var i = arr.length; i--;) {
			arr[i] = this.trim(arr[i]);
			var patt1 = new RegExp('^' + '(' + arr[i] + WHITESPACE + '*)');
			var patt2 = new RegExp(WHITESPACE + '+' + '(' + arr[i] + WHITESPACE + '+)');
			var patt3 = new RegExp('(' + WHITESPACE + '*' + arr[i] + ')$');
			var result1 = _className.match(patt1);
			var result2 = _className.match(patt2);
			if (/\s/.test(_className)) {
				var result3 = _className.match(patt3);
			}
			if (result1) {
				_className = _className.replace(result1[1], '');
			}
			if (result2) {
				_className = _className.replace(result2[1], '');
			}
			if (result3) {
				_className = _className.replace(result3[1], '');
			}
		}
		el.className = _className;
  },

  on: function () {
    var args = arguments;
    var el, evt, selector, handler, _handler;
    if (args.length === 3) {
      el = args[0];
      evt = args[1];
      handler = args[2];
      _handler = handler;
    } else if (args.length === 4) {
      el = args[0];
      evt = args[1];
      selector = args[2];
      handler = args[3];
      var that = this;
      var _handler = function (evt) {
        var e = evt || event;
        var target = e.target || e.srcElement;
        while (target) {
          if (that.is(target, selector)) {
            handler(evt);
            break;
          }
          target = target.parentNode;
        }
      };
    }
    el.addEventListener ? el.addEventListener(evt, _handler, false) : el.attachEvent('on' + evt, _handler);
  },

  off: function (node, evt, handler) {
    el.removeEventListener ? el.removeEventListener(evt, handler, false) : el.detachEvent('on' + evt, handler);
  },
  
  extend: function (target, options) {
    for (name in options) {
      target[name] = options[name];
    }
    return target;
  },

  htmlEncode: function (str) {
    var arr = [];
    if (typeof str !== 'string') {
      return str;
    }
    if (str === null || str === '') {
      return str;
    }
    for (var i = 0, j = str.length; i < j; i++) {
      var c = str.charAt(i);
      switch (c) {
        case '&':
          arr.push('&amp;');
          break;
        case '<':
          arr.push('&lt;');
          break;
        case '>':
          arr.push('&gt;');
          break;
        case '"':
          arr.push('&quot;');
          break;
        case ' ':
          arr.push('&nbsp;');
          break;
        default:
          arr.push(c);
          break;
      }
    }
    return arr.join('');
  }
}