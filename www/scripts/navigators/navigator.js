var config = require("../config");

var Navigator = function(startingGrid) {
    this.grid  = []; 
    this.coords = { x: 0, y: 0};
    if (!startingGrid) {
        this.prependColumn(config.globalNav);
    }
};

Navigator.prototype.appendColumn = function(row) {
    this.grid.push(row);
};

Navigator.prototype.prependColumn = function(row) {
    this.grid.unshift(row);
};

Navigator.prototype.prependRow = function(column, startingRow) {
    var self = this;
    var startRow = startingRow || 0;
    column.forEach(function(item, index){
        //there is already a column
        if (self.grid[index + startRow]) {
            self.grid[index + startRow].unshift(item);
        }
        //no column, create it with a single item array
        else {
            self.grid[index + startRow] = [item];
        }
    })
}

Navigator.prototype.appendRow = function(column, startingRow) {
    var self = this;
    var startRow = startingRow || 0;
    column.forEach(function(item, index){
        if (self.grid[index + startRow]) {
            self.grid[index + startRow].push(item);
        }
        //there is not a column so create it and add the item
        else {
             self.grid[index + startRow] = [item];
        }
    })
};

Navigator.prototype.getActiveItem = function() {
    return this.grid[this.coords.x][this.coords.y] || null;
};

Navigator.prototype.moveUp = function() {
    // //there is a row above it
    // if (this.coords.y > 0) {
    //     //there is a matching column in that row
    //     if(this.grid[])
    // }
    // //there is not a row above it, move to the bottom
    // else {
    //     this.coords.y = 
    // }
    // if (this.grid[this.coords.x][this.coords.y - 1]) {
    //     this.coords.y = this.coords.y - 1;
    //     //if the old y value is 
    //     this.coords.y = this.grid[this.coords.x].length - 1;
    // }
}

module.exports = Navigator;