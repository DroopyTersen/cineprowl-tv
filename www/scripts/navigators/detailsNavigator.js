var config = require("../config");
var $ = require("jquery-browserify");
var Navigator = require("./baseNavigator");

var DetailsNavigator = function() {
    Navigator.call(this);
    this.coords = { x: 1, y: 0 }
    this.grid[0] = config.globalNav;
    this.grid[1] = [{
        title: "play-raw",
        id: "play-raw",
        event: "play-movie-raw"
    }];
    this.grid[2] =[{
        title: "play-mobile",
        id: "play-mobile",
        event: "play-movie-mobile"
    }];
};

DetailsNavigator.prototype = Navigator.prototype;
module.exports = DetailsNavigator;