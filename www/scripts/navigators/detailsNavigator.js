var config = require("../config");
var $ = require("jquery-browserify");
var navigatorEvents = require("./navigationEvents");
var DetailsNavigator = function() {
    this.grid = [];
    this.coords = { x: 1, y: 0 }
    this.grid[0] = config.globalNav;
    this.grid[1] = [{
        title: "play",
        id: "play"
    }];
    
    navigatorEvents.bindEvents(this);
};

DetailsNavigator.prototype.getActiveItem = function() {
    var activeItem = this.grid[this.coords.x][this.coords.y];
    $(".cursor").removeClass("cursor");
    $("#" + activeItem.id).addClass("cursor");
    return activeItem;
};

DetailsNavigator.prototype.select = function() {
    var activeItem = this.getActiveItem();
    if (this.coords.x === 1) {
        $(document).trigger("play-movie");
    } else {
        window.location.href = activeItem.url;
    }
}
DetailsNavigator.prototype.moveUp = function() {
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
DetailsNavigator.prototype.moveDown = function() {
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
DetailsNavigator.prototype.moveLeft = function() {
    if (this.coords.x === 0) {
        this.coords.x = 1;
        this.coords.y = 0
    } else {
        this.coords.x = 0;
        this.coords.y = this.grid[0].length - 1;
    }
    return this.getActiveItem();
};
DetailsNavigator.prototype.moveRight = function() {
    if (this.coords.x === 0) {
        this.coords.x = 1;
        this.coords.y = 0
    } else {
        this.coords.x = 0;
        this.coords.y = this.grid[0].length - 1;
    }
    return this.getActiveItem();
};

module.exports = DetailsNavigator;