var dataservice = require("../services/dataservice");
var GridViewModel = require("./gridViewModel");
var qs = require("querystring");
var ko = require("knockout");

var MoviesViewModel = function() {
    var self = this;
    GridViewModel.call(this);
    self.collection = "movies";
    
    //Additional page context
    self.context.sort = ko.observable("addedToDb");
    self.context.filter = ko.observable({});
    self.context.search = ko.observable("");
    self.context.toString = ko.computed(function() {
        var items = [];

        if (self.context.filter && self.context.filter() && self.context.filter().watched === false) {
            items.push("unwatched");
        }
        if (self.context.filter && self.context.filter() && self.context.filter().genre) {
            items.push(self.context.filter().genre);
        }
        if (self.context.search && self.context.search()) {
            items.push("'" + self.context.search() + "'");
        }
        return "Showing " + items.join(", ") + " movies";
    }, self);

    var processQueryString = function() {
        var params = qs.parse(window.location.search.substring(1));
        if (params.search) {
            self.context.search(params.search);
        }
        if (typeof params.watched !== 'undefined') {
            self.context.filter({
                watched: (params.watched === "true")
            });
        }
        if (typeof params.genre !== 'undefined') {
            var filter = self.context.filter();
            filter.genre = params.genre;
            self.context.filter(filter);
        }
    };

    //smoothly handle background image changing
    this.eventHandlers.navigationMove = function() {
        $(".background.backdrop").fadeOut(function(){
            $(".background.backdrop").remove();
            self.activeItem(self.navigator.getActiveItem());
            var $img = $("<img style='display:none' class='background backdrop' />")
                .load(function(){
                    $(".background.backdrop").fadeIn();
                })
                .attr('src',  self.selectedItem().backdrop);  
            $("#backgrounds").append($img);
        });
    };
    
    processQueryString();
    this.init();
};

module.exports = MoviesViewModel;