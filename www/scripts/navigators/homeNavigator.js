var config = require("../config");
var $ = require("jquery-browserify");
var navigatorEvents = require("./navigationEvents");
var HomeNavigator = function() {
    this.grid = [];
    this.coords = { x: 1, y: 0 }
    this.grid[0] = config.globalNav;
    this.grid[1] = [{
        title: "Search",
        id: "home-search"
    }];
    
    navigatorEvents.bindEvents(this);
};

HomeNavigator.prototype.getActiveItem = function() {
    var activeItem = this.grid[this.coords.x][this.coords.y];
    $(".cursor").removeClass("cursor");
    $("#" + activeItem.id).addClass("cursor");
    //focus on the seach box
    if (this.coords.x === 1) {
        $("#searchInput").focus();
    } else {
        $("#searchInput").blur();
    }
    return activeItem;
};

HomeNavigator.prototype.select = function() {
    var activeItem = this.getActiveItem();
    if (this.coords.x === 1) {
        window.location.href = config.apiUrl + "/movies/search/" + $("#searchInput").val();
    } else {
        window.location.href = activeItem.url;
    }
    //return this.getActiveItem();
}
HomeNavigator.prototype.moveUp = function() {
    if (this.coords.x === 0) {
        //Its at the top already
        if (this.coords.y === 0) {
            this.coords.y = this.grid[0].length - 1;
            
        } else {
            this.coords.y = this.coords.y - 1;
        }
    }
    return this.getActiveItem();
};
HomeNavigator.prototype.moveDown = function() {
    if (this.coords.x === 0) {
        //its at the bottom already
        if (this.coords.y === this.grid[0].length - 1) {
            this.coords.y = 0;
            
        } else {
            this.coords.y = this.coords.y + 1;
        }
    }
    return this.getActiveItem();
};
HomeNavigator.prototype.moveLeft = function() {
    if (this.coords.x === 0) {
        this.coords.x = 1;
        this.coords.y = 0
    } else {
        this.coords.x = 0;
        this.coords.y = this.grid[0].length - 1;
    }
    return this.getActiveItem();
};
HomeNavigator.prototype.moveRight = function() {
    if (this.coords.x === 0) {
        this.coords.x = 1;
        this.coords.y = 0
    } else {
        this.coords.x = 0;
        this.coords.y = this.grid[0].length - 1;
    }
    return this.getActiveItem();
};

module.exports = HomeNavigator;