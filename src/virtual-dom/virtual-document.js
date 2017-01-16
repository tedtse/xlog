var dom = require('../dom');
var VirtualContainer = require('./virtual-container');
var VirtualDropbar = require('./virtual-dropbar');
var VirtualEntiny = require('./virtual-entity');
var virtualCache = require('./virtual-cache');

var virtualContainer = new VirtualContainer();
var virtualDropbar = new VirtualDropbar();
var virtualEntiny = new VirtualEntiny();
virtualContainer.map(dom.container);
virtualDropbar.map(dom.dropbar);
virtualEntiny.map(dom.entity);
virtualContainer.appendChild(virtualDropbar, virtualEntiny);

virtualCache.container = virtualContainer;
virtualCache.dropbar = virtualDropbar;
virtualCache.entity = virtualEntiny;

console.log(virtualContainer);