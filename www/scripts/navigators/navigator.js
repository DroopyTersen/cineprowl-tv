var navigatorEvents = require("./navigationEvents");

var Navigator = function() {
    this.grid  = []; 
    this.coords = { x: 0, y: 0};
    
    navigatorEvents.bindEvents(this);
};

Navigator.prototype.getActiveItem = function() {
    var activeItem = this.grid[this.coords.x][this.coords.y];
    $(".cursor").removeClass("cursor");
    $("#" + activeItem.id).addClass("cursor");
    return activeItem;
};
Navigator.prototype.select = function() {
    var activeItem = this.getActiveItem();
    if (activeItem.event) {
        $(document).trigger(activeItem.event);
    } else if (activeItem.url) {
        window.location.href = activeItem.url;
    }
};

Navigator.prototype.moveUp = function() {
    //There is only one item in that column
    if (this.grid[this.coords.x].length === 1) {
        return this.getActiveItem();
    }
    // Its at the top
    if (this.coords.y === 0) {
        this.coords.y = this.grid[this.coords.x].length - 1;
    } else {
        this.coords.y = this.coords.y - 1;
    }
    return this.getActiveItem();
};
Navigator.prototype.moveDown = function() {
    //There is only one item in that column
    if (this.grid[this.coords.x].length === 1) {
        return this.getActiveItem();
    }
    // Its at the bottom
    if (this.coords.y === this.grid[this.coords.x].length - 1) {
        this.coords.y = 0;
    } else {
        this.coords.y = this.coords.y + 1;
    }
    return this.getActiveItem();
};
Navigator.prototype.moveLeft = function() {
    //It's already on the far left
    if (this.coords.x === 0) {
        this.coords.x = this.grid.length - 1;
    } else {
        this.coords.x = this.coords.x - 1;
    }
    
    //Take the closest y value
    if (!this.grid[this.coords.x][this.coords.y]) {
        this.coords.y = this.grid[this.coords.x].length - 1;
    }
    return this.getActiveItem();
};
Navigator.prototype.moveRight = function() {
    //It's already on the far right
    if (this.coords.x === this.grid.length - 1) {
        this.coords.x = 0;
    } else {
        this.coords.x = this.coords.x + 1;
    }
    
    //take the closest y value
    if (!this.grid[this.coords.x][this.coords.y]) {
        this.coords.y = this.grid[this.coords.x].length - 1;
    }
    return this.getActiveItem();
};

Navigator.prototype.appendColumn = function(row) {
    this.grid.push(row);
};
Navigator.prototype.prependColumn = function(row) {
    this.grid.unshift(row);
};
Navigator.prototype.prependRow = function(row, startingColumn) {
    var self = this;
    var startColumn = startingColumn || 0;
    row.forEach(function(item, index){
        //there is already a column
        if (self.grid[index + startColumn]) {
            self.grid[index + startColumn].unshift(item);
        }
        //no column, create it with a single item array
        else {
            self.grid[index + startColumn] = [item];
        }
    })
}
Navigator.prototype.appendRow = function(row, startingColumn) {
    var self = this;
    var startColumn = startingColumn || 0;
    row.forEach(function(item, index){
        
        if (self.grid[index + startColumn]) {
            self.grid[index + startColumn].push(item);
        }
        //there is not a column so create it and add the item
        else {
             self.grid[index + startColumn] = [item];
        }
    });
};

module.exports = Navigator;