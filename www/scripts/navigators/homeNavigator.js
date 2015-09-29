var config = require("../config");
var $ = require("jquery-browserify");
var Navigator = require("./baseNavigator");
var HomeNavigator = function() {
    Navigator.call(this);
    this.coords = { x: 2, y: 0 };
    this.grid[0] = [{ id: "back-button", event: "navigate-back", title: "", name: "" }];

    this.grid[1] = config.globalNav;
    this.grid[2] = [{
        title: "Search",
        id: "home-search",
        event: "search-movies"
    }];
};

HomeNavigator.prototype = Navigator.prototype;

//Override default one so you can focus the search box
HomeNavigator.prototype.getActiveItem = function() {
    var activeItem = this.grid[this.coords.x][this.coords.y];
    $(".cursor").removeClass("cursor");
    $("#" + activeItem.id).addClass("cursor");
    //focus on the seach box
    if (this.coords.x === 2) {
        $("#searchInput").focus();
    } else {
        $("#searchInput").blur();
    }
    return activeItem;
};



module.exports = HomeNavigator;