var dom = require('../dom');
var Bus = require('../bus');
var VirtualContainer = require('./virtual-container');
var VirtualHead = require('./virtual-head');
var VirtualDropbar = require('./virtual-dropbar');
var VirtualBody = require('./virtual-body');
var VirtualEntiny = require('./virtual-entity');
var virtualCache = require('./virtual-cache');

var virtualContainer = new VirtualContainer();
var virtualHead = new VirtualHead();
var virtualDropbar = new VirtualDropbar();
var virtualBody = new VirtualBody();
var virtualEntiny = new VirtualEntiny();
virtualContainer.map(dom.container);
virtualHead.map(dom.head);
virtualDropbar.map(dom.dropbar);
virtualBody.map(dom.body);
virtualEntiny.map(dom.entity);
virtualContainer.appendChild(virtualHead, virtualBody);
virtualHead.appendChild(virtualDropbar);
virtualBody.appendChild(virtualEntiny);

virtualCache.container = virtualContainer;
virtualCache.head = virtualHead;
virtualCache.dropbar = virtualDropbar;
virtualCache.body = virtualBody;
virtualCache.entity = virtualEntiny;

Bus.once('CONTAINER_SHOW', function () {
  virtualContainer.syncProperty('offsetWidth', 'offsetHeight');
  virtualContainer.syncStyle('marginLeft', 'left', 'top');
  virtualHead.syncProperty('offsetHeight');
  virtualBody.syncStyle('paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft', 'height');
});
Bus.on('DROPBAR_SHOW', function () {
  virtualDropbar.syncProperty('offsetHeight');
});

window.__container__ = virtualContainer;