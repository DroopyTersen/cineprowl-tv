var config = require("../config");
var $ = require("jquery-browserify");
var Navigator = require("./baseNavigator");

var GridNavigator = function() {
    Navigator.call(this);
    this.coords = { x: 2, y: 0 }
};

GridNavigator.prototype = Navigator.prototype;

GridNavigator.prototype.fillGrid = function(startColumn, items) {
    this.appendRow(items.slice(0,5), startColumn);
    this.appendRow(items.slice(5,10), startColumn);
}

GridNavigator.prototype.populate = function(items, pageLeft, pageRight) {
    this.grid = [];
    this.grid[0] = config.globalNav;
    if (pageLeft) {
        this.grid[1] = [{ id: "page-left", event: "page-left" }];
        this.fillGrid(2, items);
        this.coords.x = items.length ? 2 : 1;
    } else {
        this.fillGrid(1, items);
        this.coords.x = items.length ? 1 : 0;
    }
    
    if (pageRight) {
        this.appendColumn([{ id: "page-right", event: "page-right" }]);
    }
    return this.getActiveItem();
};

module.exports = GridNavigator;