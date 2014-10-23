var config = require("../config");
var $ = require("jquery-browserify");
var Navigator = require("./navigator");

var MoviesNavigator = function(tenMovies, pageLeft, pageRight) {
    Navigator.call(this);
    this.coords = { x: 2, y: 0 }
};

MoviesNavigator.prototype = Navigator.prototype;

MoviesNavigator.prototype.fillMovies = function(startColumn, movies) {
    this.appendRow(movies.slice(0,5), startColumn);
    this.appendRow(movies.slice(5,10), startColumn);
}

MoviesNavigator.prototype.populate = function(movies, pageLeft, pageRight) {
    this.grid = [];
    this.grid[0] = config.globalNav;
    if (pageLeft) {
        this.grid[1] = [{ id: "page-left", event: "page-left" }];
        this.fillMovies(2, movies);
        this.coords.x = movies.length ? 2 : 1;
    } else {
        this.fillMovies(1, movies);
        this.coords.x = movies.length ? 1 : 0;
    }
    
    if (pageRight) {
        this.appendColumn([{ id: "page-right", event: "page-right" }]);
    }
    return this.getActiveItem();
};

module.exports = MoviesNavigator;