
var ModuleA = require('./modules/ModuleA.js');

module.exports = {
    getHtml: function() {
        return ModuleA.getHtml();
    }
}