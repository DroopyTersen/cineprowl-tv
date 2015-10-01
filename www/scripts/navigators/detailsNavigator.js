var config = require("../config");
var $ = require("jquery-browserify");
var Navigator = require("./baseNavigator");

var DetailsNavigator = function() {
    Navigator.call(this);
    this.coords = { x: 2, y: 0 };
    this.grid[0] = [{ id: "back-button", event: "navigate-back", title: "", name: "" }];
    this.grid[1] = config.globalNav;
    this.grid[2] = [{
        title: "play-vlc",
        id: "play-vlc",
        event: "play-movie-vlc"
    }];
    this.grid[3] =[{
        title: "play-trailer",
        id: "play-trailer",
        event: "play-movie-trailer"
    }];
};

DetailsNavigator.prototype = Navigator.prototype;
module.exports = DetailsNavigator;