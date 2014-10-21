var config = require("../config");
var templater = require("../services/templater");

var globalNavViewModel = function() {
    
    var items = config.globalNav;
    var init = function() {
        templater.bindElement(items, "globalnav", $("#globalnav")[0]);
    }

    return {
        init: init,
        items: items
    };
};

module.exports = globalNavViewModel();