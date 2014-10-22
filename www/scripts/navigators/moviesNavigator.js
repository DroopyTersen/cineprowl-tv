var config = require("../config");
var $ = require("jquery-browserify");
var navigatorEvents = require("./navigationEvents");

var MoviesNavigator = function(tenMovies, pageLeft, pageRight) {
    this.grid = [];
    this.coords = { x: 2, y: 0 }

    navigatorEvents.bindEvents(this);
};

MoviesNavigator.prototype.fillMovies = function(startColumn, movies) {
    for (var i = 0; i < 5; i++) {
        var column = [];
        if (movies[i]) {
            column.push(movies[i]);
            if (movies[i + 5]) {
                column.push(movies[i + 5]);
            }
            this.grid[startColumn + i] = column;
        }
    }
}

MoviesNavigator.prototype.populate = function(tenMovies, pageLeft, pageRight) {
    this.grid = [];
    this.grid[0] = config.globalNav;
    console.log(pageLeft);
    if (pageLeft) {
        this.grid[1] = [{ id: "page-left" }];
        this.fillMovies(2, tenMovies);
        this.coords.x = 2;
    } else {
        this.fillMovies(1, tenMovies);
        this.coords.x = 1;
    }
    
    if (pageRight) {
        this.grid[this.grid.length] = [{ id: "page-right" }];
    }
    return this.getActiveItem();
}

MoviesNavigator.prototype.getActiveItem = function() {
    var activeItem = this.grid[this.coords.x][this.coords.y];
    $(".cursor").removeClass("cursor");
    $("#" + activeItem.id).addClass("cursor");
    return activeItem;
};

MoviesNavigator.prototype.moveDown = function() {
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

MoviesNavigator.prototype.moveUp = function() {
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

MoviesNavigator.prototype.moveLeft = function() {
    //Its on the far left
    if (this.coords.x === 0) {
        this.coords.x = this.grid.length - 1;
    } else {
        this.coords.x = this.coords.x - 1;
    }
    
    //take the closest y value
    if (!this.grid[this.coords.x][this.coords.y]) {
        this.coords.y = this.grid[this.coords.x].length - 1;
    }
    return this.getActiveItem();
};
MoviesNavigator.prototype.moveRight = function() {
    //Its on the far left
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

MoviesNavigator.prototype.select = function() {
    var activeItem = this.getActiveItem();
    if (activeItem.id === "page-left") {
        $(document).trigger("page-left");
    } else if (activeItem.id === "page-right") {
        $(document).trigger("page-right");
    } else {
        window.location.href = activeItem.url;
    }
}

module.exports = MoviesNavigator;