var config = require("../config");
var $ = require("jquery-browserify");
var Navigator = require("./baseNavigator");

var DetailsNavigator = function() {
    Navigator.call(this);
    this.coords = { x: 1, y: 0 }
    this.grid[0] = config.globalNav;
    this.grid[1] = [{
        title: "play",
        id: "play",
        event: "play-movie"
    }];
};

DetailsNavigator.prototype = Navigator.prototype;
module.exports = DetailsNavigator;