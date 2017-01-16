var VirtualRoot = require('./virtual-root');
var VirtualEntiny = require('./virtual-entity');

var virtualRoot = new VirtualRoot();
var virtualEntiny = new VirtualEntiny();

virtualRoot.appendChild(virtualEntiny);
// console.log(virtualRoot);
module.exports = virtualRoot;