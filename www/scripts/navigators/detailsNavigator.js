var config = require("../config");
var $ = require("jquery-browserify");
var Navigator = require("./baseNavigator");

var DetailsNavigator = function() {
    Navigator.call(this);
    this.coords = { x: 0, y: 0 };
};

DetailsNavigator.prototype = Object.create(Navigator.prototype);
DetailsNavigator.prototype.populate = function(cast) {
    this.grid[0] = [{ id: "back-button", event: "navigate-back", title: "", name: "" }];
    this.grid[1] = config.globalNav;
    this.appendRow(cast, 2);
    
    this.grid[6] = [{
        title: "play-vlc",
        id: "play-vlc",
        event: "play-movie-vlc"
    }];
    this.grid[7] =[{
        title: "play-trailer",
        id: "play-trailer",
        event: "play-movie-trailer"
    }];
    this.coords.x = 6;
};
module.exports = DetailsNavigator;